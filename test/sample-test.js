const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require('fs');

describe("PokemonToken", function () {
  it("Should display pokemons once minted", async function () {

    const contractPath = `.artifacts/contracts/PokemonToken.sol/PokemonToken.json`;
    const obj = JSON.parse(fs.readFileSync(contractPath));
    const size = Buffer.byteLength(obj.deployedBytecode, 'utf8') / 2;
    console.log('contract size is', size);  

    const [owner,player1,player2]=await ethers.getSigners();
    

    const Token=await ethers.getContractFactory("PokemonToken");

    const hardhatToken=await Token.deploy();

    await hardhatToken.connect(player1).registerNewPlayer();

    await hardhatToken.connect(player1).registerNewPlayer();

    await hardhatToken.connect(player2).registerNewPlayer();
    
    expect(await hardhatToken.getMyCoins(player1.address)).to.equal(200);

    await hardhatToken.connect(player1).lottery();

    await hardhatToken.connect(player2).lottery();

    expect(await hardhatToken.getTokenId()).to.equal(3);

    expect(await hardhatToken.getTotalPokemon()).to.equal(129098);

    expect(await hardhatToken.getMyCoins(player1.address)).to.equal(100);

    await hardhatToken.connect(player1).lottery();

    expect(await hardhatToken.getTokenId()).to.equal(4);

    expect(await hardhatToken.getTotalPokemon()).to.equal(129097);

    expect(await hardhatToken.getMyCoins(player1.address)).to.equal(0);

    await expect(hardhatToken.connect(player1).lottery()).to.be.revertedWith('No enough coins!');
    
    expect(await hardhatToken.getTokenId()).to.equal(4);

    expect(await hardhatToken.getTotalPokemon()).to.equal(129097);

    expect(await hardhatToken.getMyCoins(player1.address)).to.equal(0);

    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);
    await hardhatToken.connect(player2).fight((await hardhatToken.getMyPokemonList(player2.address))[0]);

    await expect(hardhatToken.connect(player2).transferPokemon(player1.address,(await hardhatToken.getMyPokemonList(player2.address))[0]))
    .to.emit(hardhatToken,"TransferPokemon").withArgs(player2.address,player1.address,(await hardhatToken.getMyPokemonList(player2.address))[0]);

    await hardhatToken.getMyPokemon(player2.address);
    await hardhatToken.getMyPokemonList(player2.address);

    await hardhatToken.getMyPokemon(player1.address);
    await hardhatToken.getMyPokemonList(player1.address);

    await hardhatToken.connect(player2).transferCoins(player1.address,100);

    await hardhatToken.getMyCoins(player2.address)

    await hardhatToken.connect(player2).transferCoins(player1.address,100);

    await expect(hardhatToken.connect(player1).transferCoins(player2.address,500)).to.be.revertedWith("Doesn't have enough coins!");;

  });
});
