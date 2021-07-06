// ОТКРЫТИЕ И ЗАКРЫТИЕ POP-UP'ов

const popupEdit = document.querySelector('.popup_edit'); // нахожу в документе попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button').addEventListener('click', popupEditFunction); // нахожу в документе кнопку редактирования профиля и добавляю слушатель событий по клику, который при клике запускает функцию открытия/закрытия попап
const closeButtonEdit = document.querySelector('.popup__close-button_edit').addEventListener('click', popupEditFunction); // нахожу в документе кнопку закрытия попапа с редактированием профиля, добавляю к ней слушатель событий по клику, который при клике запускает функцию открытия/закрытия попап

const popupAdd = document.querySelector('.popup_add'); // нахожу в документе попап добавления карточки места
const plusButton = document.querySelector('.profile__add-button').addEventListener('click', popupAddFunction); // нахожу в документе кнопку открытия попапа добавления карточки места, добавляю слушателя событий, который при клике на кнопку запускает функцию открытия/закрытия попап добавления карточки
const closeButtonAdd = document.querySelector('.popup__close-button_add').addEventListener('click', popupAddFunction); // нахожу в документе кнопку закрытия карточки попапа добавления карточки места, добавляю на нее слушателя событий, который при клике запускает функцию открытия/закрытия попап добавления карточки

function popupEditFunction() { // создаю функцию открытия/закрытия попап редактирования профиля

    if (popupEdit.className === 'popup_edit') { // задаю условие, что если попап имеет такой класс
        popupEdit.classList.toggle('popup_opened'); // то он добалвляет себе новый класс
    }
    else {
        popupEdit.classList.toggle('popup_opened'); // а в обратном случае удаяет
    }
};

function popupAddFunction() { // создаю функцию открытия/закрытия попап добавления карточки места
    if (popupAdd.className === 'popup_edit') { // задаю условие, что если попап имеет такой класс
        popupAdd.classList.toggle('popup_opened'); // то он добалвляет себе новый класс
    }
    else {
        popupAdd.classList.toggle('popup_opened'); // а в обратном случае удаяет
    }
};

// ЛАЙКИ

function likeHeart (event) { // создаю функцию события в документе
    if (event.target.className === 'element__like') { // пишу условие функции, что если у "цели" данного события класс равен element__like
        event.target.classList.add('element__like_active'); // то у этой "цели" события добавляется новый класс element__like_active
    }
    else {
        event.target.classList.remove('element__like_active'); // а если класс element__like_active уже есть, то он удаляется 
    }
}


const cardsContainer = document.querySelector('.elements'); // нахожу в документе место, в которое добавляются все карточки

// РЕНДЕР ГОТОВЫХ КАРТОЧЕК

const addedCards = [  // Массив с данными для карточек "из коробки"
    {
      name: 'Воркута',
      link: 'images/vorkuta.jpg'
    },
    {
      name: 'Киров',
      link: 'images/kirov.jpg'
    },
    {
      name: 'Вологда',
      link: 'images/vologda.jpg'
    },
    {
      name: 'Москва',
      link: 'images/moskva.jpg'
    },
    {
      name: 'Батуми',
      link: 'images/batumi.jpg'
    },
    {
      name: 'Карачаевск',
      link: 'images/karachaevsk.jpg'
    }
  ]; 

  addedCards.forEach(item => { 
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__title').textContent = item.name;
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = item.name;

    cardElement.querySelector('.element__image').addEventListener('click', popupImageFunction);
    cardElement.querySelector('.element__image').addEventListener('click', imageRender);
    cardElement.querySelector('.element__like').addEventListener('click', likeHeart);
    cardElement.querySelector('.element__delete').addEventListener('click', deleting);

    cardsContainer.append(cardElement)
});

//  ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК // ОТПРАВКА ФОРМЫ

const formAdd = document.querySelector('.popup__form_add'); // Находим форму в DOM
const title = formAdd.querySelector('.popup__form-field_title');
const image = formAdd.querySelector('.popup__form-field_image');

function formAddSubmitHandler (event) { // Обработчик «отправки» формы
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    function addCard(сardTitle, cardImage) { 
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    
        cardElement.querySelector('.element__title').textContent = сardTitle;
        cardElement.querySelector('.element__image').src = cardImage;
        cardElement.querySelector('.element__image').alt = сardTitle;
    
        cardElement.querySelector('.element__image').addEventListener('click', popupImageFunction);
        cardElement.querySelector('.element__image').addEventListener('click', imageRender);
        cardElement.querySelector('.element__like').addEventListener('click', likeHeart);
        cardElement.querySelector('.element__delete').addEventListener('click', deleting);
    
        popupAddFunction() // функция создания карточки отработала, попап закрывается
        cardsContainer.append(cardElement); // создается новая карточка
           
    };

    addCard(title.value, image.value);
    title.value = '';
    image.value = '';

}

formAdd.addEventListener('submit', formAddSubmitHandler);

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ // ОТПРАВКА ФОРМЫ


const formEdit = document.querySelector('.popup__form_edit'); // Находим форму в DOM

function formEditSubmitHandler (event) { // Обработчик «отправки» формы
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

const profileNameOld = formEdit.querySelector('.popup__form-field_name').value; // value имени в форме
const profileDescriptionOld = formEdit.querySelector('.popup__form-field_job').value; // value описания в форме
const profileNameSaved = document.querySelector('.profile__name'); // Имя записаное по дефолту в разметке html
const profileDescriptionSaved = document.querySelector('.profile__description'); // Описание записаное по дефолту в разметке html

profileNameSaved.textContent = profileNameOld; // контент дефолтного поля Имя теперь равняется value Имени в форме
profileDescriptionSaved.textContent = profileDescriptionOld; // контент дефолтного поля описания теперь равняется value описания в форме

popupEditFunction(); // функция сохранения информации отработала и при этом попап закрылся
}

formEdit.addEventListener('submit', formEditSubmitHandler); //

// ОТКРЫТИЕ ПОПАП С ИЗОБРАЖЕНИЕМ

const popupWithImage = document.querySelector('.popup_img');
const popupImageClose = document.querySelector('.popup__close-button_img').addEventListener('click', popupImageFunction);
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__image-alt');

function imageRender(event) {
    const itemImage = event.target.src;
    popupImage.src = itemImage;
    const itemAlt = event.target.alt;
    popupImageDescription.textContent = itemAlt

}

function popupImageFunction() {
    if (popupWithImage.className === 'popup_edit') {
        popupWithImage.classList.toggle('popup_opened');
    }
    else {
        popupWithImage.classList.toggle('popup_opened');
    }
};

// УДАЛЕНИЕ КАРТОЧЕК

function deleting(event) {
    const bucket = event.target;
    const deletingItem = bucket.parentElement;
    deletingItem.remove();
}
