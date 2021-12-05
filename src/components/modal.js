function openPopup(currentPopup) {
    // функция открытия попапов

    currentPopup.classList.add("popup_opened"); // добавление класса у текущего попап
    window.addEventListener("keydown", closeByEscape);
}

function closePopup(currentPopup) {
    currentPopup.classList.remove("popup_opened"); // переключение класса у текущего попап
    window.removeEventListener("keydown", closeByEscape);
}

function handleOverlayClick(event) {
    if (event.type === "click") {
        if (event.target === event.currentTarget) {
            closePopup(event.target);
        }
    }
}

function closeByEscape(event) {
    if (event.key === "Escape") {
        const openedPopUp = document.querySelector(".popup_opened");
        closePopup(openedPopUp);
    }
}

export { openPopup, closePopup, closeByEscape, handleOverlayClick };
