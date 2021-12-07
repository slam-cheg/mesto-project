import { sendLike, deleteLike } from "./api";

export const addLike = (event) => {
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

export const renderLoading = (isLoading, currentButton) => {
    if (isLoading) {
        currentButton.textContent = "Сохранение...";
    } else {
        currentButton.textContent = "Сохранить";
    }
}