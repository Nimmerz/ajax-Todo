// @flow



// function ajax(url) {
//     fetch(url).then(data => data.json()).then(data => dataGen.next(data))
// }

// function* steps() {
//     console.log('fetching beers');
//     const beers = yield ajax('http://api.react.beer/v2/search?q=hops&type=beer');
//     console.log(beers);

//     console.log('fetching wes');
//     const wes = yield ajax('https://api.github.com/users/');
//     console.log(wes);

//     console.log('fetching fat joe');
//     const fatJoe = yield ajax('https://api.discogs.com/artists/51988');
//     console.log(fatJoe);
// }

// const dataGen = steps();
// dataGen.next(); // kick it off
// Я говорив, повторю ще раз. innerHTML не використовувати в двох останніх 
// роботах (dom та ajax), маніпуляції з dom виконувати виключно через API методи елементів.
//  innerText використовувати можна, без нього вже не обійтися.

let card = document.createElement('div'),
 cardBody = document.createElement('div'),
 cardItem = document.createElement('div'),
 cardInput = document.createElement('input'),
 cardInputDate = document.createElement('input');

window.onload = function() {
    createCard();
    createCardBody();
    createCardItem();
    createNameLabel().innerText = 'Full name';
    createCardInput('Input full name');
    createNameLabel().innerText = 'Birth date';
    createCardInputDate('Select date');
}

// create card method
let createCard = () => {
    card.classList.add('card'); // add class
    card.style.maxWidth = "400px"; // add styles
    card.style.display = "block"; // add styles
    card.style.boxShadow = "2px -2px 9px 1px rgba(0,0,0,0.75)";  // add styles
    card.style.fontFamily = 'Verdana';
    document.body.style.display = "flex"; // add styles
    document.body.style.justifyContent = "center"; // add styles
    document.body.style.alignItems = "center"; // add styles
    document.body.appendChild(card); // append card to body
}

let createCardBody = () => {
    cardBody.classList.add('card-body'); // add class to crdBody
    cardBody.style.padding = "10px 20px"; // add styles
    card.appendChild(cardBody); // append cardBody to card
    return cardBody;
}

let createCardItem = () => {
    cardItem.classList.add('card-item');
    cardBody.appendChild(cardItem);
}

let createCardInput = (placeholder) => {
    cardInput.style.borderTop = 'none';
    cardInput.style.borderLeft = 'none';
    cardInput.style.borderRight = 'none';
    cardInput.style.outline = 'none';
    cardInput.style.marginTop = '10px';
    cardInput.style.display = 'block';
    cardInput.style.borderBottom = '1px solid grey';
    cardInput.placeholder = placeholder;
    cardItem.appendChild(cardInput);
}

let createCardInputDate = (placeholder) => {
    cardInputDate.setAttribute('type', 'date');
    cardInputDate.style.borderTop = 'none';
    cardInputDate.style.borderLeft = 'none';
    cardInputDate.style.borderRight = 'none';
    cardInputDate.style.outline = 'none';
    cardInputDate.style.marginTop = '10px';
    cardInputDate.style.display = 'block';
    cardInputDate.style.borderBottom = '1px solid grey';
    cardInputDate.placeholder = placeholder;    
    cardBody.appendChild(cardInputDate);
}


let createNameLabel = (label) => {
    label = document.createElement('span'); 
    label.classList.add('label-text');
    label.style.fontSize = '12px';
    label.style.display = 'block';
    label.style.marginTop = '12px';
    cardItem.appendChild(label);
    return label;
}