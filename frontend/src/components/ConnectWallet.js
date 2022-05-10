import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

import { Homepage } from "./homepage";

import '../static/App.css';

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        {<Homepage/>}
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        <div className="col-12 p-4 text-center">
          <div className="App-header Homepage-text Text-margin">Start your own journey by first connecting your wallet</div>
          
          <button
            className="btn btn-warning Text-margin wide"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
