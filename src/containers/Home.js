import React, { useContext, useEffect, Suspense } from 'react';
import Navbar from '../components/Navbar/NavBar';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import * as apiClient from '../services/apiClient';
import { Context } from '../context/Store';
import MovieTile from '../components/MovieTile';

export default function Home(props) {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    apiClient
      .getMovies()
      .then(data => dispatch({ type: 'SET_ALL_FILMS', payload: data.results }))
      .then(console.log(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { allFilms } = state;
  return (
    <>
      <Navbar />
      {/* //TODO implement spinner */}
      <Suspense fallback="Loading...">
        <Flex h="90vh" overflowX="scroll" overflowY="hidden" flexWrap='nowrap' >
          {allFilms.length &&
            allFilms.map(film => 
              <>
            <MovieTile key={film.title} film={film} />
            <MovieTile key={film.title} film={film} />
            </>
            )}
        </Flex>
      </Suspense>
    </>
  );
}
