/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Store';
import { Center } from '@chakra-ui/react';
import ListContainer from '../components/ListContainer/ListContainer';
import ls from 'local-storage';
import Placeholder from '../components/Placeholder';
import Yoda from '../images/yoda.jpg';

export default function FavFilms() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const savedFilms = ls.get('favFilms');
    if (savedFilms.length) {
      dispatch({ type: 'SET_FAV_FILMS', payload: savedFilms });
    }
  }, []);

  return (
    <Center w="100vw" h="90vh" m="0">
      {state.favoriteFilms.length ? (
        <ListContainer data={state.favoriteFilms} />
      ) : (
        <Placeholder
          Yoda={Yoda}
          message={'No favorite films yet you have. Yes, hrrmmm.'}
        />
      )}
    </Center>
  );
}
