import SiteMenuView from './view/site-menu.js';
import UserTypeView from './view/user-type.js';
import FilterMenuView from './view/filter-menu.js';
import MovieCardView from './view/movie-card.js';
import ShowMoreView from './view/show-more.js';
import { renderElement,createHTMLElement,render,RenderPosition } from './util.js';
import PopUpView from './view/popup.js';
import FooterStatisticsView from './view/footer-statistics.js';
import MoviesListView from './view/movies-list';
import { generateFilm } from './mock/film.js';
import { generateComments } from './mock/comments';

const EXTRA_FILM_CARDS = 2;
const EXTRA_FILM_COUNT = 2;
const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const COMMENTS_COUNT = 50;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const comments = new Array (COMMENTS_COUNT).fill();
for (let i=0;i<50;i++) {
    comments[i]=generateComments(i);
}

console.log (films);
console.log (comments);

const EXTRA_FILM_TITLE = [`Top rated`, `Most commented`];
const siteMainElement = document.querySelector('.main');
const siteNavElement = document.querySelector('.header');
const siteBody = document.querySelector('body');

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

    
}

renderElement(siteNavElement, new UserTypeView (10,`images/bitmap@2x.png`), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView(films), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterMenuView(), RenderPosition.BEFOREEND);
const movieList = new MoviesListView().getElement();
renderElement(siteMainElement,movieList,RenderPosition.BEFOREEND);
const siteFilmsSection = movieList.querySelector('.films');
const siteFilmsListSection = movieList.querySelector('.films-list');
const siteFilmsListContainer = movieList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
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




/* for (let i = 0; i < EXTRA_FILM_CARDS; i++) {
    for (let j = 0; j < EXTRA_FILM_COUNT; j++) {
        renderElement(siteFilmsSection.lastChild.lastChild, new MovieCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
    }
} */

const siteFooterStatistics = document.querySelector('.footer__statistics');

renderElement(siteFooterStatistics, new FooterStatisticsView(films), RenderPosition.BEFOREEND);
