import Abstract from './abstract.js';

const createMoviesListSection = () => {
      return `<section class="films">
            </section>`;
}

export default class MoviesListSection extends Abstract {
      getTemplate() {
            return createMoviesListSection();
      }
}