// Импорты
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./index.css";
import { getInitialCards, getUsers, getMyProfile, updateMyProfile, getMyAvatar, sendCards, deleteCards, sendLike, deleteLike, config } from "../components/api.js";
import { setEventListeners, checkInputValidity, showInputError, hideInputError, enableValidation, hasInvalidInput, toggleButtonState, settings } from "../components/validate.js"; // валидация форм
import { openPopup, closePopup, closeByEscape, handleOverlayClick } from "../components/modal.js";
import { addLike, renderLoading } from "../components/utils.js";
import "../images/icon.ico";

enableValidation(settings);

// ОБЪЯВЛЕНИЕ ВСЕХ ПЕРЕМЕННЫХ

let currentUserId;
const modals = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".elements"); // нахожу в документе место, в которое добавляются все карточки
const cardTemplate = document.querySelector("#card-template").content; // нахожу в документе шаблонную разметку для карточек

// попап редактирования профиля
const popupEdit = document.querySelector(".popup_edit"); // нашел в документе попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button"); // нашел в документе кнопку которая открывает попап редактирования профиля
const closeButtonEdit = document.querySelector(".popup__close-button_edit"); // нашел в документе кнопку которая закрывает попап редактирования профиля
const formEdit = document.querySelector(".popup__form_edit"); // Нахожу форму редактирования профиля
const profileNameSaved = document.querySelector(".profile__name"); // нахожу имя профиля записаное по дефолту в разметке html
const profileDescriptionSaved = document.querySelector(".profile__description"); // нахожу описание профиля записаное по дефолту в разметке html
const profileNameOld = formEdit.querySelector(".popup__form-input_name"); // нашел поле имени в форме редактирования и прировнял его value к тексту имени в html разметке
const profileDescriptionOld = formEdit.querySelector(".popup__form-input_job"); // нашел поле описания в форме редактирования и прировнял его value к тексту описания в html разметке
const popupEditButton = document.querySelector(".popup__form-button_edit");

// попап добавления карточек
const popupAdd = document.querySelector(".popup_add"); // нашел в документе попап добавления карточки
const addButton = document.querySelector(".profile__add-button"); // нашел в документе кнопку которая открывает попап добавления карточки
const closeButtonAdd = document.querySelector(".popup__close-button_add"); // нашел в документе кнопку которая закрывает попап добавления карточки
const formAdd = document.querySelector(".popup__form_add"); // Нахожу форму добавления карточки
const title = formAdd.querySelector(".popup__form-input_title"); // Нахожу в форме поле названия карточки
const image = formAdd.querySelector(".popup__form-input_image"); // Нахожу в форме поле ссылки на картинку
const popupFormButton = formAdd.querySelector(".popup__form-button_add"); //

// попап открытия больших изображений
const popupGallery = document.querySelector(".popup_img"); // нашел в документе попап открытия большого изображения
const popupImageClose = document.querySelector(".popup__close-button_img"); // нашел в документе внопку которая закрывает попап с большой картинкой
const popupImage = document.querySelector(".popup__image"); // нашел в документе тег отвечающий за само изображение в попапе
const popupImageDescription = document.querySelector(".popup__image-alt"); // нашел в документе поле в котором должен отображаться Alt открывшегося изображения

// попап подтверждения удаления карточки
const popupConfirm = document.querySelector(".popup_confirm");
const confirmButton = popupConfirm.querySelector(".popup__confirm-button");
const closeButtonConfirm = popupConfirm.querySelector(".popup__close-button_confirm");
let deletingItem;

// попап редактирования аватара
const avatarOld = document.querySelector(".profile__avatar");
const avatarCover = document.querySelector(".profile__avatar-cover");
const popupAvatar = document.querySelector(".popup_avatar-edit");
const formAvatar = popupAvatar.querySelector(".popup__form_avatar-edit");
const avatarInput = formAvatar.querySelector(".popup__form-input_avatar-edit");
const closeButtonAvatar = popupAvatar.querySelector(".popup__close-button_avatar-edit");
const avatarEditButton = formAvatar.querySelector(".popup__form-button_avatar-edit");

// ВСЕ СЛУШАТЕЛИ СОБЫТИЙ

addButton.addEventListener("click", () => openPopup(popupAdd));
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
editButton.addEventListener("click", () => openPopup(popupEdit));
closeButtonEdit.addEventListener("click", () => closePopup(popupEdit));
popupImageClose.addEventListener("click", () => closePopup(popupGallery));
formAdd.addEventListener("submit", handlerAddFormSubmit);
formEdit.addEventListener("submit", handlerEditFormSubmit);
confirmButton.addEventListener("click", deleting);
closeButtonConfirm.addEventListener("click", () => closePopup(popupConfirm));
avatarCover.addEventListener("click", () => openPopup(popupAvatar));
closeButtonAvatar.addEventListener("click", () => closePopup(popupAvatar));
formAvatar.addEventListener("submit", handlerAvatarFormSubmit);
modals.forEach((popup) => {
    popup.addEventListener("click", handleOverlayClick);
});

