// ОБЪЯВЛЕНИЕ ВСЕХ ПЕРЕМЕННЫХ

const closeButtons = document.querySelectorAll('.popup__close-button');

// попап редактирования профиля
const popupEdit = document.querySelector('.popup_edit'); // нашел в документе попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button'); // нашел в документе кнопку которая открывает попап редактирования профиля
const closeButtonEdit = document.querySelector('.popup__close-button_edit'); // нашел в документе кнопку которая закрывает попап редактирования профиля
const formEdit = document.querySelector('.popup__form_edit'); // Нахожу форму редактирования профиля
const profileNameSaved = document.querySelector('.profile__name'); // нахожу имя профиля записаное по дефолту в разметке html
const profileDescriptionSaved = document.querySelector('.profile__description'); // нахожу описание профиля записаное по дефолту в разметке html
const profileNameOld = formEdit.querySelector('.popup__form-field_name');  // нашел поле имени в форме редактирования и прировнял его value к тексту имени в html разметке
const profileDescriptionOld = formEdit.querySelector('.popup__form-field_job');  // нашел поле описания в форме редактирования и прировнял его value к тексту описания в html разметке

// попап добавления карточек
const popupAdd = document.querySelector('.popup_add'); // нашел в документе попап добавления карточки
const addButton = document.querySelector('.profile__add-button'); // нашел в документе кнопку которая открывает попап добавления карточки
const closeButtonAdd = document.querySelector('.popup__close-button_add'); // нашел в документе кнопку которая закрывает попап добавления карточки
const formAdd = document.querySelector('.popup__form_add'); // Нахожу форму добавления карточки
const title = formAdd.querySelector('.popup__form-field_title'); // Нахожу в форме поле названия карточки
const image = formAdd.querySelector('.popup__form-field_image'); // Нахожу в форме поле ссылки на картинку

// попап открытия больших изображений
const popupGallery = document.querySelector('.popup_img'); // нашел в документе попап открытия большого изображения
const popupImageClose = document.querySelector('.popup__close-button_img'); // нашел в документе внопку которая закрывает попап с большой картинкой
const popupImage = document.querySelector('.popup__image'); // нашел в документе тег отвечающий за само изображение в попапе 
const popupImageDescription = document.querySelector('.popup__image-alt'); // нашел в документе поле в котором должен отображаться Alt открывшегося изображения

// попап подтверждения удаления карточки 
const popupConfirm = document.querySelector('.popup_confirm'); // нашел попап подтвержения удаления
const confirmButton = popupConfirm.querySelector('.popup__confirm-button'); // кнопка подтверждения удаления
const closeButtonConfirm = popupConfirm.querySelector('.popup__close-button_confirm'); // кнопка закрытия попапа удаления
let deletingItem; // сюда будут записываться удаляемые карточки при открытии попапа подтверждения

// переменные для рендера карточек "из коробки" и новых
const cardsContainer = document.querySelector('.elements'); // нахожу в документе место, в которое добавляются все карточки
const cardTemplate = document.querySelector('#card-template').content; // нахожу в документе шаблонную разметку для карточек

// попап редактирования аватара
const avatarOld = document.querySelector('.profile__avatar'); // аватар который изначально в документе
const avatarCover = document.querySelector('.profile__avatar-cover');
const popupAvatar = document.querySelector('.popup_avatar-edit'); // нашел попап редактирования аватара
const formAvatar = popupAvatar.querySelector('.popup__form_avatar-edit'); // нашел форму редактирования аватара
const avatarInput = formAvatar.querySelector('.popup__form-field_avatar-edit'); // нашел поле в форме отвечающее за ссылку на новый аватар
const avatarSubmit = formAvatar.querySelector('.popup__form-button_avatar-edit'); // сабмит кнопка в форме редактирования аватара
const closeButtonAvatar = popupAvatar.querySelector('.popup__close-button_avatar-edit');



// ВСЕ СЛУШАТЕЛИ СОБЫТИЙ

addButton.addEventListener('click', () => openPopup(popupAdd)); // на кнопку "плюс" добавил слушатель событий который при клике запускает функцию с параметром currentPopup
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd)) // на кнопку закрытия попапа редактирования добавил слушатель событий который запускает функцию закрытия попап
editButton.addEventListener('click', () => reWrite()); // на кнопку "карандашик" добавил слушатель событий который при клике запускает функцию открытия попап с предварительной подгрузкой значений в поля
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit)); // на кнопку закрытия попапа редактирования добавил слушатель событий который запускает функцию закрытия попап
popupImageClose.addEventListener('click', () => closePopup(popupGallery)); // на кнопку закрытия попапа редактирования добавил слушатель событий который запускает функцию закрытия попап
formAdd.addEventListener('submit', handlerAddFormSubmit); // Для формы добавления карточек добавил слушателя событий запускает функцию отправки формы при клике на кнопку сохранить
formEdit.addEventListener('submit', handlerEditFormSubmit); // Для формы редактирования добавил слушателя событий запускает функцию отправки формы при клике на кнопку сохранить
confirmButton.addEventListener('click', deleting)
closeButtonConfirm.addEventListener('click', () => closePopup(popupConfirm)); // закроется только попап продтверждения
avatarCover.addEventListener('click', () => openPopup(popupAvatar));
closeButtonAvatar.addEventListener('click', () => closePopup(popupAvatar));
formAvatar.addEventListener('submit', handlerAvatarFormSubmit);

// ФУНКЦИЯ ЗАМЕНЫ АВАТАРА

