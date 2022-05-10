import React from "react";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import { NoTokensMessage } from "./NoTokensMessage";
import logo from '../static/logo.jpg';
import '../static/App.css';


const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
async function transferTokens(_this, to, amount) {
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.

    try {
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      _this._dismissTransactionError();

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      // const tx = await this._token.transfer(to, amount);
      const tx = await _this._token.connect(_this._token.signer).transferCoins(to, amount)
      _this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

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
function TransferButton({ transferTokens, tokenSymbol, _this }) {
  return (
    <div>
      <h4>Transfer</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const to = formData.get("to");
          const amount = formData.get("amount");

          if (to && amount) {
            transferTokens(_this, to, amount);
          }
        }}
      >
        <div className="form-group">
          <label>Amount of {tokenSymbol}</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Recipient address</label>
          <input className="form-control" type="text" name="to" required />
        </div>
        <div className="row justify-content-md-center Text-margin">
          <input className="btn btn-warning text-center wide" type="submit" value="Transfer" />
        </div>
        <div className="row justify-content-md-center Text-margin">
          <button
              className="btn btn-warning text-center wide"
              type="submit"
              onClick={()=>_this.setState({currpage:"homepage"})}
            >
              Back To Homepage
          </button>
        </div>
      </form>
    </div>
  );
}

export function TransferToken(_this){
  // If everything is loaded, we render the application.
    return (
      <div className="container p-4">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
        <div className="row justify-content-md-center">
          <div className="Homepage-title">
            Transfer Pokemon Coins
          </div>  
        </div>
        <div className="col-12 p-4 text-center">
          <div className="App-header Homepage-text Text-margin Poke-detail-small">
          Welcome <b>{_this.state.selectedAddress}</b>  <br />you have{" "}
              <b>
                {_this.state.balance.toString()} {_this.state.tokenData.symbol}
              </b>
              .</div>
          
        </div>

        {/* <hr /> */}

        <div className="row">
          <div className="col-12">
            {/* 
              Sending a transaction isn't an immediate action. You have to wait
              for it to be mined.
              If we are waiting for one, we show a message here.
            */}
            {_this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={_this.state.txBeingSent} />
            )}

            {/* 
              Sending a transaction can fail in multiple ways. 
              If that happened, we show a message here.
            */}
            {_this.state.transactionError && (
              <TransactionErrorMessage
                message={_this._getRpcErrorMessage(_this.state.transactionError)}
                dismiss={() => _this._dismissTransactionError()}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {/*
              If the user has no tokens, we don't show the Transfer form
            */}
            {_this.state.balance.eq(0) && (
              <NoTokensMessage selectedAddress={_this.state.selectedAddress} />
            )}

            {/*
              This component displays a form that the user can use to send a 
              transaction and transfer some tokens.
              The component doesn't have logic, it just calls the transferTokens
              callback.
            */}
            {_this.state.balance.gt(0) && (
              <TransferButton
                transferTokens={(_this, to, amount) =>
                  transferTokens(_this, to, amount)
                }
                tokenSymbol={_this.state.tokenData.symbol}
                _this={_this}
              />
            )}
          </div>
        </div>
      </div>
    );
  
}
