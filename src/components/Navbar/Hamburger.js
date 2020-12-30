import React, { useState } from 'react';
import { Box, Flex, Stack, useColorMode } from '@chakra-ui/react';
import '../../styles/Hamburger.scss';
import { Link} from 'react-router-dom';

export default function Hamburger(props) {
  const [open, setOpen] = useState(false);
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.300', dark: 'gray.900' };
  const textColor = { light: 'gray.600', dark: 'gray.100' };

  const handleClick = e => {
    setOpen(!open);
  };
  return (
    <Flex>
      <Box id="container">
        <Box id="burger" className={open && 'active'} onClick={handleClick}>
          <Box className="bun top"></Box>
          <Box className="filling"></Box>
          <Box className="bun bottom"></Box>
        </Box>
      </Box>

      <Box as='nav' className={open ? 'show nav' : 'nav'}>
        <Stack
          as="ul"
          bgColor={bgColor[colorMode]}
          color={textColor[colorMode]}
          listStyleType="none"
          mx="0"
          w="100vw"
        >
          <Box as="li" className="green">
            <Link to="/">Home</Link>
          </Box>
          <Box as="li" className="red">
            <Link to="/favfilms">Favorite Films</Link>
          </Box>
          <Box as="li" className="blue">
            <Link to="/favcharacter">Favorite Characters</Link>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
