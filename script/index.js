// ОТКРЫТИЕ И ЗАКРЫТИЕ POP-UP

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button').addEventListener("click", popupOpening);
const closeButton = document.querySelector('.popup__close-button').addEventListener("click", popupOpening);

function popupOpening() {
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    }
    else {
        popup.style.display = 'flex';
    }
};

// ЛАЙКИ

document.onclick = function (event) {
    if (event.target.className === 'element__like') {
        event.target.classList.add('element__like_active');
    }
    else {
        event.target.classList.remove('element__like_active');
    }
}

// TESTS

const greetingMessageCreator = (name) => {
    const greetingMessage = `Hello! ${name}`;
    greeting(greetingMessage);
}

const greeting = (phrase) => {
    alert(phrase);
} 

// greetingMessageCreator('JOPA'); 






// ИМЯ ПРОФИЛЯ
const profileSaveButton = document.querySelector('.popup__form-button').addEventListener("click", saveInformation);

function saveInformation() {
    const profileNameSaved = document.querySelector('.profile__name'); // Имя записаное
    const profileDescriptionSaved = document.querySelector('.profile__description'); // Описание записаное
    let profileNameOld = document.querySelector('.popup__form-field_name').value; // Имя в форме
    let profileDescriptionOld = document.querySelector('.popup__form-field_job').value; // Описание в форме; 
    

    profileNameSaved.textContent = profileNameOld;
    profileDescriptionSaved.textContent = profileDescriptionOld;

    popup.style.display = 'none';
}

//  ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК

/*
function addCard(imageValue, imageTitle, titleValue,) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('element');

    cardContainer.insertAdjacentHTML('beforeend', `
    <div class="element">
        <img class="element__image" src="${imageValue}" alt="${imageTitle}">
        <div class="element__information">
            <h2 class="element__title">${titleValue}</h2>
            <button class="element__like" type="button" aria-label="Лайк" id="like"></button>
        </div>
    </div>
  `);
} */
 
// РЕНДЕР ДОБАВЛЕННЫХ КАРТОЧЕК

/*
function addSong(artistValue, titleValue) {
    const trackContainer = document.createElement('div');
    trackContainer.classList.add('song');
  
    const artistElement = document.createElement('h4');
    artistElement.classList.add('song__artist');
    artistElement.textContent = artistValue;
  
    const titleElement = document.createElement('h4');
    titleElement.classList.add('song__title');
    titleElement.textContent = titleElementtValue;
  
    const likeButtonElement = document.createElement('button');
    likeButtonElement.classList.add('song__like');
    likeButtonElement.textContent = likeButtonElement;
  
    songsContainer.insertAdjacentHTML('beforeend', `
      <div class="song">
        <h4 class="song__artist">${artistValue}</h4>
        <p class="song__title">${titleValue}</p>
        <button class="song__like"></button>
      </div>
    `);
    
    trackContainer.append(artistElement, titleElement, likeButtonElement);
  }
  */