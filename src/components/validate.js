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
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, inputList, buttonElement);
        });
    });
};

const setEventListeners = (formElement, inputList, buttonElement) => {
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const checkInputValidity = (formElement, inputElement) => {
    // проверка валидности поля
    if (!inputElement.validity.valid) {
        // если поле не валидно
        showInputError(formElement, inputElement, inputElement.validationMessage); // показываем сообщение об ошибке
    } else {
        hideInputError(formElement, inputElement); // если валидно то прячем сообщение об ошибке если оно было ранее активно
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    // функция показа сообшения об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // в данной форме ищу айди нужного инпута
    inputElement.classList.add(settings.popupError);
    errorElement.textContent = errorMessage; // значение поля об ошибке
    errorElement.classList.add(settings.popupError);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // сама ошибка
    inputElement.classList.remove(settings.popupError); // убирается класс когда ошибка уже не активна
    errorElement.classList.remove(settings.popupError);
    errorElement.textContent = ""; // тексту ошибки присвается пустая строка
};

function hasInvalidInput(inputList) {
    // форма не валидна
    return inputList.some((inputElement) => {
        // если хотя бы одно поле равно false
        return !inputElement.validity.valid; // возвращаем ошибку валидации в форме
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        // если инпут не валиден то
        buttonElement.classList.add(settings.popupButtonDisabled); // состояние кнопки переключается на неактивное
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settings.popupButtonDisabled); // или переключается на активное если инпут валиден
        buttonElement.disabled = false;
    }
}

export { setEventListeners, checkInputValidity, showInputError, hideInputError, enableValidation, hasInvalidInput, toggleButtonState, settings };
