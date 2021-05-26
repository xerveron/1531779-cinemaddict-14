import UserTypeView from '../view/user-type.js';
import SiteMenuView from '../view/site-menu.js';
import FilterMenuView from '../view/filter-menu.js';
import MoviesListSectionView from '../view/movies-list-section.js';
import MoviesListView from '../view/movies-list.js';
import MovieCardView from '../view/movie-card.js';
import ShowMoreView from '../view/show-more.js';
import PopUpView from '../view/popup.js';
import MoviesListContainerView from '../view/movie-container.js';
import FooterStatisticsView from '../view/footer-statistics.js';
import { renderElement, createHTMLElement, render, RenderPosition } from '../util.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
    constructor(mainContainer, siteBody) {
        this._mainContainer = mainContainer;
        this._siteBody = siteBody;

        this._movieListSectionComponent = new MoviesListSectionView();
        this._mainMovieListComponent = new MoviesListView(true, 'All movies. Upcoming', false);
        this._ratedMovieListComponent = new MoviesListView(false, 'Top rated', true);
        this._commentedMovieListComponent = new MoviesListView(false, 'Most commented', true);
        this._mainMovieContainer = new MoviesListContainerView ();
        this._filterMenu = new FilterMenuView();

        this.renderPopUp = this.renderPopUp.bind(this);
    }

    init(films,comments) {
        this._films = films.slice();
        this._comments = comments.slice();
        this._siteMenu = new SiteMenuView(films);
        renderElement(this._mainContainer, this._siteMenu, RenderPosition.BEFOREEND);

        this.renderFilter();

        renderElement (this._mainContainer, this._movieListSectionComponent, RenderPosition.BEFOREEND);
        renderElement (this._movieListSectionComponent, this._mainMovieListComponent, RenderPosition.BEFOREEND);
        renderElement (this._movieListSectionComponent, this._ratedMovieListComponent, RenderPosition.BEFOREEND);
        renderElement (this._movieListSectionComponent, this._commentedMovieListComponent, RenderPosition.BEFOREEND);
        renderElement (this._mainMovieListComponent, this._mainMovieContainer,  RenderPosition.BEFOREEND)

        this.renderList();

    }

    renderFilter() {
        renderElement(this._mainContainer, this._filterMenu, RenderPosition.BEFOREEND);
    }

    renderFilm(film) {
        const movieCard = new MovieCardView(film);
        renderElement(this._mainMovieContainer, movieCard, RenderPosition.BEFOREEND);
        console.log(movieCard);
        movieCard.setOpenPopUpHandler(() => {
            this.renderPopUp(film, this._comments);
        });
    }

    renderPopUp(film, comments) {
        const moviePopUp = new PopUpView(film, comments);
        this._siteBody.appendChild(moviePopUp.getElement());
        this._siteBody.classList.add('hide-overflow');
        moviePopUp.setCloseHandler(() => {
            this._siteBody.removeChild(moviePopUp.getElement());
            this._siteBody.classList.remove('hide-overflow');
        });
    }

    renderShowMore() {
        let renderedFilms = FILMS_COUNT_PER_STEP;
        const showMoreButton = new ShowMoreView();
        renderElement(this._mainMovieListComponent, showMoreButton, RenderPosition.BEFOREEND);
        showMoreButton.setClickHandler(() => {
            /* this._renderFilms (renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP); */
            this._films
                .slice(renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP)
                .forEach((film) => this.renderFilm(film));

            renderedFilms += FILMS_COUNT_PER_STEP;
            if (renderedFilms >= this._films.length) {
                showMoreButton.getElement().remove();
                showMoreButton.removeElement();
            }
        });
    }

    renderFilms(from, to) {
        this._films
            .slice(from, to)
            .forEach((film) => this.renderFilm(film))
    }

    renderList() {
        console.log('1');
        this.renderFilms(0, FILMS_COUNT_PER_STEP);
        this.renderShowMore();
       

    }
}