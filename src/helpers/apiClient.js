/* eslint-disable no-console */
const swapiURL = 'https://swapi.dev/api';
const starwarsAPI = 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api';

const fetchRequest = (base, url) => fetch(`${base}/${url}`)
  .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
  .then((res) => res.json())
  .catch((err) => {
    console.log(`${err.message} while fetching /${url}`);
  });


export const getMovies = () => fetchRequest(swapiURL, 'films');
export const getCharacter = (characterId) => fetchRequest(swapiURL, `people/${characterId}`);
export const getCharacterImages = () => fetchRequest(starwarsAPI, 'all.json');
