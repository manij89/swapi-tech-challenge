import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Link,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { bgColor, textColor, bagdeBg } from '../../styles/colorModes';
import SaveIcon from './SaveIcon';
import { Context } from '../../context/Store';
import placeholder from '../../images/ligthST.svg';

export default function MovieTile({ film, handleSave }) {
  const { colorMode } = useColorMode();
  const [state, dispatch] = useContext(Context);
  const [poster, setPoster] = useState('');

  useEffect(() => {
    import(`../../images/${film.episode_id}.jpg`).then(image =>
      setPoster(image.default)
    );
  }, [film.episode_id]);

  const handleClick = () => {
    dispatch({
      type: 'SET_CLICKED_FILM',
      payload: { ...film, poster: poster },
    });
  };

  return (
    <Box
      w={['320px', '300px', '280px', '280px']}
      h={['90%', '90%', '80%', '80%']}
      mx="10px"
      my={['10px', '15px', '40px', '40px']}
      rounded="md"
      flexShrink="0"
      overflow="hidden"
      boxShadow="md"
      bg={bgColor[colorMode]}
    >
      {poster && (
          <Link as={ReachLink} to={`/film/${film.episode_id}`}>
            <Image
              src={poster}
              fallbackSrc={placeholder}
              alt="star wars poster"
              objectFit="fill"
              w="100%"
              h={['80%', '80%', '70%', '70%']}
              onClick={handleClick}
            />
          </Link>
      )}

      <Box p={5}>
        <Badge variant="solid" rounded="full" px={2} bg={bagdeBg[colorMode]}>
          Episode {+film.episode_id}
        </Badge>
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Text
            as="h2"
            fontWeight="bold"
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
