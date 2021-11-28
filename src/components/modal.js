function openPopup(currentPopup) {
    // функция открытия попапов

    currentPopup.classList.add("popup_opened"); // добавление класса у текущего попап
    window.addEventListener("keydown", openCloseModal);
}

function closePopup(currentPopup) {
    currentPopup.classList.remove("popup_opened"); // переключение класса у текущего попап
    window.removeEventListener("keydown", openCloseModal);
}

function openCloseModal(event) {
    const openedPopUp = document.querySelector(".popup_opened");
    if (event.key === "Escape") {
        closePopup(openedPopUp);
    }
    if (event.type === "click") {
        if (event.target === event.currentTarget) {
            closePopup(event.target);
        }
    }
}

export { openPopup, closePopup, openCloseModal };
