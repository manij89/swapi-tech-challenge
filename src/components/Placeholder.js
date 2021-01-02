import React from 'react';
import { Flex, Image, Text, useColorMode} from '@chakra-ui/react';
import {bgColor, textColor} from '../styles/colorModes';

export default function Placeholder({message, Yoda}) {

  const { colorMode } = useColorMode();

  return (
    <Flex
      minW="350px"
      w="350px"
      h="auto"
      rounded="md"
      overflow="hidden"
      bg={bgColor[colorMode]}
      direction="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="lg"
    >
      <Image src={Yoda} alt="baby yoda" />
      <Text
        fontSize="xl"
        p="5px"
        textAlign="center"
        color={textColor[colorMode]}
      >
       {message} 
      </Text>
    </Flex>
  );
}
