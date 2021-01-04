/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  Center,
  Image,
  Box,
  Link,
  Badge,
  UnorderedList,
  ListItem,
  Text,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import ls from 'local-storage';
import Spinner from '../components/Spinner';
import { useHistory, Link as ReachLink } from 'react-router-dom';
import { Context } from '../context/Store';
import { bagdeBg, bgColor, textColor } from '../styles/colorModes';
import { handleSaveCharacter } from '../helpers/utils';

export default function Characterdetail({ name }) {
  const [state, dispatch] = useContext(Context);
  const [charFilms, setCharFilms] = useState([]);
  const history = useHistory();
  const { colorMode } = useColorMode();

  const getCharMovies = () => {
    const list = [...state.allFilms] || ls.get('allFilms');
    const result = list.filter(f => state.clickedChar.films.includes(f.url));
    setCharFilms(result);
  };

  const handleClick = film => {
    import(`../images/${film.episode_id}.jpg`).then(image =>
      dispatch({
        type: 'SET_CLICKED_FILM',
        payload: { ...film, poster: image.default },
      })
    );
  };

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    if (state.clickedChar.name) {
      getCharMovies();
    } else {
      history.goBack();
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.clickedChar]);

  const {
    image,
    wiki,
    height,
    hair_color,
    skin_color,
    birth_year,
  } = state.clickedChar;
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
          <Image
            m="10px"
            src={image}
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
            <UnorderedList listStyleType="none">
              <ListItem>Height: {height}</ListItem>
              <ListItem>Hair Color: {hair_color}</ListItem>
              <ListItem>Skin: {skin_color}</ListItem>
              <ListItem>Birth year: {birth_year}</ListItem>
              <ListItem>
                More info: <Link>{wiki}</Link>
              </ListItem>
            </UnorderedList>

            <Box my={2}>
              {charFilms.map(f => (
                <Link as={ReachLink} to={`/film/${f.episode_id}`}>
                  <Badge
                    key={f.title}
                    variant="subtle"
                    rounded="full"
                    fontSize={13}
                    m={1}
                    p={1}
                    _hover={{ boxShadow: 'md', cursor: 'pointer' }}
                    _active={{ boxShadow: 'lg' }}
                    onClick={() => handleClick(f)}
                  >
                    {f.title}
                  </Badge>
                </Link>
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
