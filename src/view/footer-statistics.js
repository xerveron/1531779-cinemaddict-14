import Abstract from './abstract.js';

const createFooterStatistics = (filmsArray) => {
    return `<p>${filmsArray.length} movies inside</p>`;
}


export default class FooterStatistics extends Abstract {
    constructor (films) {
      super();
      this._films = films;
    }
  
    getTemplate() {
      return createFooterStatistics(this._films);
    }
  }
