import { currentUserId, renderingImage, confirming } from "../pages/index.js";
import { addLike } from "./utils";

const cardsContainer = document.querySelector(".elements"); // нахожу в документе место, в которое добавляются все карточки
const cardTemplate = document.querySelector("#card-template").content; // нахожу в документе шаблонную разметку для карточек

export const renderCards = (arr) => {
    arr.reverse().forEach((item) => {
        const cardTitle = item.name;
        const cardImage = item.link;
        const initialLikes = item.likes;
        const cardOwner = item.owner._id;
        const cardId = item._id;
        addCard(cardTitle, cardImage, initialLikes, cardOwner, cardId);
    });
};

export const createCard = (сardTitle, cardImage, initialLikes, cardOwner, cardId) => {
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
        likeCount = 0;
    }

    cardElement.querySelector(".element__like").addEventListener("click", addLike);
    cardElement.querySelector(".element__image").addEventListener("click", renderingImage); // запускает функцию приравнивания картинки в карточке к картинке в попапе с большим изображением
    cardElement.querySelector(".element__delete").addEventListener("click", confirming); // удаляет карточку из html разметки

    return cardElement;
};

export const addCard = (cardTitle, cardImage, initialLikes, cardOwner, cardId) => {
    const card = createCard(cardTitle, cardImage, initialLikes, cardOwner, cardId);
    cardsContainer.prepend(card);
};
