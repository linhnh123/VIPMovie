import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
import rootReducers from '../reducers';

//loger
// const loggerMiddleware = createLogger({ predicate: (getState, action) => config.env === 'dev' });
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export default makeStore = () => {
  const store = createStoreWithMiddleware(rootReducers);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
};
