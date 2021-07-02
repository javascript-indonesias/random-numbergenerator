function showElement(element) {
    element.classList.remove('hide-element');
}

function hideElement(element) {
    element.classList.add('hide-element');
}

export { showElement, hideElement };
