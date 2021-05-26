import Abstract from './abstract.js';

const createMoviesList = (h2Hidden,h2Text,extra) => {
      return `<section class="films-list ${extra ? `films-list--extra` : ``}">
                  <h2 class="films-list__title ${h2Hidden ? `visually-hidden` : ``}">${h2Text}</h2>
              </section>`;
}

export default class MoviesList extends Abstract {
      constructor (h2Hidden,h2Text,extra) {
            super();
            this._h2Hidden = h2Hidden;
            this._h2Text = h2Text;
            this._extra = extra;
          }
      getTemplate() {
            return createMoviesList(this._h2Hidden,this._h2Text,this._extra);
      }
}