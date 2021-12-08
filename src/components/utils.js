import { popupEdit, profileDescriptionOld, profileDescriptionSaved, profileNameOld, profileNameSaved } from "../pages";
import { openPopup } from "./modal";

export const renderLoading = (isLoading, currentButton) => {
    if (isLoading) {
        currentButton.textContent = "Сохранение...";
    } else {
        currentButton.textContent = "Сохранить";
    }
};

// ФУНКЦИЯ ПОДГРУЖАЕТ ЗНАЧЕНИЯ ИМЕНИ И ОПИСАНИЯ ПРОФИЛЯ В POP-UP
export const reWrite = () => {
    profileNameOld.value = profileNameSaved.textContent;
    profileDescriptionOld.value = profileDescriptionSaved.textContent;
    openPopup(popupEdit);
};
