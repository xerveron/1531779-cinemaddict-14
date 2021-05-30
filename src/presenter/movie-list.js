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
import { UserAction, UpdateType, SortType } from '../const.js';
import { updateItem, renderElement, remove, RenderPosition } from '../util.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
    constructor(filmsModel, commentsModel, mainContainer, siteBody, siteHeader, changeData, changeMode) {
        this._filmsModel = filmsModel;
        this._commentsModel = commentsModel;
        this._mainContainer = mainContainer;
        this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
        this._siteBody = siteBody;
        this._siteHeader = siteHeader;
        this._changeData = changeData;
        this._changeMode = changeMode;
        this._movieCard = {};
        this._moviePopUp = null;
        this._userType = new UserTypeView(10, `images/bitmap@2x.png`);
        this._movieListSectionComponent = new MoviesListSectionView();
        this._showMoreButtonComponent = new ShowMoreView();
        this._mainMovieListComponent = new MoviesListView(true, 'All movies. Upcoming', false);
        this._ratedMovieListComponent = new MoviesListView(false, 'Top rated', true);
        this._commentedMovieListComponent = new MoviesListView(false, 'Most commented', true);
        this._mainMovieContainer = new MoviesListContainerView();
        this._filterMenu = new FilterMenuView();

        this.renderPopUp = this.renderPopUp.bind(this);
        this._handleLoadShowMoreClick = this._handleLoadShowMoreClick.bind(this);
        this._handleViewAction = this._handleViewAction.bind(this);
        this._handleModelEvent = this._handleModelEvent.bind(this);
        this._handleWatchListClick = this._handleWatchListClick.bind(this);
        this._handleWatchedClick = this._handleWatchedClick.bind(this);
        this._handleFavoriteClick = this._handleFavoriteClick.bind(this);



        this._filmsModel.addObserver(this._handleModelEvent);
        this._commentsModel.addObserver(this._handleModelEvent);
    }


    _getFilms() {
        return this._filmsModel.getFilms();
    }

    _getComments() {
        return this._commentsModel.getComments();
    }

    init(footerContainer) {
        this._footerContainer = footerContainer;
        this._siteMenu = new SiteMenuView(this._getFilms());
        this._footerStatistics = new FooterStatisticsView(this._getFilms());


        renderElement(this._siteHeader, this._userType, RenderPosition.BEFOREEND);
        this.renderFilter();
        renderElement(this._mainContainer, this._siteMenu, RenderPosition.BEFOREEND);
        renderElement(this._mainContainer, this._movieListSectionComponent, RenderPosition.BEFOREEND);
        renderElement(this._movieListSectionComponent, this._mainMovieListComponent, RenderPosition.BEFOREEND);
        renderElement(this._movieListSectionComponent, this._ratedMovieListComponent, RenderPosition.BEFOREEND);
        renderElement(this._movieListSectionComponent, this._commentedMovieListComponent, RenderPosition.BEFOREEND);
        renderElement(this._mainMovieListComponent, this._mainMovieContainer, RenderPosition.BEFOREEND);
        this._renderList();
        renderElement(this._footerContainer, this._footerStatistics, RenderPosition.BEFOREEND);



    }

    _handleViewAction(actionType, updateType, update) {
        switch (actionType) {
            case UserAction.UPDATE_CARD:
                this._filmsModel.updateFilm(updateType, update);
                break;
            case UserAction.UPDATE_POP_UP:
                this._filmsModel.updateFilm(updateType, update);
                break;
            case UserAction.ADD_COMMENT:
                this._tasksModel.addComment(updateType, update);
                break;
            case UserAction.DELETE_COMMENT:
                this._tasksModel.deleteComment(updateType, update);
                break;
        }
    }

    _handleModelEvent(updateType, film) {
        switch (updateType) {
            case UpdateType.POPUP:
                console.log(film);
                remove(this._moviePopUp);
                this.renderPopUp(film,this._getComments())
                this._clearBoard();
                this._renderList();
                this._renderShowMore();
                break;
            case UpdateType.BOARD:
                this._clearBoard();
                this._renderList();
                this._renderShowMore();
                break;
            case UpdateType.PAGE:
                break;
        }
    }



    renderFilter() {
        renderElement(this._mainContainer, this._filterMenu, RenderPosition.BEFOREEND);
    }

    renderFilm(film) {

        const movieCard = new MovieCardView(film);
        renderElement(this._mainMovieContainer, movieCard, RenderPosition.BEFOREEND);
        this._movieCard[film.id] = movieCard;

        this._movieCard[film.id].setWatchListHandler(this._handleWatchListClick);
        this._movieCard[film.id].setWatchedHandler(this._handleWatchedClick);
        this._movieCard[film.id].setFavoriteHandler(this._handleFavoriteClick);


        movieCard.setOpenPopUpHandler(() => {
            this.renderPopUp(film, this._getComments());
        });
    }

    renderPopUp(film, comments) {
        console.log(this._moviePopUp)
        if (this._moviePopUp) {
            remove(this._moviePopUp),
            this._moviePopUp=null;
        }
        this._moviePopUp = new PopUpView(film, comments);
        this._siteBody.appendChild(this._moviePopUp.getElement());

        this._moviePopUp.setWatchListHandler(this._handleWatchListClick);
        this._moviePopUp.setWatchedHandler(this._handleWatchedClick);
        this._moviePopUp.setFavoriteHandler(this._handleFavoriteClick);
        this._moviePopUp.setCommentHandler(this._handleCommentSubmit);
    }

    _handleCommentSubmit(movieCard) {
            this._handleViewAction(
                UserAction.ADD_COMMENT,
                UpdateType.POPUP,
                Object.assign(
                    {},
                    movieCard._data,
                    {
                        isWatchList: !movieCard._data.isWatchList,
                    },
                ),
            );
        } 

    _handleWatchListClick(movieCard, popUp = null) {
        if (popUp) {
            this._handleViewAction(
                UserAction.UPDATE_POP_UP,
                UpdateType.POPUP,
                Object.assign(
                    {},
                    movieCard._data,
                    {
                        isWatchList: !movieCard._data.isWatchList,
                    },
                ),
            );
        } else {
            this._handleViewAction(
                UserAction.UPDATE_CARD,
                UpdateType.BOARD,
                Object.assign(
                    {},
                    movieCard._data,
                    {
                        isWatchList: !movieCard._data.isWatchList,
                    },
                ),
            );
        }
    }

    _handleWatchedClick(movieCard, popUp = null) {
        if (popUp) {
            this._handleViewAction(
                UserAction.UPDATE_POP_UP,
                UpdateType.POPUP,
                Object.assign(
                    {},
                    movieCard._data,
                    {
                        isWatched: !movieCard._data.isWatched,
                    },
                ),
            );
        } else {
            this._handleViewAction(
                UserAction.UPDATE_CARD,
                UpdateType.BOARD,
                Object.assign(
                    {},
                    movieCard._data,
                    {
                        isWatched: !movieCard._data.isWatched,
                    },
                ),
            );
        }
    }

    _handleFavoriteClick(movieCard, popUp = null) {
        if (popUp) {
            this._handleViewAction(
                UserAction.UPDATE_POP_UP,
                UpdateType.POPUP,
                Object.assign(
                    {},
                    movieCard._data,
                    {
                        isFavorite: !movieCard._data.isFavorite,
                    },
                ),
            );
        } else {
            this._handleViewAction(
                UserAction.UPDATE_CARD,
                UpdateType.BOARD,
                Object.assign(
                    {},
                    movieCard._data,
                    {
                        isFavorite: !movieCard._data.isFavorite,
                    },
                ),
            );
        }
    }

    _handleLoadShowMoreClick() {
        const filmsCount = this._getFilms().length;
        const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
        const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);

        this._renderFilms(films);
        this._renderedFilmsCount = newRenderedFilmsCount;

        if (this._renderedFilmsCount >= filmsCount) {
            remove(this._showMoreButtonComponent);
        }
    }

    _handleFilmChange(updatedFilm) {
        this._getFilms = updateItem(this.getFilms, updatedFilm);
        this.renderFilm(this._movieCard[updatedFilm.id]);
    }


    _renderShowMore() {

        renderElement(this._mainMovieListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
        this._showMoreButtonComponent.setClickHandler(this._handleLoadShowMoreClick);
    }

    _renderFilms(films) {
        films.forEach((film) => this.renderFilm(film));
    }

    _renderList() {

        const filmsCount = this._getFilms().length;
        const films = this._getFilms().slice(0, Math.min(filmsCount, this._renderedFilmsCount));

        this._renderFilms(films);

        if (filmsCount > FILMS_COUNT_PER_STEP) {
            this._renderShowMore();
        }
    }

    _clearBoard({ resetRenderedFilms = false, resetSortType = false } = {}) {
        const filmsCount = this._getFilms().length;

        /* this._taskNewPresenter.destroy(); */
        Object
            .values(this._movieCard)
            .forEach((film) => remove(film));

        this._movieCard = {};

        /* remove(this._sortComponent);
        remove(this._noTaskComponent);
        remove(this._loadingComponent); */
        remove(this._showMoreButtonComponent);

        if (resetRenderedFilms) {
            this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
        } else {
            // На случай, если перерисовка доски вызвана
            // уменьшением количества задач (например, удаление или перенос в архив)
            // нужно скорректировать число показанных задач
            this._renderedTaskCount = Math.min(filmsCount, this._renderedFilmsCount);
        }

        if (resetSortType) {
            this._currentSortType = SortType.DEFAULT;
        }
    }


}