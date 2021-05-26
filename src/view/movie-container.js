import Abstract from './abstract.js';

const createMoviesListContainer = () => {
      return `<div class="films-list__container">
      </div>`;
}

export default class MoviesListContainer extends Abstract {
      getTemplate() {
            return createMoviesListContainer();
      }
}