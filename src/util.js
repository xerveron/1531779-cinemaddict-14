import Abstract from "./view/abstract";


export const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
  };


export const createElement = (template) => {
    const newElement = document.createElement('div'); // 1
    newElement.innerHTML = template; // 2
  
    return newElement.firstChild; // 3
  };

export const renderElement = (container, child, place) => {
    if (container instanceof Abstract) {
      container = container.getElement();
    };

    if (child instanceof Abstract) {
      child = child.getElement();
    };
  
    switch (place) {
      case RenderPosition.AFTERBEGIN:
        container.prepend(child);
        break;
      case RenderPosition.BEFOREEND:
        container.append(child);
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

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};


export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
