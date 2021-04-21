import React, {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button } from "antd";

export const ExchangeDetails = observer(({ store }) => {

  //Should be done in better way, but smth wrong with store
  const history = useHistory();
  useEffect(() => {
    store.isConfirmed && history.push("/success")
  }, [store.isConfirmed])

  const onConfirm = () => {
    store.exchangeBid()
  }

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
         {/*  <Link to="/success"> */}
            <Button className="exchange-form-button" onClick={onConfirm}>Confirm</Button>
         {/*  </Link> */}
        </div>
      </div>
    </>
  );
});
