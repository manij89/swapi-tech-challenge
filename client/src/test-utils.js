import React from 'react';
import { render } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Store from './context/Store';

const AllProviders = ({ children }) => (
  <Store>
    <Router history={history}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Router>
  </Store>
);

const customRender = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store,
    ...options
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Store>
    <Router history={history}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Router>
  </Store>
  );

  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...options,
    }),
    history,
    store,
  };
};

export { customRender as render };
