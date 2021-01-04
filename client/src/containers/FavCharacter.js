/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Store';
import { Center } from '@chakra-ui/react';
import ListContainer from '../components/ListContainer/ListContainer';
import ls from 'local-storage';
import Placeholder from '../components/Placeholder';
import Yoda from '../images/Yoda2.jpg';

export default function FavFilms() {

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const savedCharacters = ls.get('favChar');
    if(savedCharacters){
      dispatch({ type: 'SET_FAV_CHAR', payload: savedCharacters });
    }
  }, []);

  return (
    <Center w="100vw" h="90vh" m="0">
      {state.favoriteCharacters.length ? (
        <ListContainer data={state.favoriteCharacters} />
      ) : (
        <Placeholder Yoda={Yoda} message={'Hrrmmm, Your only favorite I am'} />
      )}
    </Center>
  );
}
