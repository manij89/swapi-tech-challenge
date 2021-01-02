import React, { useContext, Suspense } from 'react';
import { Context } from '../context/Store';
import MovieList from '../components/MovieList/MovieList';

export default function Home(props) {

  const [state] = useContext(Context);
  const { allFilms } = state;
  return (
    <>
      {/* //TODO implement spinner */}
      <Suspense  fallback="Loading...">
        <MovieList films={allFilms} />
      </Suspense>
    </>
  );
}
