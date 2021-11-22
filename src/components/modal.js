function openPopup(currentPopup) {
    // функция открытия попапов

    currentPopup.classList.add("popup_opened"); // добавление класса у текущего попап

    window.addEventListener("keydown", (event) => {
        // отслеживаем событие нажатия кнопки Escape в глобальной видимости
        if (event.key === "Escape") {
            // при совершении события срабатывает функция закрытия popup
            closePopup(currentPopup);
        }
    });
    currentPopup.addEventListener("click", (event) => {
        if (event.target === currentPopup) {
            closePopup(currentPopup);
        }
    });
}

function closePopup(currentPopup) {
    currentPopup.classList.remove("popup_opened"); // переключение класса у текущего попап
    window.removeEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePopup(currentPopup);
        }
    });
    currentPopup.removeEventListener("click", (event) => {
        if (event.target === currentPopup) {
            closePopup(currentPopup);
        }
    });
}

export { openPopup, closePopup };
