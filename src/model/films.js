import Observer from './observer.js';

import { UserAction, UpdateType } from '../const.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);
    update.user_details.already_watched = update.isWatched;
    update.user_details.favorite = update.isFavorite;
    update.user_details.watchlist = update.isWatchList;

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
      this._films = [
        ...this._films.slice(0, index),
        update,
        ...this._films.slice(index + 1),
      ];
    this._notify(updateType, update);
  }

}