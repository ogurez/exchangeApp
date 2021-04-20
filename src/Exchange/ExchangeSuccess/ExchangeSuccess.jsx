import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const ExchangeSuccess = () => {
  return (
    <>
      <div className="exchange-form-container">
        <h1>Success</h1>

        <div>
          <Link to="/">
            <Button className="exchange-form-button">Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
