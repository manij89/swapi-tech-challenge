/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {Context} from './context/Store';
import * as apiClient from './helpers/apiClient';
import ls from 'local-storage';
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
    apiClient
      .getMovies()
      .then(data => {
        dispatch({ type: 'SET_ALL_FILMS', payload: data.results });
        ls.set('allFilms', data.results);
      })
      .catch((e) => console.error('Problem fetching films', e));
  }, []);

  useEffect(() => {
    apiClient
    .getCharacterImages()
    .then(data => {
      const result = data.map(d => ({name: d.name, image:d.image, wiki: d.wiki}));
      dispatch({type: 'SET_CHAR_IMAGES', payload: result})
    })
    .catch((e) => console.error('Problem fetching character info', e));
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/filmDetails/:id"
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
