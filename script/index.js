// ОТКРЫТИЕ И ЗАКРЫТИЕ POP-UP

let popup = document.querySelector('.popup');
let editButton = document.getElementById('editButton').addEventListener("click", openPopup);
let closeButton = document.getElementById('closeButton').addEventListener("click", closePopup);

function openPopup() {
    popup.style.display = 'flex';
};

function closePopup() {
    popup.style.display = 'none';
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