import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { userReducer } from './reducers/user.reducer';

export interface RootState {
  users: UsersReducer;
}

interface UsersReducer {
  signUpSuccess: boolean;
  signUpError: string;
  loading: boolean;
  loginError: string;
}

const reducer = combineReducers({ users: userReducer });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
