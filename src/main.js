import SiteMenuView from './view/site-menu.js';
import UserTypeView from './view/user-type.js';
import FilterMenu from './view/filter-menu.js';
import MovieCardView from './view/movie-card.js';
import { renderElement,createHTMLElement,render,openPopUp,RenderPosition } from './util.js';
import FooterStatisticsView from './view/footer-statistics.js';
import PopUpView from './view/popup.js';
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
const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteNavElement = document.querySelector('.header');

const renderMovieCard = (movieListElement, film) => {
    const movieCard = new MovieCardView (film);
    renderElement(movieListElement,movieCard.getElement(), RenderPosition.BEFOREEND);

    const openPopUp = () => {
        const moviePopUp = new PopUpView(film,comments).getElement();
        siteBody.appendChild (moviePopUp);
        siteBody.classList.add('hide-overflow');
        document.querySelector('.film-details__close-btn').addEventListener('click', () => {
            siteBody.removeChild(moviePopUp);
            siteBody.classList.remove('hide-overflow');
        })
    }

    movieCard.getElement().querySelector('.film-card__title').addEventListener('click',() => {
        openPopUp();
    })
    movieCard.getElement().querySelector('.film-card__poster').addEventListener('click',() => {
        openPopUp();
    })
    movieCard.getElement().querySelector('.film-card__comments').addEventListener('click',() => {
        openPopUp();
    })

    
}

renderElement(siteNavElement, new UserTypeView (10,`images/bitmap@2x.png`).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView(films).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterMenu().getElement(), RenderPosition.BEFOREEND);
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
    render(siteFilmsListSection, createHTMLElement('button', 'films-list__show-more', 'Show more'), RenderPosition.BEFOREEND);
    const showMoreButton = siteFilmsListSection.querySelector('.films-list__show-more');
    showMoreButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        films
            .slice(renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP)
            .forEach ((film) => renderMovieCard(siteFilmsListContainer, film));

        renderedFilms+= FILMS_COUNT_PER_STEP;
        if (renderedFilms >= films.length) {
            showMoreButton.remove();
        }
    });
}




/* for (let i = 0; i < EXTRA_FILM_CARDS; i++) {
    for (let j = 0; j < EXTRA_FILM_COUNT; j++) {
        renderElement(siteFilmsSection.lastChild.lastChild, new MovieCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
    }
} */

const siteFooterStatistics = document.querySelector('.footer__statistics');

renderElement(siteFooterStatistics, new FooterStatisticsView(films).getElement(), RenderPosition.BEFOREEND);
