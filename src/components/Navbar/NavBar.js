import React from 'react';
import { Flex, DarkMode, Box } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';
import Hamburger from './Hamburger';

export default function Navbar(props) {
  return (
    <Flex h="10vh" justifyContent="space-between" alignItems="center">
        <Box fontSize="xl">
          <Hamburger />
        </Box>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
}
