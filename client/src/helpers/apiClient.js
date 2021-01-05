/* eslint-disable no-console */
import axios from 'axios';
const swapiURL = 'https://swapi.dev/api';
const starwarsAPI = 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api';

export const getMovies = async () => {
  try {
    const apiResult = await axios.get(`${swapiURL}/films`);
    return apiResult;
  } catch (error) {
    console.error('Problem after getting films', error);
  }
};

export const getCharacterImages = async dispatch => {
  try {
    const apiResult = await axios.get(`${starwarsAPI}/all.json`);
    const charImages = apiResult.data.map(d => ({
      name: d.name,
      image: d.image,
      wiki: d.wiki,
    }));
    return charImages;
  } catch (error) {
    console.error('Problem after getting character images', error);
  }
};

export const getCharacter = async (characterId, dispatch) => {
  try {
    const apiResult = await axios.get(`${swapiURL}/people/${characterId}`);
    dispatch({ type: 'SET_CHAR', payload: apiResult.data });
  } catch (error) {
    console.error('Problem after getting character details', error);
  }
};
