import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar(props) {
  return (
    <Flex h="10vh" justifyContent="space-between" alignItems="center">
        <Box fontSize="xl">
          <HamburgerMenu />
        </Box>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
}
