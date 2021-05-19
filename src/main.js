import { createSiteMenuTemplate } from './view/site-menu.js';
import { createUserType } from './view/user-type.js';
import { createFilterMenu } from './view/filter-menu.js';
import { createMovieCard } from './view/movie-card.js';
import { createElement } from './view/cards-section.js';
import { createFooterStatistics } from './view/footer-statistics.js';
import { createPopUp } from './view/popup.js';
import { generateFilm } from './mock/film.js';
import { generateComments } from './mock/comments';

const MAIN_FILM_COUNT = 5;
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

const extraFilmTitle = [`Top rated`, `Most commented`];


const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
}
const siteMainElement = document.querySelector('.main');
const siteNavElement = document.querySelector('.header');


render(siteNavElement, createUserType(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilterMenu(), 'beforeend');
render(siteMainElement, createElement(`section`, "films", ``), 'beforeend');

const siteFilmsSection = document.querySelector('.films');

render(siteFilmsSection, createElement(`section`, "films-list", ``), 'beforeend');


const siteFilmsListSection = document.querySelector('.films-list');

render(siteFilmsListSection, createElement(`h2`, `"films-list__title visually-hidden"`, `All movies. Upcoming`), 'beforeend');
render(siteFilmsListSection, createElement(`div`, "films-list__container", ``), 'beforeend');


const siteFilmCardElement = document.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
    render(siteFilmCardElement, createMovieCard(films[i]), 'beforeend');
}
if (films.length>FILMS_COUNT_PER_STEP) {
    let renderedFilms = FILMS_COUNT_PER_STEP;
    render(siteFilmsListSection, createElement('button', 'films-list__show-more', 'Show more'), 'beforeend');
    const showMoreButton = siteFilmsListSection.querySelector('.films-list__show-more');
    showMoreButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        films
            .slice(renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP)
            .forEach ((film) => render(siteFilmCardElement, createMovieCard(film), 'beforeend'));

        renderedFilms+= FILMS_COUNT_PER_STEP;
        if (renderedFilms >= films.length) {
            showMoreButton.remove();
        }
    });
}


for (let i = 0; i < EXTRA_FILM_CARDS; i++) {
    render(siteFilmsSection, createElement(`section`, '"films-list films-list--extra"', ``), 'beforeend');

    render(siteFilmsSection.lastChild, createElement(`h2`, `"films-list__title"`, extraFilmTitle[i]), 'beforeend');
    render(siteFilmsSection.lastChild, createElement(`div`, "films-list__container", ``), 'beforeend');
    for (let j = 0; j < EXTRA_FILM_COUNT; j++) {
        render(siteFilmsSection.lastChild.lastChild, createMovieCard(films[i]), 'beforeend');
    }
}

const siteFooterStatistics = document.querySelector('.footer__statistics');
const siteFooter = document.querySelector('.footer');

render(siteFooterStatistics, createFooterStatistics(), 'beforeend');

render(siteFooter, createPopUp(films[0],comments), 'afterend')

render
