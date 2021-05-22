import { createElement } from '../util.js';

const createMoviesList = () => {
      return `<section class="films">
                  <section class="films-list">
                        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                        <div class="films-list__container">
                        </div>
                  </section>
                  <section class="films-list films-list--extra">
                        <h2 class="films-list__title">Top rated</h2>
                        <div class="films-list__container">
                        </div>
                  </section>
                  <section class="films-list films-list--extra">
                        <h2 class="films-list__title">Most commented</h2>
                        <div class="films-list__container">
                        </div>
                  </section>
            </section>`;
}

export default class MoviesList {
      constructor() {
            this._element = null;
      }

      getTemplate() {
            return createMoviesList();
      }

      getElement() {
            if (!this._element) {
                  this._element = createElement(this.getTemplate());
            }
            return this._element;
      }

      removeElement() {
            this._element = null;
      }
}