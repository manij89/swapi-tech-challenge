import React, { useContext, Suspense } from 'react';
import { Context } from '../context/Store';
import Spinner from '../components/Spinner';
import ListContainer from '../components/ListContainer/ListContainer';

export default function Home() {
  const [state] = useContext(Context);
  const { allFilms } = state;

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ListContainer data={allFilms} />
      </Suspense>
    </>
  );
}
