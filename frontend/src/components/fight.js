import React from "react";

import logo from '../static/logo.jpg';

import '../static/App.css';
import { messagePrefix } from "@ethersproject/hash";

const name_dict={1:'Bulbasaur' , 2:'Charmander', 3:"Squirtle", 4:'Pikachu', 5:'Chikorita', 6:'Cyndaquil',7:'Totodile',8:'Treecko',
9:'Torchic',10:'Mudkip',11:'Dragonite',12:'Metagross',13:'Gengar',14:'Gyarados',15:'Lucario',16:'Kyogre',17:'Groudon',18:'Dialga',
19:'Palkia',20:'Arceus'};

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

var pokemonNum = 1;
var pokemonId = 0; 
var pre_level = 0;
var pre_exp = 0;
var pre_attack = 0;
var level = 0;
var exp = 0;
var attack = 0;
var win = 0;
var attack_change=0;
var level_change=0;


export function Fight(_this) {  

  if (_this.state.selectfight===undefined){
    return (
      <div>
        <div className="container">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
          </div>
          <div className="col-12 text-center">
            <div className="Homepage-title">
              Pick the Pokemon For The Battle
            </div>
          </div>
          <div className="row justify-content-md-center Text-margin" style={{marginBottom:0}}>
            <div className="col-12  text-center" style={{padding:0}}>
                <form
                onSubmit={(event) => {
                // This function just calls the transferTokens callback with the
                // form's data.
                event.preventDefault();

                const formData = new FormData(event.target);
                const _index = formData.get("index");

                _fight(_this,_index)
                }}
                >
                <div className="form-group">
                  <input className="form-control" style={{width:"40%",margin:"auto" }} type="text" name="index" placeholder="Pokemon Index In Your Collection" required />
                </div>
                <div className="form-group">
                  <button className="btn btn-warning text-center wide" type="submit">Battle!</button>
                </div>
                </form>
              </div>
          </div>
          <div className="row justify-content-md-center Text-margin" style={{marginTop:0}}>
            <button
                className="btn btn-warning text-center wide"
                type="button"
                onClick={()=>_this.setState({currpage:"homepage",selectfight: undefined})}
              >
                Back To Homepage
            </button>
          </div>

        </div>
      </div>
    )
  }
  else{
    if (win === 1){
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
            <div className="Homepage-title green" >
              Win 
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
                Attack Point  &nbsp;&nbsp;  {attack} <span className="green">(+{attack_change})</span>
              </div>
              <div className="Poke-detail">
                level  &nbsp;&nbsp;  {level} <span className="green">(+{level_change})</span>
              </div>
              <div className="Poke-detail">
                EXP   &nbsp;&nbsp;  <span className="green">{exp}</span>
              </div>
          </div>
          <div className="col-2 text-center"></div>
          </div>
          <div className="row justify-content-md-center Text-margin">
            <button
                className="btn btn-warning text-center wide"
                type="button"
                onClick={()=>_this.setState({currpage:"homepage",selectfight: undefined})}
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
                Don't Give Up!
              </div>
              <div className="Homepage-title red">
                Loss
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
                  Attack Point  &nbsp;&nbsp;  {attack} <span id = "attackchange" className="red">(+0)</span>
                </div>
                <div className="Poke-detail">
                  level  &nbsp;&nbsp;  {level} <span className="red">(+0)</span>
                </div>
                <div className="Poke-detail">
                  EXP   &nbsp;&nbsp;  {exp} <span className="red">(+0)</span>
                </div>
            </div>
            <div className="col-2 text-center"></div>
            </div>
            <div className="row justify-content-md-center Text-margin">
              <button
                  className="btn btn-warning text-center wide"
                  type="button"
                  onClick={()=>_this.setState({currpage:"homepage",selectfight: undefined})}
                >
                  Back To Homepage
              </button>
            </div>
          </div>
        );
    }

  }
};

export async function _fight(_this,_select) {

  try {
    // If a transaction fails, we save that error in the component's state.
    // We only save one such error, so before sending a second transaction, we
    // clear it.
    _this._dismissTransactionError();

    // We send the transaction, and save its hash in the Dapp's state. This
    // way we can indicate that we are waiting for it to be mined.
    // const tx = await this._token.transfer(to, amount);

    // We use .wait() to wait for the transaction to be mined. This method
    // returns the transaction's receipt.

    var _poke = await _this._token.connect(_this._token.signer).getMyPokemon(_this.state.selectedAddress);

    if (_poke.length-1 < _select) {
      // We can't know the exact error that made the transaction fail when it
      // was mined, so we throw this generic one.
      throw new Error("Invalid Index Number. The Index Number is the # of Pokemon in your collection, not the Pokemon ID");
    }

    _poke = _poke[_select];
    
    pre_attack = _poke.attack.toNumber();
    pokemonId = _poke.pokemonId.toNumber();
    pokemonNum = pokemonId>>16; 
    pre_level = _poke.level.toNumber();
    pre_exp = _poke.exp.toNumber();

    var tx = await _this._token.connect(_this._token.signer).fight(pokemonId);
    const receipt = await tx.wait();
    _poke = await _this._token.connect(_this._token.signer).getMyPokemon(_this.state.selectedAddress);

    _poke = _poke[_select];
    attack = _poke.attack.toNumber();
    pokemonId = _poke.pokemonId.toNumber();
    pokemonNum = pokemonId>>16; 
    level = _poke.level.toNumber();
    exp = _poke.exp.toNumber();

    level_change = level-pre_level;
    attack_change = attack-pre_attack;

    if (level===pre_level && exp===pre_exp && attack===pre_attack){
      win=0;
    }
    else{
      win=1;
    }

    _this.setState({selectfight:{_select}})

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