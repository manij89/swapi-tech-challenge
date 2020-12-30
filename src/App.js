import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {  Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import FavFilms from './containers/FavFilms';
import FavCharacter from './containers/FavCharacter';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/favFilms' component={FavFilms} />
        <Route exact path='/favCharacter' component={FavCharacter} />
      </Switch>

    </ChakraProvider>
  );
}

export default App;
