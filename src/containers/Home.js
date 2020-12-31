import React, { useContext, useEffect, Suspense } from 'react';
import Navbar from '../components/Navbar/NavBar';
import * as apiClient from '../helpers/apiClient';
import { Context } from '../context/Store';
import MovieList from '../components/MovieList/MovieList';

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
      {/* //TODO implement spinner */}
      <Suspense fallback="Loading...">
        <MovieList films={allFilms} />
      </Suspense>
    </>
  );
}