Promise.all([getInitialCards(config), getMyProfile(config)])
    .then(([cards, userdata]) => {
        currentUserId = userdata._id;
        avatarOld.src = userdata.avatar;
        profileNameSaved.textContent = userdata.name;
        profileDescriptionSaved.textContent = userdata.about;
        profileNameOld.value = userdata.name;
        profileDescriptionOld.value = userdata.about;
        renderCards(cards);
    })
    .catch((err) => {
        console.log(err);
    });

const renderCards = (arr) => {
    arr.reverse().forEach((item) => {
        const cardTitle = item.name;
        const cardImage = item.link;
        const initialLikes = item.likes;
        const cardOwner = item.owner._id;
        const cardId = item._id;
        addCard(cardTitle, cardImage, initialLikes, cardOwner, cardId);
    });
};

const createCard = (сardTitle, cardImage, initialLikes, cardOwner, cardId) => {
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    const initialLikeHeart = cardElement.querySelector(".element__like");
    let likeCount = (cardElement.querySelector(".element__like-count").textContent = initialLikes.length);
    let initialCardId = cardId;
    const bucket = cardElement.querySelector(".element__delete");
    cardElement.owner = cardOwner;
    cardElement.id = initialCardId;
    cardElement.querySelector(".element__title").textContent = сardTitle; // записываю параметр заголовка в соответствующий тег разметки html
    cardElement.querySelector(".element__image").src = cardImage; // записываю параметр изображения в соответствующий тег разметки html
    cardElement.querySelector(".element__image").alt = сardTitle; // записываю параметр заголовка в alt изображения
    if (cardOwner !== currentUserId) {
        bucket.classList.add("element__delete_deactive");
    }
    if (initialLikes) {
        initialLikes.forEach((user) => {
            if (user._id === currentUserId) {
                initialLikeHeart.classList.add("element__like_active");
            }
        });
    } else {
        likeCount.textContent = 0;
    }

    cardElement.querySelector(".element__like").addEventListener("click", addLike);
    cardElement.querySelector(".element__image").addEventListener("click", renderingImage); // запускает функцию приравнивания картинки в карточке к картинке в попапе с большим изображением
    cardElement.querySelector(".element__delete").addEventListener("click", confirming); // удаляет карточку из html разметки

    return cardElement;
};

const addCard = (cardTitle, cardImage, initialLikes, cardOwner, cardId) => {
    const card = createCard(cardTitle, cardImage, initialLikes, cardOwner, cardId);
    cardsContainer.prepend(card);
};

//  ОТПРАВКА ФОРМЫ // ЗАМЕНА АВАТАРА

function handlerAvatarFormSubmit(event) {
    event.preventDefault();

    const newAvatar = avatarInput.value;
    avatarOld.src = newAvatar;
    renderLoading(true, avatarEditButton);
    getMyAvatar(newAvatar)
        .then(() => {
            closePopup(popupAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, avatarEditButton);
            avatarInput.value = "";
        });
}

//  ОТПРАВКА ФОРМЫ // ДОБАВЛЕНИЕ КАРТОЧКИ

function handlerAddFormSubmit(event) {
    event.preventDefault();
    renderLoading(true, popupFormButton);
    const cardTitle = title.value;
    const cardImage = image.value;
    sendCards(cardTitle, cardImage, currentUserId, config)
        .then((res) => {
            addCard(cardTitle, cardImage, 0, currentUserId, res._id);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, popupFormButton);
        });
}

//  ОТПРАВКА ФОРМЫ // РЕДАКТИРОВАНИЕ ПРОФИЛЯ

function handlerEditFormSubmit() {
    renderLoading(true, popupEditButton);
    updateMyProfile(profileNameOld.value, profileDescriptionOld.value)
        .then((res) => {
            profileNameSaved.textContent = res.name;
            profileDescriptionSaved.textContent = res.about;
        })
        .then(() => {
            closePopup(popupEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, popupEditButton);
        });
}

// ОТКРЫТИЕ ПОПАП С ИЗОБРАЖЕНИЕМ

function renderingImage(event) {
    // Функция события открывающаяся по клику на изображения в карточках
    const itemImage = event.target; // "цель" данного события записываю в переменную
    popupImage.src = itemImage.src; // приравниваю значения SRC у картинки в карточке и у открывшейся картинки.
    const itemAlt = event.target.alt; // значение alt тега у "цели" события записываю в переменную
    popupImageDescription.textContent = itemAlt; // значение подписи под фотографией теперь то же что и alt изображения который в свою очередь всегда равен названию карточки
    popupImage.alt = itemAlt; // значение alt у открывшейся картинки подставляется из значения alt той картинки на которую кликнули
    openPopup(popupGallery);
}

// ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ

function confirming(event) {
    const bucket = event.target; // записываю "цель" события в переменную
    deletingItem = bucket.closest(".element"); // записываю ближайший родительский Div в переменную
    openPopup(popupConfirm); // после этого открывается попап подтверждения удаления
}

// УДАЛЕНИЕ КАРТОЧЕК

function deleting() {
    const deletingItemId = deletingItem.id;
    renderLoading(true, confirmButton);
    deleteCards(deletingItemId, config)
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            deletingItem.remove();
        })
        .then(() => {
            closePopup(popupConfirm);
        })
        .finally(() => {
            renderLoading(false, confirmButton);
        });
}
