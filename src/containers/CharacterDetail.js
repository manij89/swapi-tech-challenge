/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react';
import {
  Center,
  Image,
  Box,
  Link,
  // Stack,
  Badge,
  Text,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Store';
import { bgColor, textColor } from '../styles/colorModes';
import { handleSaveCharacter } from '../helpers/utils';

export default function Characterdetail({ name }) {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const { colorMode } = useColorMode();
  const currChar = useRef(
    state.characterDetails.find(char => char.name === name)
  );
  const extraInfoChar = useRef(
    state.allImages.find(char => char.name === name)
  );

  const getCharInfo = () => {
    if (state.characterDetails.length && state.allImages.length) {
      dispatch({
        type: 'SET_CLICKED_CHAR',
        payload: {
          ...currChar.current,
          image: extraInfoChar.image,
          wiki: extraInfoChar.wiki,
        },
      })
      const characterFilms = state.allFilms.filter(f => f.url === currChar.current.films)
     
      console.log(currChar.current.films, characterFilms);
      ;
    } else {
      history.goBack();
    }
  };

  const getCharMovies = () => {
    console.log('in char movies')
    const list = [...state.clickedChar.films]
    const result = list.map(f => {console.log(f); list.includes(f)});
    console.log(result);

  }

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    getCharInfo();
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);


  return (
    <>
      {state.loading ? (
        'loading...'
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
          <Image
            m="10px"
            src={extraInfoChar.current.image}
            alt={name}
            h="auto"
            w={['60%', '50%', '50%', '50%']}
          />
          <Box p={5} w="100%">
            <Text
              as="h2"
              fontWeight="bold"
              fontSize="1.5rem"
              my={2}
              color={textColor[colorMode]}
            >
              {name}
            </Text>
            <Text color={textColor[colorMode]} fontWeight="light" fontSize="md">
              More info: <Link>{extraInfoChar.current.wiki}</Link>
            </Text>
            <Box my={2}>
            {state.clickedChar.films.map(f => (
              <Badge
                key={f.title}
                variant="subtle"
                rounded="full"
                fontSize={13}
                m={1}
                p={1}
                _hover={{ boxShadow: 'md', cursor: 'pointer' }}
                _active={{ boxShadow: 'lg' }}
                onClick={() => history.push(`/filmDetails/${f.episode_id}`)}
              >
                {f.title}
              </Badge>
            ))}
          </Box>
            <Box textAlign="center">
              <Button
                size="lg"
                mt={3}
                boxShadow="sm"
                onClick={() =>
                  handleSaveCharacter(
                    state.clickedChar,
                    state.favoriteCharacters,
                    dispatch
                  )
                }
                _hover={{ boxShadow: 'md' }}
                _active={{ boxShadow: 'lg' }}
              >
                {state.favoriteCharacters.find(char => char.name === name)
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
