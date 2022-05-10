import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

import { Homepage } from "./homepage";

import '../static/App.css';

export function Afterlogin({ _this }) {
  
  if (_this.state.currcoins==null || _this.state.myPokemon == null){
      return <div>loading</div>
  }
  
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        {<Homepage/>}
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {_this.state.networkError && (
            <NetworkErrorMessage 
              message={_this.state.networkError} 
              dismiss={_this._dismissNetworkError()} 
            />
          )}
        </div>

        <div className="row">
            <div className="col-12 p-2 text-center"><NewuserMessage new_user={_this.state.is_new}/></div>
            <div className="col-6 p-2 text-center Homepage-text">
                Current Coins: {_this.state.currcoins.toNumber()}
            </div>
            <div className="col-6 p-2 text-center Homepage-text">
                Current Pokemon: {_this.state.currpoke_N}
            </div>
        </div>
        
        <div className="col-12 text-center Button-margin" style={{ marginTop: 20 }}>
          <button
            className="btn btn-warning wide"
            type="button"
            onClick={() => _this.setState({currpage:"lottory"})}
          >
            Draw Pokemon
          </button>
        </div>
        
        <div className="col-12 text-center Button-margin">
          <button
            className="btn btn-warning wide"
            type="button"
            onClick={() => _this.setState({currpage:"transC"})}
          >
            Transfer Coins
          </button>
        </div>

        <div className="col-12 text-center Button-margin">
          <button
            className="btn btn-warning wide"
            type="button"
            onClick={() => _this.setState({currpage:"transP"})}
          >
            Transfer Pokemon
          </button>
        </div>

        <div className="col-12 text-center Button-margin">
          <button
            className="btn btn-warning wide"
            type="button"
            onClick={() => _this.setState({currpage:"fight"})}
          >
            Select Pokemon To Fight
          </button>
        </div>

        <div className="col-12 text-center Button-margin">
          <button
            className="btn btn-warning wide"
            type="button"
            onClick={() => _this.setState({currpage:"viewAll"})}
          >
            View All Discovered Pokemon
          </button>
        </div>

      </div>
    </div>
  );
}

export function NewuserMessage({new_user}) {
    if (new_user==="true"){
        return (
            <div>
                <div className="text-center Text-margin Homepage-text"> 
                Welcome new player! We have automatically registered for you!
                </div>
                <div className="text-center  Text-margin Homepage-text">
                    Try to draw your first Pokemon using the button below!
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="text-center Text-margin Homepage-text"> 
                Welcome back!
            </div>
        );
    }
}
