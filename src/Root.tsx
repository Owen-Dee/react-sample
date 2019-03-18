import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store';

export default (props: any) => {
  const { children } = props;
  const store = createStore();
  if (process.env.NODE_ENV === 'development') {
    return (
      <Provider store={store} >
        {children}
      </Provider>
    );
  } else {
    return <Provider store={store}>{children}</Provider>;
  }
};
