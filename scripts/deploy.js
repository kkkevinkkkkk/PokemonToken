async function main() {
    const MyContract = await ethers.getContractFactory("PokemonToken");
    const myContract = await MyContract.deploy();
  
    console.log("PokemonToken deployed to:", myContract.address);
    saveFrontendFiles(myContract)
  }
  function saveFrontendFiles(token) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify({ Token: token.address }, undefined, 2)
    );
  
    const TokenArtifact = artifacts.readArtifactSync("PokemonToken");
  
    fs.writeFileSync(
      contractsDir + "/Token.json",
      JSON.stringify(TokenArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
  });