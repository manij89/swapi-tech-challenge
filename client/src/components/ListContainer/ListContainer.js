import React, { useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import MovieTile from './MovieTile';
import CharacterTile from './CharacterTile';
import { handleSaveFilm, handleSaveCharacter } from '../../helpers/utils';
import { Context } from '../../context/Store';

export default function ListContainer({ data }) {
  const [state, dispatch] = useContext(Context);

  const dataToDisplay = () => {
    if (data === state.favoriteCharacters) {
      return data.map(char => (
        <CharacterTile
          key={state.favoriteCharacters.name}
          character={char}
          handleSave={() =>
            handleSaveCharacter(char, state.favoriteCharacters, dispatch)
          }
        />
      ));
    } else {
      return data.map(film => (
        <>
          <MovieTile
            key={film.episode_id}
            film={film}
            handleSave={() =>
              handleSaveFilm(film, state.favoriteFilms, dispatch)
            }
          />
        </>
      ));
    }
  };

  return (
    <Flex
      data-testid='list-container'
      m="10px"
      h="90vh"
      overflowX="scroll"
      overflowY="hidden"
      flexWrap="nowrap"
    >
      {(data.length > 0) && dataToDisplay()}
    </Flex>
  );
}
