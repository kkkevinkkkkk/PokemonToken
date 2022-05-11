const { ethers} = require("hardhat");

// scripts/index.js
async function main () {


    let [player0, player1, player2] = await ethers.getSigners();
    console.log(player0.address, player1.address, player2.address)
    
    // huygens small contract address
    const address = '0x2159dd8b685Ae6482Eaa0a15BA2A4f4B2694BBF6'

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

    await pokemonToken.connect(player1).transferCoins(player2.address,100);
    console.log("player1 sent 100 coins to player2")
    coin = await pokemonToken.getMyCoins(player1.address);
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

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });