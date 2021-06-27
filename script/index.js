// ОТКРЫТИЕ И ЗАКРЫТИЕ POP-UP

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button').addEventListener("click", Popup);
let closeButton = document.querySelector('.popup__close-button').addEventListener("click", Popup);

function Popup() {
    if (popup.style.display === 'flex'){
        popup.style.display = 'none';
    } 
    else {
        popup.style.display = 'flex';
    }   
};

// ЛАЙКИ

document.onclick = function(event) {
    if (event.target.className == 'element__like'){
        event.target.classList.add('element__like_active');
    }
    else {
        event.target.classList.remove('element__like_active');
    }
}

// ИМЯ ПРОФИЛЯ

let profileContainer = document.querySelector('.profile__text');