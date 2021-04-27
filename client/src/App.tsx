import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from "./views/Dashboard";
import MainPage from './views/MainPage';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={'/dashboard'}>
            <Dashboard />
          </Route>
          <Route path={'/'}>
            <MainPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
