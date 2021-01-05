import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar(props) {
  return (
    <Flex
      h="10vh"
      justifyContent="space-between"
      alignItems="flex-start"
      backgroundColor="transparent"
    >
      <Box fontSize="xl">
        <HamburgerMenu />
      </Box>
      <Text textAlign='center' fontFamily="Audiowide, cursive" fontSize={[0, '2xl', '3xl', '3xl']}>
        STAR WARS
      </Text>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
}
