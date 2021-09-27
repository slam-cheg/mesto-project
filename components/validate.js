const validate = function () { // файл валидности будет экспортирован по default как самовызывающаяся функция

    console.log("LOADED"); // проверка экспорта файла в index.js - успех

    const setEventListeners = (formElement) => { // создание функции которая принимает форму
        const inputList = Array.from(formElement.querySelectorAll(".popup__form-input")); // создаю массив из каждого инпута который есть в полученном филдсете
        const buttonElement = formElement.querySelector(".popup__form-button"); //нашлась кнопка от данной формы
//        toggleButtonState(inputList, buttonElement); // запуск функции смены состояния кнопки
        inputList.forEach((inputElement) => { // проход по каждому инпуту
            inputElement.addEventListener("input", function () { // обработчик событий
                checkInputValidity(formElement, inputElement); // проверка валидности поля
                toggleButtonState(inputList, buttonElement); // переключение состояния кнопки
            });
        });
    };

    function toggleButtonState(inputList, buttonElement) { // функция переключения состояния кнопки
        if (hasInvalidInput(inputList)) { // если инпут не валиден то
            buttonElement.classList.add("popup__form-button_disabled"); // состояние кнопки переключается на неактивное
        } else {
            buttonElement.classList.remove("popup__form-button_disabled"); // или переключается на активное если инпут валиден
        }
    }

    const checkInputValidity = (formElement, inputElement) => { // проверка валидности поля
        if (!inputElement.validity.valid) { // если не поле валидно
            showInputError(formElement, inputElement, inputElement.validationMessage); // показываем сообщение об ошибке
        } else {
            hideInputError(formElement, inputElement); // если валидно то прячем сообщение об ошибке если оно было ранее активно
        }
    };

    const showInputError = (formElement, inputElement, errorMessage) => { // функция показа сообшения об ошибке
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // в данной форме ищу айди нужного инпута
        inputElement.classList.add("popup__input__error_active"); // к инпуту добавляется класс показа сообщения об ошибке
        errorElement.textContent = errorMessage;
        errorElement.classList.add("popup__input__error_active");
    };

    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove("form__input_type_error");
        errorElement.classList.remove("form__input-error_active");
        errorElement.textContent = "";
    };

    const enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(".popup__form"));
        formList.forEach((formElement) => {
            formElement.addEventListener("submit", function (evt) {
                evt.preventDefault();
            });
            const fieldsetList = Array.from(formElement.querySelectorAll(".popup__form-field-set"));
            fieldsetList.forEach((fieldSet) => {
                setEventListeners(fieldSet);
            });
        });
    };

    enableValidation();

    function hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
};

export default validate;
