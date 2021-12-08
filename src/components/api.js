const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-4/",
    headers: {
        "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
        "Content-Type": "application/json",
    },
};

const mainUrl = config.baseUrl;
const token = config.headers.authorization;
const contentType = config.headers["Content-Type"];

const getInitialCards = () => {
    return fetch(mainUrl + "cards", {
        method: "GET",
        headers: config.headers,
    }).then(checkResponse);
};

const getMyProfile = () => {
    return fetch(mainUrl + "users/me", {
        method: "GET",
        headers: config.headers,
    }).then(checkResponse);
};

const getMyAvatar = (avatar) => {
    return fetch(mainUrl + "users/me/avatar", {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${avatar}`,
        }),
    }).then(checkResponse);
};

const sendCards = (name, link, userId) => {
    return fetch(mainUrl + "cards", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`,
            _id: `${userId}`,
        }),
    }).then(checkResponse);
};

const deleteCards = (cardId) => {
    return fetch(mainUrl + "cards/" + `${cardId}`, {
        method: "DELETE",
        headers: config.headers,
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    }).then(checkResponse);
};

const sendLike = (cardId) => {
    return fetch(mainUrl + "cards/likes/" + `${cardId}`, {
        method: "PUT",
        headers: config.headers,
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    })
        .then(checkResponse)
        .catch((err) => {
            console.log(err);
        });
};

const deleteLike = (cardId) => {
    return fetch(mainUrl + "cards/likes/" + `${cardId}`, {
        method: "DELETE",
        headers: config.headers,
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    }).then(checkResponse());
};

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export { contentType, token, mainUrl, getInitialCards, getMyProfile, getMyAvatar, sendCards, deleteCards, sendLike, deleteLike };
