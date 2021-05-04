import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { linksReducer } from './reducers/links.reducer';
import { userReducer } from './reducers/user.reducer';

export interface RootState {
  users: UsersReducer;
  links: LinksReducer;
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

const reducer = combineReducers({ users: userReducer, links: linksReducer });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
