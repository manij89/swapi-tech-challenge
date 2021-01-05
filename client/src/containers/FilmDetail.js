/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useCallback } from 'react';
import { Context } from '../context/Store';
import {
  Center,
  Box,
  Image,
  Button,
  Text,
  Badge,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import ls from 'local-storage';
import Spinner from '../components/Spinner';
import { bagdeBg, bgColor, textColor } from '../styles/colorModes';
import { handleSaveFilm } from '../helpers/utils';
import * as apiClient from '../helpers/apiClient';
import { useHistory } from 'react-router-dom';
import placeholder from '../images/ligthST.svg';

export default function Filmdetail({ episode_id }) {
  const [state, dispatch] = useContext(Context);
  const { colorMode } = useColorMode();
  const history = useHistory();


  const getCharacters = useCallback(() => {
    state.clickedFilm.characters.map(char => {
      const reg = new RegExp(/\d+/);
      const charId = char.match(reg);
      apiClient.getCharacter(charId, dispatch);
    });
  }, [state.clickedFilm.characters]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });

    if (!state.allFilms.length) {
      const films = ls.get('allFilms');
      if (films) {
        dispatch({ type: 'SET_ALL_FILMS', payload: films });
        const selectedFilm = films.find(f => +f.episode_id === +episode_id);
        if (!!selectedFilm) {
          import(`../images/${selectedFilm.episode_id}.jpg`).then(image =>
            dispatch({
              type: 'SET_CLICKED_FILM',
              payload: { ...selectedFilm, poster: image.default },
            })
          );
        } else {
          history.push('/');
        }
      } else {
        history.push('/');
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.allFilms]);

  useEffect(() => {
    if (state.clickedFilm && state.characterDetails.length === 0) {
      !!state.clickedFilm.title && getCharacters();
    }
  }, [state.clickedFilm]);

  const handleClick = char => {
    history.push(`/character/${char.name}`);
    const extraInfoChar = state.allImages.find(c => c.name === char.name);
    dispatch({
      type: 'SET_CLICKED_CHAR',
      payload: {
        ...char,
        image: extraInfoChar.image,
        wiki: extraInfoChar.wiki,
      },
    });
  };

  const { poster, title, opening_crawl, director } = state.clickedFilm;
  return (
    <>
      {state.loading ? (
        <Spinner />
      ) : (
        <Center
          flexDirection={['column', 'column', 'row', 'row']}
          mx="10px"
          my={['10px', '15px', '40px', '40px']}
          rounded="md"
          overflow="hidden"
          boxShadow="lg"
          bg={bgColor[colorMode]}
        >
          <Box w={['80vw', '60vw', '50vw', '50vw']}>
            <Image
              m="10px"
              src={poster}
              fallbackSrc={placeholder}
              alt={title}
              maxHeight="80vh"
              maxW="500px"
              w="90%"
            />
          </Box>
          <Box p={5} w={['100%', '100%', '90%', '90%']}>
            <Stack isInline align="baseline">
              <Badge
                variant="solid"
                bg={bagdeBg[colorMode]}
                rounded="full"
                px={2}
              >
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
              {state.characterDetails.map(char => (
                <Badge
                  key={char.name}
                  variant="subtle"
                  rounded="full"
                  fontSize={13}
                  color={textColor[colorMode]}
                  m={1}
                  p={1}
                  _hover={{ boxShadow: 'md', cursor: 'pointer' }}
                  _active={{ boxShadow: 'lg' }}
                  onClick={() => handleClick(char)}
                >
                  {char.name}
                </Badge>
              ))}
            </Box>
            <Box textAlign="center">
              <Button
                size="lg"
                mt={3}
                color="white"
                bg={bagdeBg[colorMode]}
                boxShadow="sm"
                onClick={() =>
                  handleSaveFilm(
                    state.clickedFilm,
                    state.favoriteFilms,
                    dispatch
                  )
                }
                _hover={{ boxShadow: 'md' }}
                _active={{ boxShadow: 'lg' }}
              >
                {state.favoriteFilms.find(film => film.title === title)
                  ? 'Saved'
                  : 'Add to Favorites'}
              </Button>
            </Box>
          </Box>
        </Center>
      )}
    </>
  );
}
