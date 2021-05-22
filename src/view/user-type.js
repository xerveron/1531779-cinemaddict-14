import {createElement} from '../util.js';

const createUserType = (statistics,avatar) => {
  let rating = ``;
  let userAvatar = ``;
  if (statistics) {
    rating = `Movie Buff`;
  }
  if (avatar) {
    userAvatar = avatar;
  }
  return `<section class="header__profile profile">
  <p class="profile__rating">${rating}</p>
  <img class="profile__avatar" src="${userAvatar}" alt="Avatar" width="35" height="35">
</section>`;
}

export default class UserType {
  constructor (statistics,avatar) {
    this._element = null;
    this._statistics = statistics;
    this._avatar = avatar;
  }

  getTemplate() {
    return createUserType(this._statistics, this._avatar);
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