function handlerAvatarFormSubmit(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const newAvatar = avatarInput.value; // приравниваю записанное значение поля залоговка к параметру фунции создания карточки
    avatarOld.src = newAvatar;

    closePopup(popupAvatar); // форма была отправлена, попап закрывается
}

// ФУНКЦИЯ ПОДГРУЖАЕТ ЗНАЧЕНИЯ ИМЕНИ И ОПИСАНИЯ ПРОФИЛЯ В POP-UP

function reWrite() {
    profileNameOld.value = profileNameSaved.textContent;
    profileDescriptionOld.value = profileDescriptionSaved.textContent;
    openPopup(popupEdit);
}

// ФУНКЦИИ ОТКРЫТИЯ И ЗАКРЫТИЯ POP-UP'ов

function openPopup(currentPopup) { // функция открытия попапов
    currentPopup.classList.toggle('popup_opened'); // переключение класса у текущего попап
};
function closePopup(currentPopup) { // функция закрытия попапов
    currentPopup.classList.toggle('popup_opened'); // переключение класса у текущего попап
};


// ЛАЙКИ

function addLike(event) { // создаю функцию события в документе
    event.target.classList.toggle('element__like_active');  // у "цели" события переключается класс
}

// РЕНДЕР ГОТОВЫХ КАРТОЧЕК

import {addedCards} from './array.js'; // Массив с карточками вынесен в отдельный Модуль

addedCards.reverse().forEach(item => { // перебор массива в обратном порядке, чтобы карточки создавались в том порядке в котором записаны в массив
    const cardTitle = item.name; // приравниваю поле имени в массиве к названию карточки и alt изображения
    const cardImage = item.link; // приравниваю ссылку на изображение к изображению в карточке
    createCard(cardTitle, cardImage); // запускаю функцию создания карточки для каждого "прохода" по массиву, пока он не закончится
    addCard(cardTitle, cardImage);
});

// СОЗДАНИЕ КАРТОЧЕК

function createCard(сardTitle, cardImage) { // функция создания карточек с 2 параметрами
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true); //нахожу в шаблоне нужную разметку и копирую ее

    cardElement.querySelector('.element__title').textContent = сardTitle; // записываю параметр заголовка в соответствующий тег разметки html
    cardElement.querySelector('.element__image').src = cardImage; // записываю параметр изображения в соответствующий тег разметки html
    cardElement.querySelector('.element__image').alt = сardTitle; // записываю параметр заголовка в alt изображения 

    //для каждой добавляемой карточки добавляю слушетелей событий
    cardElement.querySelector('.element__image').addEventListener('click', () => openPopup(popupGallery)); // запускает открытие попапа с большим изображением по клику на картинку
    cardElement.querySelector('.element__image').addEventListener('click', renderingImage); // запускает функцию приравнивания картинки в карточке к картинке в попапе с большим изображением
    cardElement.querySelector('.element__like').addEventListener('click', addLike); // ставит и убирает лайки
    cardElement.querySelector('.element__delete').addEventListener('click', confirming); // удаляет карточку из html разметки

    return cardElement;
};

// ДОБАВЛЕНИЕ СОЗДАННЫХ КАРТОЧЕК В РАЗМЕТКУ

function addCard(cardTitle, cardImage) { // функция создания карточек
    const card = createCard(cardTitle, cardImage);
    cardsContainer.prepend(card); // создаю карточку с записанными данными в параметр cardElement
}


//  ОТПРАВКА ФОРМЫ

function handlerAddFormSubmit(event) { // Обработчик «отправки» формы
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const cardTitle = title.value; // приравниваю записанное значение поля залоговка к параметру фунции создания карточки
    const cardImage = image.value; // приравниваю записанное значение поля ссылки к параметру функции создания карточки

    addCard(cardTitle, cardImage); // запускается функция создания карточки и добавления в DOM
    closePopup(popupAdd); // форма была отправлена, попап закрывается
    event.target.reset(); // поля формы очищаются после закрытия попап
}


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ // ОТПРАВКА ФОРМЫ

function handlerEditFormSubmit(event) { // Обработчик «отправки» формы
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileNameSaved.textContent = profileNameOld.value; // контент дефолтного поля Имя теперь равняется value Имени в форме
    profileDescriptionSaved.textContent = profileDescriptionOld.value; // контент дефолтного поля описания теперь равняется value описания в форме

    closePopup(popupEdit); // функция сохранения информации отработала и при этом попап закрылся, очистки формы не происходит, т.к. в данном случае нет
}



// ОТКРЫТИЕ ПОПАП С ИЗОБРАЖЕНИЕМ

function renderingImage(event) { // Функция события открывающаяся по клику на изображения в карточках
    const itemImage = event.target; // "цель" данного события записываю в переменную
    popupImage.src = itemImage.src; // приравниваю значения SRC у картинки в карточке и у открывшейся картинки.
    const itemAlt = event.target.alt; // значение alt тега у "цели" события записываю в переменную
    popupImageDescription.textContent = itemAlt; // значение подписи под фотографией теперь то же что и alt изображения который в свою очередь всегда равен названию карточки
    popupImage.alt = itemAlt; // значение alt у открывшейся картинки подставляется из значения alt той картинки на которую кликнули
}



// УДАЛЕНИЕ КАРТОЧЕК

function confirming(event) {
    const bucket = event.target; // записываю "цель" события в переменную
    deletingItem = bucket.closest('.element'); // записываю ближайший родительский Div в переменную

    openPopup(popupConfirm);
}

function deleting() {
    deletingItem.remove(); // удаляю карточку
    closePopup(popupConfirm);
}