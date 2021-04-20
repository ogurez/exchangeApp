import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Button } from "antd";

export const ExchangeDetails = observer(({ store }) => {
  return (
    <>
      <div className="exchange-form-container">
        <div className="details">
          <h1>Details</h1>
          <div className="detail">
            <p>Sell</p>
            <div>
              {store.sellAmount} {store.sellCurency}
            </div>
          </div>
          <div className="detail">
            <p>Buy</p>
            <div>
              {store.buyAmount} {store.buyCurency}
            </div>
          </div>
        </div>

        <div>
          <Link to="/">
            <Button className="exchange-cancel-button">Cancel</Button>
          </Link>
          <Link to="/succes">
            <Button className="exchange-form-button">Confirm</Button>
          </Link>
        </div>
      </div>
    </>
  );
});
