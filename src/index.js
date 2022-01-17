import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Routes from './Routes';
import theme from './styles/theme';

ReactDOM.render(
 <>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
 </>,
  document.getElementById('root')
);
