import Abstract from './abstract.js';

export default class Smart extends Abstract {

    restoreHandlers() {
            throw new Error (`You should define method restoreHandlers`);
      }

    updateElement() {
        const prevElement = this.getElement();
        const parent = prevElement.parentElement;
        this.removeElement();
    
        const newElement = this.getElement();
    
        parent.replaceChild(newElement, prevElement);
    /* 
        this.restoreHandlers(); */
      }
    
    updateData(update, element = null) {
        if (!update) {
          return;
        }
        if (element) {
            this._data.element = Object.assign(
                {},
                this._data.element,
                update,
            );} else {
            this._data = Object.assign(
                {},
                this._data,
                update,
            )
            }
            
        
        this.updateElement();
      }
}