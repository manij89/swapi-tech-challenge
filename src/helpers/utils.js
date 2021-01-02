import ls from 'local-storage';

export const handleSaveFilm = (film, list, dispatch) => {
  const newList = [...list];
  const index = newList.indexOf(film);
  if (newList.some(item => item.title === film.title)) newList.splice(index, 1)
  else newList.push(film);
  dispatch({type:'SET_FAV_FILMS', payload: newList});
  ls.set('favFilms', newList)
}

export const handleSaveCharacter = (char, list, dispatch) => {
  const newList = [...list];
  const index = newList.indexOf(char);
  if (newList.some(item => item.name === char.name)) newList.splice(index, 1)
  else newList.push(char);
  dispatch({type:'SET_FAV_CHARACTERS', payload: newList});
  ls.set('favChar', newList);
  
}

