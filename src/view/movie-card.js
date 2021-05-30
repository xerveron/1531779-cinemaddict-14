import dayjs from 'dayjs';
import Smart from './smart.js';


const createCardFilmInfo = (filmInfo) => {
  const year = dayjs(filmInfo.release.date).format('YYYY');

  return `<h3 class="film-card__title">${filmInfo.title}</h3>
  <p class="film-card__rating">${filmInfo.total_rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${filmInfo.runtime}</span>
    <span class="film-card__genre">${filmInfo.genre}</span>
  </p> 
  <img src="${filmInfo.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${filmInfo.description}</p>`
};

const createCardCommentsInfo = (commentsLength) => {
  return `<a class="film-card__comments">${commentsLength}</a>`;
};

const createCardUserInfo = (isWatchList,isWatched,isFavorite) => {
  return `<div class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchList ? "film-card__controls-item--active" : ""}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? "film-card__controls-item--active" : ""}" type="button">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? "film-card__controls-item--active" : ""}" type="button">Mark as favorite</button>
</div>`
};


const createMovieCard = (data) => {
  const {film_info, comments,isWatchList,isWatched,isFavorite} = data;

  
    return `<article class="film-card">
    ${createCardFilmInfo(film_info)}
    ${createCardCommentsInfo(comments.length)}
    ${createCardUserInfo(isWatchList,isWatched,isFavorite)}
  </article>`;
}

export default class MovieCard extends Smart {
  constructor (film) {
    super();
    this._data = MovieCard.parseFilmToData (film);
    this._openPopUpHandler = this._openPopUpHandler.bind(this);


    /* this._watchListToggleHandler = this._watchListToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this); */

    this._watchListHandler = this._watchListHandler.bind(this);
    this._favoriteHandler = this._favoriteHandler.bind(this);
    this._watchedHandler = this._watchedHandler.bind(this);

    this.setWatchListHandler = this.setWatchListHandler.bind(this);
    this.setWatchedHandler = this.setWatchedHandler.bind(this);
    this.setFavoriteHandler = this.setFavoriteHandler.bind(this);
/* 
    this._setInnerHandlers(); */
  }

  getTemplate() {
    return createMovieCard(this._data);
  }

   static parseFilmToData (film) {
    /* et filmUserInfo = {
      filmUserInfo : {
      isWatchList:film.user_details.watchlist,
      isWatched:film.user_details.already_watched,
      isFavorite:film.user_details.favorite,
      },
    }  */
    return Object.assign (
      {},
      film,
      {isWatchList:film.user_details.watchlist,
      isWatched:film.user_details.already_watched,
      isFavorite:film.user_details.favorite,}
    )
  } 

   static parseDataToFilm (data) {
    data.user_details.watchlist = data.filmUserInfo.isWatchList;
    data.user_details.already_watched = data.filmUserInfo.isWatched;
    data.user_details.favorite = data.filmUserInfo.isFavorite;
    delete data.filmUserInfo;
    return data;
  } 

  

  /* _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._setWatchedHandler);
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._setWatchListHandler);
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteToggleHandler);
  } */
/* 
  restoreHandlers() {
    this._setInnerHandlers();
  } */

  updateData(update) {
    if (!update) {
      return;
    }

    this._data.filmUserInfo = Object.assign(
      {},
      this._data.filmUserInfo,
      update,
    );
    
    this.updateElement();
  }

  _watchListHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick(this);
  }

  _watchedHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(this);
  }

  _favoriteHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(this);
  }

  setWatchListHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListHandler);
  }

  setWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedHandler);
  }

  setFavoriteHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteHandler);
  }
 

  _openPopUpHandler (evt) {
    evt.preventDefault();
    this._callback.popUp();
  }


  setOpenPopUpHandler (callback) {
    this._callback.popUp = callback;

    this.getElement().querySelector('.film-card__title').addEventListener('click',this._openPopUpHandler);

    this.getElement().querySelector('.film-card__poster').addEventListener('click',this._openPopUpHandler);

    this.getElement().querySelector('.film-card__comments').addEventListener('click',this._openPopUpHandler);
  }
}