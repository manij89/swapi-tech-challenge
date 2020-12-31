import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {  Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import FavFilms from './containers/FavFilms';
import FavCharacter from './containers/FavCharacter';
import FilmDetail from './containers/FilmDetail';
import CharacterDetail from './containers/CharacterDetail';
import Navbar from './components/Navbar/NavBar';

function App() {

  return (
    <ChakraProvider theme={theme} >
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/filmDetails/:id' component={FilmDetail} />
        <Route exact path='/character/:name' component={CharacterDetail} />
        <Route exact path='/favFilms' component={FavFilms} />
        <Route exact path='/favCharacter' component={FavCharacter} />
      </Switch>

    </ChakraProvider>
  );
}

export default App;
