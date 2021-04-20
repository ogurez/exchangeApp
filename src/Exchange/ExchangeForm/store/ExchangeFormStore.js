import {
  runInAction,
  observable,
  action,
  makeObservable,
  makeAutoObservable,
} from "mobx";

const currencies = {
  invoice: [
    {
      id: 6,
      name: "Card UAH",
    },
    {
      id: 2,
      name: "Payeer",
    },
    {
      id: 3,
      name: "YandexMoney Personal",
    },
    {
      id: 4,
      name: "Bitcoin",
    },
    {
      id: 5,
      name: "Capitalist RUB",
    },
    {
      id: 7,
      name: "LiqPay UAH",
    },
    {
      id: 9,
      name: "WM test",
    },
    {
      id: 10,
      name: "Test 2",
    },
  ],
  withdraw: [
    {
      id: 6,
      name: "Card UAH",
    },
    {
      id: 3,
      name: "YandexMoney Personal",
    },
    {
      id: 4,
      name: "Bitcoin",
    },
    {
      id: 8,
      name: "Приват24 UAH",
    },
    {
      id: 20,
      name: "BitcoinCash",
    },
    {
      id: 21,
      name: "Dash",
    },
  ],
};

export function ExchangeFormStore(
  sellAmount,
  buyAmount,
  sellCurrency,
  buyCurrency,
  sellCurrencies,
  buyCurrencies,
  isLoaded
) {
  return makeAutoObservable({
    sellAmount,
    buyAmount,
    sellCurrency,
    buyCurrency,
    sellCurrencies,
    buyCurrencies,
    isLoaded,
  
    setSellCurrency(currency) {
      this.sellCurency = currency;
    },

    setBuyCurrency(currency) {
      this.buyCurency = currency;
    },

    async getCurrencies() {
      this.isLoaded = true;
      try {
        const currenciesReq = await fetch(
          "https://involve.software/test_front/api/payMethods",
          { method: "GET", redirect: "follow" }
        );
        const currencies = await currenciesReq.json();

        runInAction(() => {
          this.sellCurrencies = currencies.invoice;
          this.buyCurrencies = currencies.withdraw;
          this.isLoaded = false;
        });
      } catch (error) {
        console.log("Возникла проблема", error.message);
      }
    },

    async calculateExchange(base, amount, invoicePayMethod, withdrawPayMethod) {
      this.isLoaded = true;
      try {
        const exchangeAmountReq = await fetch(
          `https://involve.software/test_front/api/payMethods/calculate?base=${base}&amount=${amount}&invoicePayMethod=${invoicePayMethod}&withdrawPayMethod=${withdrawPayMethod}`,
          { method: "GET", redirect: "follow" }
        );
        const exchangeAmount = await exchangeAmountReq.json();

        runInAction(() => {
          this.isLoaded = false;
          if (exchangeAmount.amount && base === "invoice") {
            this.buyAmount = exchangeAmount.amount;
            this.sellAmount = amount;
          } else if (exchangeAmount.amount) {
            this.sellAmount = exchangeAmount.amount;
            this.buyAmount = amount;
          }
        });
      } catch (error) {
        console.log("Возникла проблема", error.message);
      }
    },
  });
}

/* export class ExchangeFormStore {
  sellAmount = 0;
  buyAmount = 0;
  sellCurrency = "";
  buyCurrency = "";
  sellCurrencies = [];
  buyCurrencies = [];
  isLoaded = false;
  
  constructor() {
    makeObservable(this, {
      sellAmount: observable,
      sellCurency: observable,
      buyAmount: observable,
      buyCurrency: observable,
      sellCurrencies: observable,
      buyCurrencies: observable,
      getCurrencies: action,
      calculateExchange: action,
    });
  }

  setSellCurrency(currency) {
    this.sellCurency = currency;
  }

  setBuyCurrency(currency) {
    this.buyCurency = currency;
  }

  async getCurrencies() {
    this.isLoaded = true;
    try {
      const currenciesReq = await fetch(
        "https://involve.software/test_front/api/payMethods",
        { method: "GET", redirect: "follow" }
      );
      const currencies = await currenciesReq.json();

      runInAction(() => {
        this.sellCurrencies = currencies.invoice;
        this.buyCurrencies = currencies.withdraw;
        this.isLoaded = false;
      });
    } catch (error) {
      console.log("Возникла проблема", error.message);
    }
  }

  async calculateExchange(base, amount, invoicePayMethod, withdrawPayMethod) {
    this.isLoaded = true;
    try {
      const exchangeAmountReq = await fetch(
        `https://involve.software/test_front/api/payMethods/calculate?base=${base}&amount=${amount}&invoicePayMethod=${invoicePayMethod}&withdrawPayMethod=${withdrawPayMethod}`,
        { method: "GET", redirect: "follow" }
      );
      const exchangeAmount = await exchangeAmountReq.json();

      runInAction(() => {
        this.isLoaded = false;
        if (exchangeAmount.amount && base === "invoice") {
          this.buyAmount = exchangeAmount.amount;
          this.sellAmount = amount;
        } else if (exchangeAmount.amount) {
          this.sellAmount = exchangeAmount.amount;
          this.buyAmount = amount;
        }
      });
    } catch (error) {
      console.log("Возникла проблема", error.message);
    }

  }
} */
