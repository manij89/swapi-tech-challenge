import React from 'react';
import { Image, useColorMode, useColorModeValue} from '@chakra-ui/react';
import ligthST from '../../images/ligthST.svg';
import darkST from '../../images/darkST.svg';

const ColorModeSwitcher = props => {
  const { toggleColorMode} = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const svgSt = useColorModeValue( ligthST,darkST);

  return (
    <Image
      w='40px'
      h='40px'
      aria-label={`Switch to ${text} mode`}
      marginRight={4}
      onClick={toggleColorMode}
      src={svgSt}
      {...props}
      />
  );
};

export default ColorModeSwitcher;
