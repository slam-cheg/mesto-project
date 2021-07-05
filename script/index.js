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

document.onclick = function (event) { // создаю функцию события в документе
    if (event.target.className === 'element__like') { // пишу условие функции, что если у "цели" данного события класс равен element__like
        event.target.classList.add('element__like_active'); // то у этой "цели" события добавляется новый класс element__like_active
    }
    else {
        event.target.classList.remove('element__like_active'); // а если класс element__like_active уже есть, то он удаляется 
    }
}

// ИМЯ ПРОФИЛЯ

const profileSaveButton = document.querySelector('.popup__form-button_edit').addEventListener('click', saveInformation); // нахожу в документе кнопку "сохранить", которая находится в попапе редактирования профиля и добавляю на нее слушатель событий, который при клике на кнопку запустит функцию сохранения информации

function saveInformation() { // создаю функцию сохранения информации
    const profileNameSaved = document.querySelector('.profile__name'); // Имя записаное по дефолту в разметке html
    const profileDescriptionSaved = document.querySelector('.profile__description'); // Описание записаное по дефолту в разметке html
    const profileNameOld = document.querySelector('.popup__form-field_name').value; // value имени в форме
    const profileDescriptionOld = document.querySelector('.popup__form-field_job').value; // value описания в форме

    profileNameSaved.textContent = profileNameOld; // контент дефолтного поля Имя теперь равняется value Имени в форме
    profileDescriptionSaved.textContent = profileDescriptionOld; // контент дефолтного поля описания теперь равняется value описания в форме

    popupEditFunction(); // функция сохранения информации отработала и при этом попап закрылся
}



const cardsContainer = document.querySelector('.elements'); // нахожу в документе место, в которое добавляются все карточки

// РЕНДЕР ГОТОВЫХ КАРТОЧЕК

const initialCards = [  // Массив с данными для карточек "из коробки"
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

initialCards.forEach(item => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__title').textContent = item.name;
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = item.name;

    cardElement.querySelector('.element__image').addEventListener('click', popupImageFunction);
    cardElement.querySelector('.element__image').addEventListener('click', imageRender);

    cardsContainer.append(cardElement)
});

//  ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК

const addButton = document.querySelector('.popup__form-button_add'); // нахожу в документе кнопку "сохранить", которая находится в попапе добавления карточки
addButton.addEventListener('click', function () { 
    const title = document.querySelector('.popup__form-field_title');
    const image = document.querySelector('.popup__form-field_image');

    addCard(title.value, image.value);

    title.value = '';
    image.value = '';
});

function addCard(сardTitle, cardImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__title').textContent = сardTitle;
    cardElement.querySelector('.element__image').src = cardImage;
    cardElement.querySelector('.element__image').alt = сardTitle;

    cardElement.querySelector('.element__image').addEventListener('click', popupImageFunction);
    cardElement.querySelector('.element__image').addEventListener('click', imageRender);

    addButton.addEventListener('submit', clearing); // добавил слушатель события "отправки формы" на кнопку "сохранить" которая запускает функцию очистки формы от введенных значений
    function clearing() {    // создаю функцию очистки
        document.querySelector('.popup__form_add').reset(); // нахожу в документе нужную форму и очищаю ее
    };
    popupAddFunction() // функция создания карточки отработала, попап закрывается
    cardsContainer.append(cardElement); // создается новая карточка
    clearing(); // поля формы очищаются уже после закрытия попапа и создания карточки
};

// ОТКРЫТИЕ ПОПАП С ИЗОБРАЖЕНИЕМ

const popupWithImage = document.querySelector('.popup_img');
const popupImageClose = document.querySelector('.popup__close-button_img').addEventListener('click', popupImageFunction);
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__image-alt');

function imageRender(event) {
    let itemImage = event.target.src;
    popupImage.src = itemImage;
    let itemAlt = event.target.alt;
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
