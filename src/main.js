import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserType} from './view/user-type.js';
import {createFilterMenu} from './view/filter-menu.js';
import {createMovieCard} from './view/movie-card.js';
import {createElement} from './view/cards-section.js';
import {createFooterStatistics} from './view/footer-statistics.js';

const MAIN_FILM_COUNT = 5;
const EXTRA_FILM_CARDS = 2;
const EXTRA_FILM_COUNT = 2;

const extraFilmTitle = [`Top rated`, `Most commented`];


const render = (container, template, place) => {
    container.insertAdjacentHTML (place, template);
}

const siteMainElement = document.querySelector ('.main');
const siteNavElement = document.querySelector ('.header');


render (siteNavElement, createUserType(), 'beforeend');
render (siteMainElement, createSiteMenuTemplate(), 'beforeend');
render (siteMainElement, createFilterMenu(), 'beforeend');
render (siteMainElement, createElement(`section`,"films",``), 'beforeend');

const siteFilmsSection = document.querySelector ('.films');

render (siteFilmsSection, createElement(`section`,"films-list",``),'beforeend');


const siteFilmsListSection = document.querySelector ('.films-list');

render (siteFilmsListSection, createElement(`h2`,`"films-list__title visually-hidden"`,`All movies. Upcoming`),'beforeend');
render (siteFilmsListSection, createElement(`div`,"films-list__container",``),'beforeend');


const siteFilmCardElement = document.querySelector ('.films-list__container');

for (let i = 0; i<MAIN_FILM_COUNT; i++) {
    render (siteFilmCardElement, createMovieCard(),'beforeend');
}

render (siteFilmsListSection, createElement('button','"films-list__show-more"','Show more'),'beforeend');


for (let i=0; i<EXTRA_FILM_CARDS; i++) {
    render (siteFilmsSection, createElement(`section`,'"films-list films-list--extra"',``),'beforeend');

    render (siteFilmsSection.lastChild, createElement(`h2`,`"films-list__title"`,extraFilmTitle[i]),'beforeend');
    render (siteFilmsSection.lastChild, createElement(`div`,"films-list__container",``),'beforeend');
    for (let j=0; j<EXTRA_FILM_COUNT; j++) {
        render (siteFilmsSection.lastChild.lastChild, createMovieCard(),'beforeend');
    }
}

const siteFooter = document.querySelector ('.footer__statistics');

render (siteFooter, createFooterStatistics(),'beforeend');

render
