import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Icon,
  Button,
  useColorMode,
} from '@chakra-ui/react';

export default function MovieTile({ film }) {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.200', dark: 'gray.700' };
  const textColor = { light: 'gray.500', dark: 'gray.100' };

  return (
    <Box
      w='350px'
      h='200px'
      m='10px'
      flexShrink='0'
      overflow="hidden"
      boxShadow="sm"
      bg={bgColor[colorMode]}
    >
      <Image src="./thumb.png" alt="Course Cover" />
      <Box p={5}>
        <Stack isInline align="baseline">
          <Badge variant="solid" variantColor="teal" rounded="full" px={2}>
            NEW!
          </Badge>
          <Badge variant="solid" variantColor="teal" rounded="full" px={2}>
            React
          </Badge>
        </Stack>
        <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
          {film.title}
        </Text>
        </Box>
      </Box>
  );
}
