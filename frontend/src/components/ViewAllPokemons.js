import React from "react";
import {List, AllList} from './List';
import logo from '../static/logo.jpg';
import '../static/App.css';

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

export function ViewAllPokemons(_this){
  var myPokemonNum = 0;
  var myPokemonIds = []
  if (_this.state.myPokemon !== undefined)
  {
    myPokemonNum = _this.state.myPokemon.length;
  }
  for (var i = 0; i < myPokemonNum; i++)
  {
    myPokemonIds.push(_this.state.myPokemon[i].pokemonId)
  }
  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
      <div className="row justify-content-md-center">
        <div className="Homepage-title">
          View all Pokemons in the world
        </div>  
      </div>

      <AllList />

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
