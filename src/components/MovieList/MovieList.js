import React, { useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import MovieTile from './MovieTile';
import { handleSaveFilm } from '../../helpers/utils';
import { Context } from '../../context/Store';

export default function Movielist({ films }) {
  const [state, dispatch] = useContext(Context);

  const handleSave = (film) => {
    handleSaveFilm(film, state.favoriteFilms, dispatch)
  }

  return (
    <Flex mx='10px' h="90vh" overflowX="scroll" overflowY="hidden" flexWrap="nowrap">
      {films.length &&
        films.map(film => (
          <>
            <MovieTile
              key={film.episode_id}
              film={film}
              handleSave={handleSave}
              list={state.favoriteFilms}
            />
          </>
        ))}
    </Flex>
  );
}
