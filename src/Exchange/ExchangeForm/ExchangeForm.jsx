import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Input, Button} from "antd";

export const ExchangeForm = observer(({ store }) => {
  const [sellCurrency, setSellCurrency] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0);
  const [buyCurrency, setBuyCurrency] = useState(0);
  useEffect(() => {
    store.getCurrencies();
  }, []);
  useEffect(() => {
    setBuyAmount(store.buyAmount);
    setSellAmount(store.sellAmount);
  }, [store.sellAmount, store.buyAmount]);

  const onSellCurrencyChange = (e) => {
    setSellCurrency(e.target.value);
    store.setSellCurrency(e.target.value);
    store.calculateExchange(
      "invoice",
      store.sellAmount,
      e.target.value,
      buyCurrency
    );
  };
  const onSellAmountChange = (e) => {
    //setSellAmount(e.target.value);
    store.calculateExchange(
      "invoice",
      e.target.value,
      sellCurrency,
      buyCurrency
    );
    //setBuyAmount(store.buyAmount);
  };

  const onBuyCurrencyChange = (e) => {
    setBuyCurrency(e.target.value);
    store.setBuyCurrency(e.target.value);
    store.calculateExchange(
      "withdraw",
      store.buyAmount,
      sellCurrency,
      e.target.value
    );
  };
  const onBuyAmountChange = (e) => {
    //setBuyAmount(e.target.value);
    store.calculateExchange(
      "withdraw",
      e.target.value,
      sellCurrency,
      buyCurrency
    );
    //setSellAmount(store.sellAmount)
  };

  return (
    <>
      <div className="exchange-form-container">
        <div className="exchange-form-inputs-container">
          <div className="exchange-form-section">
            <p>Sell</p>
            <select
              value={sellCurrency}
              onChange={
                onSellCurrencyChange /* e => onChange(e, setSellCurrency) */
              }
            >
              {store.sellCurrencies.map((v) => (
                <option value={v.id}>{v.name}</option>
              ))}
            </select>
            <Input
              value={sellAmount}
              type="number"
              onBlur={onSellAmountChange}
              onChange={(e) => setSellAmount(e.target.value)}
            ></Input>
          </div>
          <div className="exchange-form-section">
            <p>Buy</p>
            <select
              value={buyCurrency}
              onChange={
                onBuyCurrencyChange /* e => onChange(e, setBuyCurrency) */
              }
            >
              {store.buyCurrencies.map((v) => (
                <option value={v.id}>{v.name}</option>
              ))}
            </select>
            <Input
              value={buyAmount}
              type="number"
              onBlur={onBuyAmountChange}
              onChange={(e) => setBuyAmount(e.target.value)}
            ></Input>
          </div>
        </div>
        {store.isLoaded && <p>Loading...</p>}
        <Link to="/details">
          <Button className="exchange-form-button">Exchange</Button>
        </Link>
      </div>
    </>
  );
});
