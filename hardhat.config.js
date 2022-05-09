// const { network } = require('hardhat');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
module.exports = {
  // defaultNetwork: "huygens_dev",
  solidity: "0.8.4",
  // paths:{
  //   artifacts: "./src/artifacts/contracts"
  // },
  networks:{
    hardhat:{},
    huygens_dev: {
      url: "http://18.182.45.18:8765",
      accounts: ["1C4F6DB415E85465EB4A202C479248880CB737D78AC364719575C8FDF61DFDDF",
      "3DBCB8167362848FFC9440987A89ABD87616A3509EA474D9AB0A191ABB0EDA7E","A616D6EEE707BC877467E257F59D4FF4B8E3D6F821BBAF222856F6EB41B4A362"]
    }
    // huygens_dev: {
    //   url: process.env.HUYGENS_DEV_URL,
    //   accounts: [process.env.HUYGENS_DEV_PRIVATE_KEY]
    // }
  }
};
