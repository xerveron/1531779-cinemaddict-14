export const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
  };

export const createElement = (template) => {
    const newElement = document.createElement('div'); // 1
    newElement.innerHTML = template; // 2
  
    return newElement.firstChild; // 3
  };

export const renderElement = (container, element, place) => {
    switch (place) {
      case RenderPosition.AFTERBEGIN:
        container.prepend(element);
        break;
      case RenderPosition.BEFOREEND:
        container.append(element);
        break;
    }
  };

export const createHTMLElement = (element, elementClass, innerText) => {
    return `<` + element + ` class=` + elementClass + `>` + innerText + `
    </`+ element + `>`;
}

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

