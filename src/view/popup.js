import dayjs from 'dayjs';
import Smart from './smart.js'

const createPopUpMovieInfo = (filmInfo) => {

  const date = dayjs(filmInfo.release.date).format('DD MMMM YYYY');

  return `<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

    <p class="film-details__age">${filmInfo.age_rating}+</p>
  </div>

  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${filmInfo.title}</h3>
        <p class="film-details__title-original">Original: ${filmInfo.alternative_title}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${filmInfo.total_rating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${filmInfo.director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${filmInfo.writers}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${filmInfo.actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${date}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${filmInfo.runtime}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${filmInfo.release.release_country}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">${filmInfo.genre.length > 1 ? 'Genres' : 'Genre'}</td>
        <td class="film-details__cell">
          ${filmInfo.genre.map((a) => ('<span class="film-details__genre">'+a+'</span>')).join ('') }
      </tr>
    </table>

    <p class="film-details__film-description">
      ${filmInfo.description}
    </p>
  </div>
</div>`
}

const createPopUpUserInfo = (filmUserInfo) => {
  const {isWatchList,isWatched,isFavorite} = filmUserInfo;
  return `<section class="film-details__controls">
  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"  ${isWatchList ? `checked` : ``}>
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
</section>`
}

const createPopUpCommentInfo = (comments, commentInput,emoji) => {

  let filmComments = [];
    for (let i=0;i<comments.length;i++) {
        filmComments[i]=commentInput[comments[i]];
    }
  
  return `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    <ul class="film-details__comments-list">
      ${!filmComments ? `` : filmComments.map((a) => (`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${a.emotion}.png" width="55" height="55" alt="emoji-${a.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${a.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${a.author}</span>
          <span class="film-details__comment-day">${dayjs(a.date).format('YYYY/MM/DD HH:MM')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`)).join (``) }
    </ul>

    <div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">${createEmojiImage(emoji)}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  </section>
</div>`
}

const createEmojiImage = (emoji) => {
  return `${emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ``}`
}

const createPopUp = (data,commentInput,emoji) => {

  const {film_info, comments, filmUserInfo} = data;

  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    ${createPopUpMovieInfo(film_info)}
    ${createPopUpUserInfo(filmUserInfo)}
  </div>
  ${createPopUpCommentInfo(comments,commentInput,emoji)}
</form>
</section>`;
}

export default class PopUp extends Smart {
    constructor (film,comment) {
      super();
      this._data = PopUp.parseFilmToData (film);
      this._comment = comment;
      this._emojiLabel = null;
      this._closeHandler = this._closeHandler.bind(this);

      this._watchListToggleHandler = this._watchListToggleHandler.bind(this);
      this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
      this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
      this._emojiToggleHandler = this._emojiToggleHandler.bind(this);

      this._setInnerHandlers()
    }
  
    getTemplate() {
      return createPopUp(this._data,this._comment,this._emojiLabel);
    }

    static parseFilmToData (film) {
      let filmUserInfo = {
        filmUserInfo : {
        isWatchList:film.user_details.watchlist,
        isWatched:film.user_details.already_watched,
        isFavorite:film.user_details.favorite,
        },
      }
      return Object.assign (
        {},
        film,
        filmUserInfo,
      )
    }
  
    static parseDataToFilm (data) {
      data.user_details.watchlist = data.filmUserInfo.isWatchList;
      data.user_details.already_watched = data.filmUserInfo.isWatched;
      data.user_details.favorite = data.filmUserInfo.isFavorite;
      delete data.filmUserInfo;
      return data;
    }
    
    _setInnerHandlers() {
      /* this._callback.close = callback; */
      this.getElement()
        .querySelector('.film-details__control-label--watchlist')
        .addEventListener('click', this._watchListToggleHandler);
      this.getElement()
        .querySelector('.film-details__control-label--watched')
        .addEventListener('click', this._watchedToggleHandler);
      this.getElement()
        .querySelector('.film-details__control-label--favorite')
        .addEventListener('click', this._favoriteToggleHandler);
      this.getElement()
        .querySelectorAll('.film-details__emoji-item')
        .forEach((element) => {element.addEventListener('change', this._emojiToggleHandler)});
        this.setCloseHandler(() => {
          document.querySelector('body').removeChild(this.getElement());
          document.querySelector('body').classList.remove('hide-overflow');
      })
    }

    restoreHandlers() {
      this._setInnerHandlers();
    }
    
    updateUserInfo(update) {
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
    
    _watchListToggleHandler(evt) {
      evt.preventDefault();
      this.updateUserInfo ({isWatchList : !this._data.filmUserInfo.isWatchList,});
    }
  
    _watchedToggleHandler(evt) {
      evt.preventDefault();
      this.updateUserInfo ({isWatched : !this._data.filmUserInfo.isWatched,});
    }
  
    _favoriteToggleHandler(evt) {
      evt.preventDefault();
      this.updateUserInfo({isFavorite : !this._data.filmUserInfo.isFavorite,});
    }

    _emojiToggleHandler(evt) {
      evt.preventDefault();
      this._emojiLabel = this.getElement().querySelector('input[name="comment-emoji"]:checked').value;
      let emojiContainer = this.getElement().querySelector ('.film-details__add-emoji-label');
      emojiContainer.innerHTML = createEmojiImage(this._emojiLabel);
    }
  
    /* _openPopUpHandler (evt) {
      evt.preventDefault();
      this._callback.popUp();
    } */

    _closeHandler (evt) {
      evt.preventDefault();
      this._callback.close();
    }

    setCloseHandler (callback) {
      this._callback.close = callback;

      this.getElement().querySelector('.film-details__close-btn').addEventListener('click',this._closeHandler);

    }
  }