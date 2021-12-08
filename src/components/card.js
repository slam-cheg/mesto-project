import { currentUserId, renderingImage, confirming } from "../pages/index.js";
import { sendLike, deleteLike } from "./api.js";

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
    const cardImg = cardElement.querySelector(".element__image");
    const initialLikeHeart = cardElement.querySelector(".element__like");
    const likeCount = cardElement.querySelector(".element__like-count");
    likeCount.textContent = initialLikes.length;
    const bucket = cardElement.querySelector(".element__delete");
    cardElement.owner = cardOwner;
    cardElement.id = cardId;
    cardElement.querySelector(".element__title").textContent = сardTitle;
    cardImg.src = cardImage;
    cardImg.alt = сardTitle;
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

export const addCard = (cardTitle, cardImage, initialLikes, cardOwner, cardId) => {
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
        sendLike(cardId)
            .then((res) => {
                likeCount.textContent = res.likes.length;
                likeHeart.classList.toggle("element__like_active");
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        deleteLike(cardId)
            .then((res) => {
                likeCount.textContent = res.likes.length;
                likeHeart.classList.toggle("element__like_active");
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
