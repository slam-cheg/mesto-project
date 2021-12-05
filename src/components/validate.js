const settings = {
    popupError: "popup__form-input_error_active",
    popupButtonDisabled: "popup__form-button_disabled",
    popupFieldSet: ".popup__form-field-set",
    popupButton: ".popup__form-button",
    popupInput: ".popup__form-input",
    popupForm: ".popup__form"
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.popupForm));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(settings.popupFieldSet));
        const inputList = Array.from(formElement.querySelectorAll(settings.popupInput));
        const buttonElement = formElement.querySelector(settings.popupButton);
        const settingsError = settings.popupError;
        const disabledButton = settings.popupButtonDisabled;
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, inputList, buttonElement, settingsError, disabledButton);
        });
    });
};

const setEventListeners = (formElement, inputList, buttonElement, settingsError, disabledButton) => {
    toggleButtonState(inputList, buttonElement, disabledButton);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, settingsError);
            toggleButtonState(inputList, buttonElement, disabledButton);
        });
    });
};

const checkInputValidity = (formElement, inputElement, settingsError) => {
    // проверка валидности поля
    if (!inputElement.validity.valid) {
        // если поле не валидно
        showInputError(formElement, inputElement, inputElement.validationMessage, settingsError); // показываем сообщение об ошибке
    } else {
        hideInputError(formElement, inputElement, settingsError); // если валидно то прячем сообщение об ошибке если оно было ранее активно
    }
};

const showInputError = (formElement, inputElement, errorMessage, settingsError) => {
    // функция показа сообшения об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // в данной форме ищу айди нужного инпута
    inputElement.classList.add(settingsError);
    errorElement.textContent = errorMessage; // значение поля об ошибке
    errorElement.classList.add(settingsError);
};

const hideInputError = (formElement, inputElement, settingsError) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // сама ошибка
    inputElement.classList.remove(settingsError); // убирается класс когда ошибка уже не активна
    errorElement.classList.remove(settingsError);
    errorElement.textContent = ""; // тексту ошибки присвается пустая строка
};

function hasInvalidInput(inputList) {
    // форма не валидна
    return inputList.some((inputElement) => {
        // если хотя бы одно поле равно false
        return !inputElement.validity.valid; // возвращаем ошибку валидации в форме
    });
}

function toggleButtonState(inputList, buttonElement, disabledButton) {
    if (hasInvalidInput(inputList)) {
        // если инпут не валиден то
        buttonElement.classList.add(disabledButton); // состояние кнопки переключается на неактивное
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(disabledButton); // или переключается на активное если инпут валиден
        buttonElement.disabled = false;
    }
}

export { setEventListeners, checkInputValidity, showInputError, hideInputError, enableValidation, hasInvalidInput, toggleButtonState, settings };
