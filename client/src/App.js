/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { Context } from './context/Store';
import ls from 'local-storage';
import * as apiClient from './helpers/apiClient';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import FavFilms from './containers/FavFilms';
import FavCharacter from './containers/FavCharacter';
import FilmDetail from './containers/FilmDetail';
import CharacterDetail from './containers/CharacterDetail';
import Navbar from './components/Navbar/NavBar';

function App() {
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    const allMovies = ls.get('allFilms');
    if (!allMovies) {
      apiClient.getMovies(dispatch);
    } else {
      dispatch({ type: 'SET_ALL_FILMS', payload: allMovies });
    }
    dispatch({type: 'SET_LOADING', payload: false})
  }, []);

  useEffect(() => {
    const allImages = ls.get('allImages');
    if(!allImages) {
      apiClient
        .getCharacterImages(dispatch);
    } else {
      dispatch({type: 'SET_CHAR_IMAGES', payload: allImages});
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
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
