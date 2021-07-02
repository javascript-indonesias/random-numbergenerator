const createListResultTemplate = async (listResult = []) => {
    const listRandomLiElement = [];
    listResult.forEach((value) => {
        const templateDiv = /* html */ `<div class="number-result-container">${value}</div>`;
        const liElement = document.createElement('li');
        liElement.innerHTML = templateDiv;
        listRandomLiElement.push(liElement);
    });

    const ulRandomElement = document.createElement('ul');
    ulRandomElement.append(...listRandomLiElement);
    return ulRandomElement;
};

export default createListResultTemplate;
