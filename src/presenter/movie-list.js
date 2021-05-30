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
import { UserAction, UpdateType } from '../const.js';
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
        // Здесь будем вызывать обновление модели.
        // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
        // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
        // update - обновленные данные
        switch (actionType) {
            case UserAction.UPDATE_FILM:
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
        // В зависимости от типа изменений решаем, что делать:
        // - обновить часть списка (например, когда поменялось описание)
        // - обновить список (например, когда задача ушла в архив)
        // - обновить всю доску (например, при переключении фильтра)
        
        switch (updateType) {
            case UpdateType.PATCH:
              // - обновить часть списка (например, когда поменялось описание)
              remove(this._movieCard[film.id]);/* 
              this.renderFilm(film); */
              break;
            case UpdateType.MINOR:
              // - обновить список (например, когда задача ушла в архив)
              /* console.log(this);
              console.log(film);
              console.log (this._getFilms()) *//* 
              remove(this._movieCard[film.id]); */
              console.log(film);
              console.log(this);
              console.log(this._movieCard[film.id]);
            /* this._movieCard[film.id].updateElement(); */
            this.renderFilm(this._movieCard[film.id])
              break;
            case UpdateType.MAJOR:
              // - обновить всю доску (например, при переключении фильтра)
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
        const moviePopUp = new PopUpView(film, comments);
        this._siteBody.appendChild(moviePopUp.getElement());
        this._siteBody.classList.add('hide-overflow');
    }



    _handleWatchListClick(movieCard) {
        this._handleViewAction (
            UserAction.UPDATE_FILM, 
            UpdateType.MINOR,
            Object.assign(
                {},
                movieCard._data,
                {
                    isWatchList : !movieCard._data.isWatchList,
                },
            ),
        );
        /* movieCard._changeData(
            UserAction.UPDATE_FILM,
            UpdateType.MINOR,
            Object.assign(
                {},
                this._task,
                {
                    isWatchList : !this._data.filmUserInfo.isWatchList,
                },
            ),
        );  */
    }

    _handleWatchedClick(movieCard) {
        this._handleViewAction (
            UserAction.UPDATE_FILM, 
            UpdateType.MINOR,
            Object.assign(
                {},
                movieCard._data,
                {
                    isWatched : !movieCard._data.isWatched,
                },
            ),
        );
        /* this._changeData(
            UserAction.UPDATE_FILM,
            UpdateType.MINOR,
            Object.assign(
                {},
                this._task,
                {
                    isFavorite: !this._task.isFavorite,
                },
            ),
        ); */
    }

    _handleFavoriteClick(movieCard) {
        this._handleViewAction (
            UserAction.UPDATE_FILM, 
            UpdateType.MINOR,
            Object.assign(
                {},
                movieCard._data,
                {
                    isFavorite : !movieCard._data.isFavorite,
                },
            ),
        );
       /*  this._changeData(
            UserAction.UPDATE_FILM,
            UpdateType.MINOR,
            Object.assign(
                {},
                this._task,
                {
                    isFavorite: !this._task.isFavorite,
                },
            ),
        ); */
    }

    _handleLoadShowMoreClick() {
        const filmsCount = this._getFilms().length;
        const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
        const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);

        this._renderFilms(films);
        this._renderedFilmsCount = newRenderedFilmsCount;
        if (this._renderedTaskCount >= filmsCount) {
            remove(this._loadMoreButtonComponent);
        }
    }
    
    _handleFilmChange(updatedFilm) {
        this._getFilms = updateItem(this.getFilms, updatedFilm);
        this.renderFilm (this._movieCard[updatedFilm.id]);
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
        const films = this._getFilms().slice(0, Math.min(filmsCount, FILMS_COUNT_PER_STEP));

        this._renderFilms(films);

        if (filmsCount > FILMS_COUNT_PER_STEP) {
            this._renderShowMore();
        }
    }


}