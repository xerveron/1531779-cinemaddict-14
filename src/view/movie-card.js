import dayjs from 'dayjs';

export const createMovieCard = (film) => {
  const {film_info, comments, user_details} = film;

  const year = dayjs(film_info.release.date).format('YYYY');

    return `<article class="film-card">
    <h3 class="film-card__title">${film_info.title}</h3>
    <p class="film-card__rating">${film_info.total_rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${film_info.runtime}</span>
      <span class="film-card__genre">${film_info.genre}</span>
    </p> 
    <img src="${film_info.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${film_info.description}</p>
    <a class="film-card__comments">${comments.length}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${user_details.watchlist ? "" : "film-card__controls-item--active"}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${user_details.already_watched ? "" : "film-card__controls-item--active"}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${user_details.favorite ? "" : "film-card__controls-item--active"}" type="button">Mark as favorite</button>
    </div>
  </article>`;
}