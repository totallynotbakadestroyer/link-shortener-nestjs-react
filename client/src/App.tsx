import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './views/MainPage';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={'/'}>
            <MainPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
