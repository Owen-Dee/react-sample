import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from './Root';

ReactDOM.render(
  <Root>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Root>,
  document.getElementById('container'));
