import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/Store';
import {
  Center,
  Box,
  Image,
  Button,
  Flex,
  Text,
  Badge,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import { bagdeBg, bgColor, textColor } from '../styles/colorModes';
import { handleSaveFilm } from '../helpers/utils';
import * as apiClient from '../helpers/apiClient';
import {useHistory} from 'react-router-dom';

export default function Filmdetail(props) {

  //TODO get film id from params to not have error
  const [state, dispatch] = useContext(Context);
  const { colorMode } = useColorMode();
  const [characters, setCharacters] = useState([]);
  const history = useHistory();

  const getCharacters = () => {
    state.clickedFilm.characters.map((char) => {
      const reg = new RegExp(/\d+/);
      const charId = char.match(reg);
      apiClient.getCharacter(charId).then(result => (
        setCharacters(prev => [...prev, result])
      ))
    })
  }
  useEffect(() => {
    if(!state.loading && characters.length === 0) {
      state.clickedFilm && getCharacters();
    }
  },[])

  const {
    poster,
    title,
    episode_id,
    opening_crawl,
    director,
  } = state.clickedFilm;
  return (
    <Center
      flexDirection="column"
      mx="10px"
      my={['10px', '15px', '40px', '40px']}
      rounded="md"
      overflow="hidden"
      boxShadow="lg"
      bg={bgColor[colorMode]}
    >
      <Image src={poster} alt={title} />
      <Box p={5} w="100%">
        <Stack isInline align="baseline">
          <Badge variant="solid" bg={bagdeBg[colorMode]} rounded="full" px={2}>
            Episode {episode_id}
          </Badge>
          <Text
            textTransform="uppercase"
            fontSize="sm"
            color="gray.500"
            letterSpacing="wide"
          >
            Directed by {director}
          </Text>
        </Stack>
        <Text
          as="h2"
          fontWeight="bold"
          fontSize="1.5rem"
          my={2}
          color={textColor[colorMode]}
        >
          {title}
        </Text>
        <Text color={textColor[colorMode]} fontWeight="light" fontSize="md">
          {opening_crawl}
        </Text>
        <Box my={2}>
          {characters.map(char => (
            <Badge
              variant="solid"
              rounded="full"
              fontSize={13}
              mr={2}
              px={2}
              py={0.5}
              onClick={() => history.push(`/character/${char.name}`)}
            >
              {char.name}
            </Badge>
          ))}
        </Box>
        <Box textAlign="center">
          <Button
            size="lg"
            mt={3}
            boxShadow="sm"
            onClick={() =>
              handleSaveFilm(state.clickedFilm, state.favoriteFilms, dispatch)
            }
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
          >
            {state.favoriteFilms.some(film => film.title === title)
              ? 'Saved'
              : 'Add to Favorites'}
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
