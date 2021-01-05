/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { Context } from './context/Store';
import * as apiClient from './helpers/apiClient';
import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './styles/colorModes';
import { Route, Switch } from 'react-router-dom';
import ls from 'local-storage';
import Home from './containers/Home';
import FavFilms from './containers/FavFilms';
import FavCharacter from './containers/FavCharacter';
import FilmDetail from './containers/FilmDetail';
import CharacterDetail from './containers/CharacterDetail';
import Navbar from './components/Navbar/NavBar';

function App() {
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    apiClient.getMovies().then(apiResult => {
      dispatch({ type: 'SET_ALL_FILMS', payload: apiResult.data.results });
      ls.set('allFilms', apiResult.data.results);
    });

    apiClient.getCharacterImages().then(apiResult => {
      dispatch({ type: 'SET_CHAR_IMAGES', payload: apiResult });
      ls.set('allImages', apiResult);
    });
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/film/:id"
          render={routeProps => (
            <>
              <FilmDetail episode_id={routeProps.match.params.id} />
            </>
          )}
        />
        <Route
          exact
          path="/character/:name"
          render={routeProps => (
            <>
              <CharacterDetail name={routeProps.match.params.name} />
            </>
          )}
        />
        <Route exact path="/favFilms" component={FavFilms} />
        <Route exact path="/favCharacter" component={FavCharacter} />
      </Switch>
    </ChakraProvider>
  );
}

export default App;
