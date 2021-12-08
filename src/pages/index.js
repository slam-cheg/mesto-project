// Импорты
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./index.css";
import { contentType, token, mainUrl, getInitialCards, getMyProfile, getMyAvatar, sendCards, deleteCards, sendLike, deleteLike, checkResponse, updateMyProfile } from "../components/api.js";
import { setEventListeners, checkInputValidity, showInputError, hideInputError, enableValidation, hasInvalidInput, toggleButtonState, settings } from "../components/validate.js"; // валидация форм
import { openPopup, closePopup, closeByEscape, handleOverlayClick } from "../components/modal.js";
import { renderLoading, reWrite } from "../components/utils.js";
import { renderCards, addCard, createCard } from "../components/card";
import "../images/icon.ico";

enableValidation(settings);

// ОБЪЯВЛЕНИЕ ВСЕХ ПЕРЕМЕННЫХ

export let currentUserId;
const modals = document.querySelectorAll(".popup");

// попап редактирования профиля
export const popupEdit = document.querySelector(".popup_edit"); // нашел в документе попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button"); // нашел в документе кнопку которая открывает попап редактирования профиля
const closeButtonEdit = document.querySelector(".popup__close-button_edit"); // нашел в документе кнопку которая закрывает попап редактирования профиля
const formEdit = document.querySelector(".popup__form_edit"); // Нахожу форму редактирования профиля
export const profileNameSaved = document.querySelector(".profile__name"); // нахожу имя профиля записаное по дефолту в разметке html
export const profileDescriptionSaved = document.querySelector(".profile__description"); // нахожу описание профиля записаное по дефолту в разметке html
export const profileNameOld = formEdit.querySelector(".popup__form-input_name"); // нашел поле имени в форме редактирования и прировнял его value к тексту имени в html разметке
export const profileDescriptionOld = formEdit.querySelector(".popup__form-input_job"); // нашел поле описания в форме редактирования и прировнял его value к тексту описания в html разметке
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
editButton.addEventListener("click", () => reWrite());
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

Promise.all([getInitialCards(), getMyProfile()])
    .then(([cards, userdata]) => {
        currentUserId = userdata._id;
        avatarOld.src = userdata.avatar;
        profileNameSaved.textContent = userdata.name;
        profileDescriptionSaved.textContent = userdata.about;
        renderCards(cards);
    })
    .catch((err) => {
        console.log(err);
    });

//  ОТПРАВКА ФОРМЫ // ЗАМЕНА АВАТАРА

function handlerAvatarFormSubmit(event) {
    event.preventDefault();

    renderLoading(true, avatarEditButton);
    getMyAvatar(avatarInput.value)
        .then(() => {
            avatarOld.src = avatarInput.value;
            closePopup(popupAvatar);
            avatarInput.value = "";
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, avatarEditButton);
        });
}

//  ОТПРАВКА ФОРМЫ // ДОБАВЛЕНИЕ КАРТОЧКИ

function handlerAddFormSubmit(event) {
    event.preventDefault();
    renderLoading(true, popupFormButton);
    const cardTitle = title.value;
    const cardImage = image.value;
    sendCards(cardTitle, cardImage, currentUserId)
        .then((res) => {
            addCard(cardTitle, cardImage, 0, currentUserId, res._id);
            closePopup(popupAdd);
            event.target.reset();
            popupFormButton.classList.add("popup__form-button_disabled");
            popupFormButton.setAttribute("disabled", true);
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
        .then(() => {
            profileNameSaved.textContent = profileNameOld.value;
            profileDescriptionSaved.textContent = profileDescriptionOld.value;
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

export function renderingImage(event) {
    const itemImage = event.target;
    popupImage.src = itemImage.src;
    const itemAlt = event.target.alt;
    popupImageDescription.textContent = itemAlt;
    popupImage.alt = itemAlt;
    openPopup(popupGallery);
}

// ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ

export function confirming(event) {
    const bucket = event.target; // записываю "цель" события в переменную
    deletingItem = bucket.closest(".element"); // записываю ближайший родительский Div в переменную

    openPopup(popupConfirm); // после этого открывается попап подтверждения удаления
}

// УДАЛЕНИЕ КАРТОЧЕК

function deleting() {
    const deletingItemId = deletingItem.id;
    renderLoading(true, confirmButton);
    deleteCards(deletingItemId)
        .then(() => {
            deletingItem.remove();
            closePopup(popupConfirm);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, confirmButton);
        });

    // попап подтверждения отработал и закрывается
}
