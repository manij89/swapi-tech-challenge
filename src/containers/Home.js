import React, { useContext, Suspense } from 'react';
import { Context } from '../context/Store';
import ListContainer from '../components/ListContainer/ListContainer';

export default function Home(props) {

  const [state] = useContext(Context);
  const { allFilms } = state;
  return (
    <>
      {/* //TODO implement spinner */}
      <Suspense  fallback="Loading...">
        <ListContainer data={allFilms} />
      </Suspense>
    </>
  );
}
