const setEventListeners = (formElement, inputList, buttonElement) => {
    // создание функции которая принимает форму

    toggleButtonState(inputList, buttonElement); // запуск функции смены состояния кнопки
    inputList.forEach((inputElement) => {
        // проход по каждому инпуту
        inputElement.addEventListener("input", function () {
            // обработчик событий
            checkInputValidity(formElement, inputElement); // проверка валидности поля
            toggleButtonState(inputList, buttonElement); // переключение состояния кнопки
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
    inputElement.classList.add("popup__form-input_error_active");
    errorElement.textContent = errorMessage; // значение поля об ошибке
    errorElement.classList.add("popup__form-input_error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // сама ошибка
    inputElement.classList.remove("popup__form-input_error_active"); // убирается класс когда ошибка уже не активна
    errorElement.classList.remove("popup__form-input_error_active");
    errorElement.textContent = ""; // тексту ошибки присвается пустая строка
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form")); // нашел все формы на странице и добавил их в массив
    formList.forEach((formElement) => {
        // прошелся по всем формам
        formElement.addEventListener("submit", function (evt) {
            // добавил на все формы обработчик события сабмит
            evt.preventDefault(); // отмена стандартной отправки формы
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(".popup__form-field-set")); // массив всех филдсетов
        const inputList = Array.from(formElement.querySelectorAll(".popup__form-input")); // создаю массив из каждого инпута который есть в полученном филдсете
        const buttonElement = formElement.querySelector(".popup__form-button"); //нашлась кнопка от данной формы
        fieldsetList.forEach((fieldSet) => {
            // для каждого филдсета
            setEventListeners(fieldSet, inputList, buttonElement); // устанавливаются обработчики событий
        });
        
    });
};

function hasInvalidInput(inputList) {
    // форма не валидна
    return inputList.some((inputElement) => {
        // если хотя бы одно поле равно false
        return !inputElement.validity.valid; // возвращаем ошибку валидации в форме
    });
}

function toggleButtonState(inputList, buttonElement) {
    // функция переключения состояния кнопки
    if (hasInvalidInput(inputList)) {
        // если инпут не валиден то
        buttonElement.classList.add("popup__form-button_disabled"); // состояние кнопки переключается на неактивное
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove("popup__form-button_disabled"); // или переключается на активное если инпут валиден
        buttonElement.disabled = false;
    }
}

export { setEventListeners, checkInputValidity, showInputError, hideInputError, enableValidation, hasInvalidInput, toggleButtonState };
