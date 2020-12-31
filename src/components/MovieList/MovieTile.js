import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import {bgColor, textColor, bagdeBg} from '../../styles/colorModes';
import SaveIcon from './SaveIcon';
import { Context } from '../../context/Store';
import { useHistory } from 'react-router-dom';

export default function MovieTile({ film, handleSave }) {

  const { colorMode } = useColorMode();
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [poster, setPoster] = useState('');

  useEffect(() => {
    import(`../../images/${film.episode_id}.jpg`).then(image =>
      setPoster(image.default)
    );
  }, []);

  const handleClick = () => {
    dispatch({type: 'SET_LOADING', payload: true})
    dispatch({type:'SET_CLICKED_FILM', payload: {...film, poster: poster}});
    history.push(`/filmDetails/${film.episode_id}`)
    dispatch({type: 'SET_LOADING', payload: false})
  }

  return (
    <Box
      w={['375px', '350px', '280px', '280px']}
      h={['90%', '90%', '65%', '65%']}
      mx="10px"
      my={['10px', '15px', '40px', '40px']}
      rounded="md"
      flexShrink="0"
      overflow="hidden"
      boxShadow="md"
      bg={bgColor[colorMode]}
    >
      {poster && (
        <Image
          src={poster}
          alt="star wars poster"
          objectFit="fill"
          w="100%"
          h="80%"
          onClick={handleClick}
        />
      )}

      <Box p={5}>
        <Stack isInline align="baseline">
          <Badge variant="solid" rounded="full" px={2} bg={bagdeBg[colorMode]}>
            Episode {+film.episode_id}
          </Badge>
        </Stack>
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            as="h2"
            fontWeight="semibold"
            fontSize="lg"
            my={2}
            color={textColor[colorMode]}
          >
            {film.title}
          </Text>
          <SaveIcon
            handleSave={() => handleSave(film)}
            target={film}
            list={state.favoriteFilms}
          />
        </Flex>
      </Box>
    </Box>
  );
}