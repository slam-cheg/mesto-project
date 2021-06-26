let popup = document.getElementById('popup');
let editButton = document.getElementById('editButton').addEventListener("click", openPopup);
let closeButton = document.getElementById('closeButton').addEventListener("click", closePopup);
let likeButton = document.getElementById('like').addEventListener("click", likeAdd);

function openPopup() {
    popup.style.display = 'flex';
};

function closePopup() {
    popup.style.display = 'none';
};

function likeAdd() {
    likeButton.addquerrySelector('element__like_active');
};