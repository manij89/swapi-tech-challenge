/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Store';
import { Center } from '@chakra-ui/react';
import MovieList from '../components/MovieList/MovieList';
import ls from 'local-storage';
import Placeholder from '../components/Placeholder';
import Yoda from '../images/Yoda2.jpg';

export default function FavFilms() {
  const [state, dispatch] = useContext(Context);


  useEffect(() => {
    const savedFilms = ls.get('favFilms');
    console.log(savedFilms);
    dispatch({ type: 'SET_FAVORITE_FILMS', payload: savedFilms });
  }, []);

  return (
    <Center w='100vw' h='90vh' m='0'>
      {state.favoriteFilms.length ? (
        <MovieList films={state.favoriteFilms} />
      ) : (
        <Placeholder Yoda={Yoda} message={'Hrrmmm, Your only favorite I am'} />
      )}
    </Center>
  );
}
