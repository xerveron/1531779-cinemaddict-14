export const createElement = (element, elementClass, innerText) => {
    return `<` + element + ` class=` + elementClass + `>` + innerText + `
    </`+ element + `>`;
}
