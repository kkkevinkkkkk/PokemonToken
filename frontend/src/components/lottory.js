import React from "react";

import logo from '../static/logo.jpg';

import '../static/App.css';

const name_dict={1:'Bulbasaur' , 2:'Charmander', 3:"Squirtle", 4:'Pikachu', 5:'Chikorita', 6:'Cyndaquil',7:'Totodile',8:'Treecko',
9:'Torchic',10:'Mudkip',11:'Dragonite',12:'Metagross',13:'Gengar',14:'Gyarados',15:'Lucario',16:'Kyogre',17:'Groudon',18:'Dialga',
19:'Palkia',20:'Arceus'};

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

var attack = 0;
var pokemonNum = 1;
var pokemonId = 0; 
var owner = 0;
var level = 0;
var exp = 0;
var attack = 0;

export function Lottory({ _this }) {
  console.log(_this.state.lottoryPoke)
  if (!_this.state.lottoryPoke){

    return (
      <div className="container">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
        <div className="row justify-content-md-center">
          <div className="Homepage-title">
            Click On The Button To Draw A Pokemone
          </div>  
        </div>
        <div className="row justify-content-md-center Text-margin">
          <button
              className="btn btn-warning text-center wide"
              type="button"
              onClick={() =>ChainLottory(_this)}
            >
              Daily Pool: 100 Coins
          </button>
        </div>
        <div className="row justify-content-md-center Text-margin">
          <button
              className="btn btn-warning text-center wide"
              type="button"
              onClick={()=>_this.setState({currpage:"homepage"})}
            >
              Back To Homepage
          </button>
        </div>
      </div>
    );

  }
  else{
    return (
      <div className="container">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
        <div className="col-12 text-center">
          <div className="Homepage-title">
            Congratulation!
          </div>
          <div className="Homepage-title">
            {name_dict[pokemonNum]} is added to your collections!
          </div>
        </div>
        <div className="row justify-content-md-center" style={{margin:20}}>
        <div className="col-2 text-center"></div>
        <div className="col-4 text-center">
            <img src={require("../pokemon_imgs/"+pokemonNum+".png")} className="Pokemon-logo"></img>
        </div>

        <div className="col-4">
            <div className="Poke-name">
              {name_dict[pokemonNum]}
            </div>
            <div className="Poke-detail">
              Pokemon ID &nbsp;&nbsp;   {pokemonId}
            </div>
            <div className="Poke-detail">
              Pokemon No. &nbsp;&nbsp;   {pokemonNum}
            </div>
            <div className="Poke-detail">
              Attack Point  &nbsp;&nbsp;  {attack}
            </div>
            <div className="Poke-detail">
              level  &nbsp;&nbsp;  {level}
            </div>
            <div className="Poke-detail">
              EXP   &nbsp;&nbsp;  {exp}
            </div>
        </div>
        <div className="col-2 text-center"></div>
        </div>
        <div className="row justify-content-md-center Text-margin">
          <button
              className="btn btn-warning text-center wide"
              type="button"
              onClick={() =>ChainLottory(_this)}
            >
              Daily Pool: 100 Coins
          </button>
        </div>
        <div className="row justify-content-md-center Text-margin">
          <button
              className="btn btn-warning text-center wide"
              type="button"
              onClick={()=>_this.setState({currpage:"homepage",lottoryPoke: undefined})}
            >
              Back To Homepage
          </button>
        </div>
      </div>
    );
  }
};

export async function ChainLottory(_this) {

  try {
    // If a transaction fails, we save that error in the component's state.
    // We only save one such error, so before sending a second transaction, we
    // clear it.
    _this._dismissTransactionError();

    // We send the transaction, and save its hash in the Dapp's state. This
    // way we can indicate that we are waiting for it to be mined.
    // const tx = await this._token.transfer(to, amount);
    console.log(_this._token)
    const tx = await _this._token.connect(_this._token.signer).lottery();

    // We use .wait() to wait for the transaction to be mined. This method
    // returns the transaction's receipt.
    const receipt = await tx.wait();

    var _poke = await _this._token.connect(_this._token.signer).getMyPokemon(_this.state.selectedAddress);

    _poke = _poke[_poke.length-1];
    attack = _poke.attack.toNumber();
    pokemonId = _poke.pokemonId.toNumber();
    pokemonNum = pokemonId>>16; 
    console.log(pokemonId)
    owner = _poke.owner;
    level = _poke.level.toNumber();
    exp = _poke.exp.toNumber();

    _this.setState({lottoryPoke:pokemonId});


    // The receipt, contains a status flag, which is 0 to indicate an error.
    if (receipt.status === 0) {
      // We can't know the exact error that made the transaction fail when it
      // was mined, so we throw this generic one.
      throw new Error("Transaction failed");
    }

    // If we got here, the transaction was successful, so you may want to
    // update your state. Here, we update the user's balance.
    await _this._updateBalance();
  } catch (error) {
    // We check the error code to see if this error was produced because the
    // user rejected a tx. If that's the case, we do nothing.
    if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
      return;
    }

    // Other errors are logged and stored in the Dapp's state. This is used to
    // show them to the user, and for debugging.
    console.error(error);
    _this.setState({ transactionError: error });
  } finally {
    // If we leave the try/catch, we aren't sending a tx anymore, so we clear
    // this part of the state.
    _this.setState({ txBeingSent: undefined });
  }
}