import React from 'react';
import { Flex, Image, Text, useColorMode} from '@chakra-ui/react';


export default function Placeholder({message, Yoda}) {

  const { colorMode } = useColorMode();
  const bgColor = { light: 'green.100', dark: 'gray.700' };
  const textColor = { light: 'gray.500', dark: 'gray.100' };

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
        fontSize="2xl"
        p="5px"
        textAlign="center"
        color={textColor[colorMode]}
      >
       {message} 
      </Text>
    </Flex>
  );
}
