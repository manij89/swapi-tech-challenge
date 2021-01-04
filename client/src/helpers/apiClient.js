/* eslint-disable no-console */
import ls from 'local-storage';
const swapiURL = 'https://swapi.dev/api';
const starwarsAPI = 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api';


const fetchRequest = (base, url) =>
  fetch(`${base}/${url}`)
    .then(res => (res.status <= 400 ? res : Promise.reject(res)))
    .then(res => res.json())
    .catch(err => {
      console.log(`${err.message} while fetching /${url}`);
    });

export const getMovies = (fn) =>
  fetchRequest(swapiURL, 'films')
    .then(data => {
      fn({ type: 'SET_ALL_FILMS', payload: data.results });
      ls.set('allFilms', data.results);
    })
    .catch(e => console.error('Problem after getting films', e));

export const getCharacter = characterId =>
  fetchRequest(swapiURL, `people/${characterId}`);

export const getCharacterImages = (fn) =>
  fetchRequest(starwarsAPI, 'all.json')
    .then(data => {
      const result = data.map(d => ({
        name: d.name,
        image: d.image,
        wiki: d.wiki,
      }));
      fn({ type: 'SET_CHAR_IMAGES', payload: result });
      ls.set('allImages', result);
    })
    .catch(e => console.error('Problem after getting character info', e));
