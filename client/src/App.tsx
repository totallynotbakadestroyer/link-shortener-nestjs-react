import './App.css';

import { CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import MainPage from './views/MainPage';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path={'/dashboard'} component={Dashboard} />
            <Route path={'/'}>
              <MainPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
