import './App.css';

import { CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { RootState } from './store';
import Dashboard from './views/Dashboard';
import MainPage from './views/MainPage';

const App = (): JSX.Element => {
  const settings = useSelector((state: RootState) => state.settings);

  let theme = createMuiTheme({
    palette: {
      primary: {
        light: '#B3E5FC',
        main: '#03A9F4',
        dark: '#0288D1',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FF4081',
      },
      type: settings.isDark ? 'dark' : 'light',
    },
  });
  theme = responsiveFontSizes(theme);
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
