import { applyMiddleware, compose, createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTool';
import reducers from '../reducers';

export default function createStore() {
  let store;
  if (process.env.NODE_ENV === 'development') {
    const { persistState } = require('redux-devtools');
    const enhancer = compose(
      applyMiddleware(thunk),
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&#]+)\b/
        )
      )
    );
    store = _createStore(reducers, {}, enhancer);
  } else {
    store = _createStore(reducers, {}, applyMiddleware(thunk));
  }

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
