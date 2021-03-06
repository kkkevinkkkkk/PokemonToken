const { ethers} = require("hardhat");

// scripts/index.js
async function main () {

    // let privateKey = "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a"
    let privateKey = "1C4F6DB415E85465EB4A202C479248880CB737D78AC364719575C8FDF61DFDDF"

    // let privateKey = "afdee13f33296bb3621207ed42a3fd47e9fa71e836f66722286b74695aaec233"
    // const provider = new ethers.providers.WebSocketProvider(
    //     // "ws://localhost:8545"
    //     "http://18.182.45.18:8765"
    //   );
    // const provider = new ethers.providers.JsonRpcProvider("http://18.182.45.18:8765")
    // const provider =  new ethers.providers.Web3Provider(network.provider)

    // let player = new ethers.Wallet(privateKey, provider);

    // let blockNum = await provider.getBlockNumber()
    // console.log(blockNum)

    let [player0, player1, player2] = await ethers.getSigners();
    console.log(player0.address, player1.address, player2.address);

    // local chain address
    const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

    // huygens address
    // const address = '0xB20eAd9af58367b38e95972E80839850C23B5bF1'
    // const address = '0x18Ed773d6a080Af2759415A00571BC53635079cE'

    const PokemonToken = await ethers.getContractFactory('PokemonToken');
    const pokemonToken = await PokemonToken.attach(address);
    
    // register new users
    await pokemonToken.connect(player0).registerNewPlayer();
    await pokemonToken.connect(player1).registerNewPlayer();
    await pokemonToken.connect(player2).registerNewPlayer();

    let coin = await pokemonToken.getMyCoins(player1.address);
    console.log('Player1 Has coin', coin.toString());
    coin = await pokemonToken.getMyCoins(player2.address)
    console.log('Player2 Has coin', coin.toString());

    await pokemonToken.connect(player2).lottery();
    await pokemonToken.connect(player2).lottery();
    await pokemonToken.connect(player2).lottery();
    await pokemonToken.connect(player1).lottery();
    await pokemonToken.connect(player1).lottery();
    await pokemonToken.connect(player1).lottery();
    await pokemonToken.connect(player1).lottery();
    console.log("player 1 draw pokemons 4 times and player 2 draw pokemons 3 times")

    coin = await pokemonToken.getMyCoins(player1.address);
    console.log('Player1 Has coin', coin.toString());
    coin = await pokemonToken.getMyCoins(player2.address)
    console.log('Player2 Has coin', coin.toString());

    let myPokemon = await pokemonToken.getMyPokemon(player1.address);
    console.log("player1 pokemons num:", myPokemon.length);
    myPokemon = await pokemonToken.getMyPokemon(player2.address);
    console.log("player2 pokemons num:", myPokemon.length);
    console.log("An example of Pokemon structure", myPokemon[0]);

    // show all Pokemon info
    let allPokemon = await pokemonToken.getAllPokemon();
    console.log("The total pokemons number users have collected", allPokemon.length);

    await pokemonToken.connect(player1).transferCoins(player2.address,100);
    console.log("player1 sent 100 coins to player2")
    coin = await pokemonToken.getMyCoins(player1.address);
    console.log('Player1 Has coin', coin.toString());
    coin = await pokemonToken.getMyCoins(player2.address)
    console.log('Player2 Has coin', coin.toString());
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });