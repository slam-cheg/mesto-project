// Импорты
import "./index.css";
import { getInitialCards, getUsers, getMyId, getMyProfile, getMyAvatar, sendCards, deleteCards, sendLike, deleteLike } from "../components/api.js";
import { setEventListeners, checkInputValidity, showInputError, hideInputError, enableValidation, hasInvalidInput, toggleButtonState, settings } from "../components/validate.js"; // валидация форм
import { openPopup, closePopup, closeByEscape, handleOverlayClick } from "../components/modal.js";
import "../images/icon.ico";
import { data } from "autoprefixer";

//Запуск всех функций

updateServerCards();
getCurrentUser();
updateProfile();
enableValidation(settings);

// ОБЪЯВЛЕНИЕ ВСЕХ ПЕРЕМЕННЫХ

export let currentUserId;
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
const popupConfirm = document.querySelector(".popup_confirm"); // нашел попап подтвержения удаления
const confirmButton = popupConfirm.querySelector(".popup__confirm-button"); // кнопка подтверждения удаления
const closeButtonConfirm = popupConfirm.querySelector(".popup__close-button_confirm"); // кнопка закрытия попапа удаления
let deletingItem; // сюда будут записываться удаляемые карточки при открытии попапа подтверждения

// попап редактирования аватара
const avatarOld = document.querySelector(".profile__avatar"); // аватар который изначально в документе
const avatarCover = document.querySelector(".profile__avatar-cover");
const popupAvatar = document.querySelector(".popup_avatar-edit"); // нашел попап редактирования аватара
const formAvatar = popupAvatar.querySelector(".popup__form_avatar-edit"); // нашел форму редактирования аватара
const avatarInput = formAvatar.querySelector(".popup__form-input_avatar-edit"); // нашел поле в форме отвечающее за ссылку на новый аватар
const closeButtonAvatar = popupAvatar.querySelector(".popup__close-button_avatar-edit");
const avatarEditButton = formAvatar.querySelector(".popup__form-button_avatar-edit");

// ВСЕ СЛУШАТЕЛИ СОБЫТИЙ

addButton.addEventListener("click", () => openPopup(popupAdd)); // на кнопку "плюс" добавил слушатель событий который при клике запускает функцию с параметром currentPopup
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd)); // на кнопку закрытия попапа редактирования добавил слушатель событий который запускает функцию закрытия попап
editButton.addEventListener("click", () => reWrite()); // на кнопку "карандашик" добавил слушатель событий который при клике запускает функцию открытия попап с предварительной подгрузкой значений в поля
closeButtonEdit.addEventListener("click", () => closePopup(popupEdit)); // на кнопку закрытия попапа редактирования добавил слушатель событий который запускает функцию закрытия попап
popupImageClose.addEventListener("click", () => closePopup(popupGallery)); // на кнопку закрытия попапа редактирования добавил слушатель событий который запускает функцию закрытия попап
formAdd.addEventListener("submit", handlerAddFormSubmit); // Для формы добавления карточек добавил слушателя событий запускает функцию отправки формы при клике на кнопку сохранить
formEdit.addEventListener("submit", handlerEditFormSubmit); // Для формы редактирования добавил слушателя событий запускает функцию отправки формы при клике на кнопку сохранить
confirmButton.addEventListener("click", deleting);
closeButtonConfirm.addEventListener("click", () => closePopup(popupConfirm)); // закроется только попап продтверждения
avatarCover.addEventListener("click", () => openPopup(popupAvatar));
closeButtonAvatar.addEventListener("click", () => closePopup(popupAvatar));
formAvatar.addEventListener("submit", handlerAvatarFormSubmit);
modals.forEach((popup) => {
    popup.addEventListener("click", handleOverlayClick);
});

// ФУНКЦИЯ ЗАМЕНЫ АВАТАРА

function handlerAvatarFormSubmit(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const newAvatar = avatarInput.value; // приравниваю записанное значение поля залоговка к параметру фунции создания карточки
    avatarOld.src = newAvatar;
    renderLoading(true, avatarEditButton);
    getMyAvatar(newAvatar)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, avatarEditButton);
        });

    closePopup(popupAvatar); // форма была отправлена, попап закрывается
    avatarInput.value = "";
}

// Загрузка имени и описания профиля с сервера
function updateProfile() {
    getUsers()
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            res.forEach((user) => {
                if (user._id === "6043356bdb4f546a17e4e66d") {
                    profileNameSaved.textContent = user.name;
                    profileDescriptionSaved.textContent = user.about;
                    avatarOld.src = user.avatar;
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

// ФУНКЦИЯ ПОДГРУЖАЕТ ЗНАЧЕНИЯ ИМЕНИ И ОПИСАНИЯ ПРОФИЛЯ В POP-UP
function reWrite() {
    profileNameOld.value = profileNameSaved.textContent;
    profileDescriptionOld.value = profileDescriptionSaved.textContent;
    openPopup(popupEdit);
}

// ЛАЙКИ

function addLike(event) {
    // создаю функцию события в документе

    const likeHeart = event.target;
    const likesContainer = likeHeart.closest(".element__likes");
    const currentCard = likeHeart.closest(".element");
    const likeCount = likesContainer.querySelector(".element__like-count");
    let count = likeCount.textContent;
    const cardId = currentCard.id;

    if (!likeHeart.classList.contains("element__like_active")) {
        likeCount.textContent = Number.parseInt(count) + 1;
        sendLike(cardId);
    } else {
        likeCount.textContent = count - 1;
        deleteLike(cardId);
    }

    likeHeart.classList.toggle("element__like_active");
}

function updateServerCards() {
    getInitialCards()
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            renderCards(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

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

function getCurrentUser() {
    getMyId()
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((user) => {
            getUserId(user);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getUserId(user) {
    currentUserId = user._id;
}

function createCard(сardTitle, cardImage, initialLikes, cardOwner, cardId) {
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    const initialLikeHeart = cardElement.querySelector(".element__like");
    let likeCount = cardElement.querySelector(".element__like-count");
    let initialCardId = cardId;
    const bucket = cardElement.querySelector(".element__delete");
    cardElement.owner = cardOwner;
    cardElement.id = initialCardId;
    cardElement.querySelector(".element__title").textContent = сardTitle; // записываю параметр заголовка в соответствующий тег разметки html
    cardElement.querySelector(".element__image").src = cardImage; // записываю параметр изображения в соответствующий тег разметки html
    cardElement.querySelector(".element__image").alt = сardTitle; // записываю параметр заголовка в alt изображения
    likeCount.textContent = initialLikes.length;
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

const addLike = (event) => {
    const likeHeart = event.target;
    const likesContainer = likeHeart.closest(".element__likes");
    const currentCard = likeHeart.closest(".element");
    const likeCount = likesContainer.querySelector(".element__like-count");
    const cardId = currentCard.id;

    if (!likeHeart.classList.contains("element__like_active")) {
        sendLike(cardId).then((res) => {
            likeCount.textContent = res.likes.length;
            likeHeart.classList.toggle("element__like_active");
        });
    } else {
        deleteLike(cardId).then((res) => {
            likeCount.textContent = res.likes.length;
            likeHeart.classList.toggle("element__like_active");
        });
    }
};

// ФУНКЦИЯ ЗАМЕНЫ АВАТАРА

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

// Загрузка имени и описания профиля с сервера

getMyProfile()
    .then((res) => {
        avatarOld.src = res.avatar;
        profileNameSaved.textContent = res.name;
        profileDescriptionSaved.textContent = res.name;
        currentUserId = res._id;
    })
    .catch((err) => {
        console.log(err);
    });

// ФУНКЦИЯ ПОДГРУЖАЕТ ЗНАЧЕНИЯ ИМЕНИ И ОПИСАНИЯ ПРОФИЛЯ В POP-UP
function reWrite() {
    profileNameOld.value = profileNameSaved.textContent;
    profileDescriptionOld.value = profileDescriptionSaved.textContent;
    openPopup(popupEdit);
}

//  ОТПРАВКА ФОРМЫ

function handlerAddFormSubmit(event) {
    event.preventDefault();
    renderLoading(true, popupFormButton);
    const cardTitle = title.value;
    const cardImage = image.value;
    sendCards(cardTitle, cardImage, currentUserId)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            addCard(cardTitle, cardImage, 0, currentUserId, res._id);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, popupFormButton);
        });

    closePopup(popupAdd); // форма была отправлена, попап закрывается
    event.target.reset(); // поля формы очищаются после закрытия попап
    popupFormButton.classList.add("popup__form-button_disabled");
    popupFormButton.setAttribute("disabled", true);
}

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ // ОТПРАВКА ФОРМЫ

function handlerEditFormSubmit() {
    profileNameSaved.textContent = profileNameOld.value; // контент дефолтного поля Имя теперь равняется value Имени в форме
    profileDescriptionSaved.textContent = profileDescriptionOld.value; // контент дефолтного поля описания теперь равняется value описания в форме
    closePopup(popupEdit); // функция сохранения информации отработала и при этом попап закрылся, очистки формы не происходит, т.к. в данном случае нет
    renderLoading(true, popupEditButton);
    getMyProfile(profileNameOld.value, profileDescriptionOld.value)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
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
    deleteCards(deletingItemId)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, confirmButton);
        });
    deletingItem.remove();
    closePopup(popupConfirm); // попап подтверждения отработал и закрывается
}

function renderLoading(isLoading, currentButton) {
    if (isLoading) {
        currentButton.textContent = "Сохранение...";
    } else {
        currentButton.textContent = "Сохранить";
    }
}
