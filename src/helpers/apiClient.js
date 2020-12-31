/* eslint-disable no-console */
const baseURL = 'https://swapi.dev/api';

const fetchRequest = (url) => fetch(`${baseURL}/${url}`)
  .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
  .then((res) => res.json())
  .catch((err) => {
    console.log(`${err.message} while fetching /${url}`);
  });


export const getMovies = () => fetchRequest('films');
export const getCharacter = (characterId) => fetchRequest(`people/${characterId}`);

