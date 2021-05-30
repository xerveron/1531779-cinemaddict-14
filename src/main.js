
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import { generateFilm } from './mock/film.js';
import { generateComments } from './mock/comments';
import MovieListView from './presenter/movie-list.js'

const FILMS_COUNT = 20;
const COMMENTS_COUNT = 50;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const comments = new Array (COMMENTS_COUNT).fill();
for (let i=0;i<50;i++) {
    comments[i]=generateComments(i);
}


const siteMainElement = document.querySelector('.main');
const siteBody = document.querySelector('body');
const siteHeader = document.querySelector('header');
const siteFooterStatistics = document.querySelector('.footer__statistics');

console.log (films);
console.log (comments);

/* const EXTRA_FILM_TITLE = [`Top rated`, `Most commented`];
const siteNavElement = document.querySelector('.header');

const openPopUp = (film, comments) => {
    const moviePopUp = new PopUpView(film,comments);
    siteBody.appendChild (moviePopUp.getElement());
    siteBody.classList.add('hide-overflow');
    moviePopUp.setCloseHandler(() => {
        siteBody.removeChild(moviePopUp.getElement());
        siteBody.classList.remove('hide-overflow');
    });
  }

const renderMovieCard = (movieListElement, film) => {
    const movieCard = new MovieCardView (film);
    renderElement(movieListElement,movieCard, RenderPosition.BEFOREEND);
    movieCard.setOpenPopUpHandler(() => {
        openPopUp(film,comments);
    });

    
} */

const filmsModel = new FilmsModel ();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel ();
commentsModel.setComments(comments);

const movieList = new MovieListView (filmsModel,commentsModel,siteMainElement,siteBody,siteHeader);

movieList.init(siteFooterStatistics);

/* renderElement(siteMainElement, new SiteMenuView(films), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterMenuView(), RenderPosition.BEFOREEND);
const movieList = new MoviesListView().getElement();
renderElement(siteMainElement,movieList,RenderPosition.BEFOREEND);
const siteFilmsSection = movieList.querySelector('.films');
const siteFilmsListSection = movieList.querySelector('.films-list');
const siteFilmsListContainer = movieList.querySelector('.films-list__container'); */

/* for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
    renderMovieCard(siteFilmsListContainer, films[i]);
}
if (films.length>FILMS_COUNT_PER_STEP) {
    let renderedFilms = FILMS_COUNT_PER_STEP;
    const showMoreButton = new ShowMoreView();
    renderElement (siteFilmsListSection, showMoreButton,RenderPosition.BEFOREEND);
    showMoreButton.setClickHandler (() => {
        films
            .slice(renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP)
            .forEach ((film) => renderMovieCard(siteFilmsListContainer, film));

        renderedFilms+= FILMS_COUNT_PER_STEP;
        if (renderedFilms >= films.length) {
            showMoreButton.getElement().remove();
            showMoreButton.removeElement();
        }
    });
}
 */



/* for (let i = 0; i < EXTRA_FILM_CARDS; i++) {
    for (let j = 0; j < EXTRA_FILM_COUNT; j++) {
        renderElement(siteFilmsSection.lastChild.lastChild, new MovieCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
    }
} */

;
