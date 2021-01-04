import React, { useContext } from 'react';
import { Box, Image, Text, Link, useColorMode, Flex } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { bgColor, textColor } from '../../styles/colorModes';
import SaveIcon from './SaveIcon';
import { Context } from '../../context/Store';

export default function CharacterTile({ character, handleSave }) {
  const [state, dispatch] = useContext(Context);
  const { colorMode } = useColorMode();

  const handleClick = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({
      type: 'SET_CLICKED_CHAR',
      payload: character,
    });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <Box
      w={['375px', '350px', '280px', '280px']}
      h={['90%', '90%', '50%', '50%']}
      minHeight="320px"
      mx="10px"
      my={['10px', '15px', '40px', '40px']}
      rounded="md"
      flexShrink="0"
      overflow="hidden"
      boxShadow="md"
      bg={bgColor[colorMode]}
    >
      {character.image && (
        <Link as={ReachLink} to={`/character/${character.name}`}>
          <Image
            src={character.image}
            alt={character.name}
            objectFit="fill"
            w="100%"
            h={['80%', '80%', '70%', '70']}
            onClick={handleClick}
          />
        </Link>
      )}
      <Flex alignItems="flex-start" justifyContent="space-between" p={5}>
        <Text
          as="h2"
          fontWeight="bold"
          fontSize="lg"
          my={2}
          color={textColor[colorMode]}
        >
          {character.name}
        </Text>
        <SaveIcon
          handleSave={() => handleSave()}
          target={character}
          list={state.favoriteCharacters}
        />
      </Flex>
    </Box>
  );
}
