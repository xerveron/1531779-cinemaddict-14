import {createElement} from '../util.js';

const createSiteMenu = (films) => {

    let userPreferrences = {
      watchlist: 0,
      alreadyWatched: 0,
      favorites: 0,
    };
    
    for (let i=0; i<films.length; i++) {
      if (films[i].user_details.watchlist) {
        userPreferrences.watchlist++;
      }
      if (films[i].user_details.already_watched) {
        userPreferrences.alreadyWatched++;
      }
      if (films[i].user_details.favorite) {
        userPreferrences.favorites++;
      }
    }

    return `<nav class="main-navigation">
              <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
                <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${userPreferrences.watchlist}</span></a>
                <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${userPreferrences.alreadyWatched}</span></a>
                <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${userPreferrences.favorites}</span></a>
              </div>
              <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`;
}

export default class SiteMenu {
  constructor (films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createSiteMenu(this._films);
  }
  
  getElement() {
    if (!this._element) {
      this._element = createElement (this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}