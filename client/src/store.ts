import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { linksReducer } from './reducers/links.reducer';
import { settingsReducer } from './reducers/settings.reducer';
import { userReducer } from './reducers/user.reducer';

export interface RootState {
  users: UsersReducer;
  links: LinksReducer;
  settings: SettingsReducer;
}

interface UsersReducer {
  signUpSuccess: boolean;
  signUpError: string;
  loading: boolean;
  loginError: string;
}

interface LinksReducer {
  linksInfo: any;
  loading: boolean;
  error: boolean;
}

interface SettingsReducer {
  isDark: boolean;
}

const reducer = combineReducers({
  users: userReducer,
  links: linksReducer,
  settings: settingsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
