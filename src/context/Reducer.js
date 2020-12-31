const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL_FILMS':
      return {
        ...state,
        allFilms: action.payload,
      };
    case 'SET_FAV_FILMS':
      return {
        ...state,
        favoriteFilms: action.payload,
      };
    case 'SET_FAV_CHARACTERS':
      return {
        ...state,
        favoriteCharacters: action.payload,
      };
    case 'SET_CLICKED_FILM':
      return {
        ...state,
        clickedFilm: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;