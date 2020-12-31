import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IconButton, useColorMode } from '@chakra-ui/react';
import {starColor} from '../../styles/colorModes'


export default function SaveIcon({ handleSave, list, target }) {
  const { colormode } = useColorMode();

  return (
    <>
      <IconButton
        size="lg"
        variant=''ghost
        fontSize="1.7em"
        aria-label="Save"
        colorScheme={starColor[colormode]} 
        icon={
          list.some(film => film.title === target.title) ? (
            <AiFillStar />
          ) : (
            <AiOutlineStar />
          )
        }
        onClick={handleSave}
      />
    </>
  );
}
