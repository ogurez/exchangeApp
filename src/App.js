import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import {ExchangeSuccess, ExchangeForm, ExchangeDetails, ExchangeFormStore} from './Exchange'


const exchangeFormStore = ExchangeFormStore(0, 0, "", "", [], [], false);

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            key="1"
            component={(props) => (
              <ExchangeForm {...props} store={exchangeFormStore} />
            )}
          >
            <ExchangeForm store={exchangeFormStore} />
          </Route>
          <Route
            exact
            path="/details"
            key="2"
            component={(props) => (
              <ExchangeDetails {...props} store={exchangeFormStore} />
            )}
          />
          <Route exact path="/succes" key="3" component={() => <ExchangeSuccess/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
