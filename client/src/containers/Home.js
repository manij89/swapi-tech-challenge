import React, { useContext, Suspense } from 'react';
import { Context } from '../context/Store';
import Spinner from '../components/Spinner';
import ListContainer from '../components/ListContainer/ListContainer';

export default function Home() {

  const [state] = useContext(Context);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ListContainer data={state.allFilms} />
      </Suspense>
    </>
  );
}
