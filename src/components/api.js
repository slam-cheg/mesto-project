
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
        headers: {
            "authorization": token,
            "Content-Type": contentType["Content-Type"],

        },
    });
};


const getMyProfile = () => {
    return fetch(mainUrl + "users/me", {
        method: "GET",
        headers: {
            "authorization": token,
            "Content-Type": contentType,

        },
    });
};


const updateMyProfile = (name, about) => {
    return fetch(mainUrl + "users/me", {
        method: "PATCH",
        headers: {
            "authorization": token,
            "Content-Type": contentType,

        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`,
            _id: "6043356bdb4f546a17e4e66d",
        }),
    });
};

const getMyAvatar = (avatar) => {
    return fetch(mainUrl + "users/me/avatar", {
        method: "PATCH",
        headers: {
            "authorization": token,
            "Content-Type": contentType,
        },
        body: JSON.stringify({
            avatar: `${avatar}`,
        }),
    });
};

const getUsers = () => {

    return fetch(mainUrl + "users", {
        headers: {
            "authorization": token,
            "Content-Type": contentType,
        },
    });
};

const sendCards = (name, link, userId) => {
    return fetch(mainUrl + "cards", {
        method: "POST",
        headers: {
            "authorization": token,
            "Content-Type": contentType,
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`,
            _id: `${userId}`,
        }),
    });
};

const deleteCards = (cardId) => {
    return fetch(mainUrl + "cards/" + `${cardId}`, {
        method: "DELETE",
        headers: {
            "authorization": token,
            "Content-Type": contentType,
        },
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    });
};

const sendLike = (cardId) => {
    return fetch(mainUrl + "cards/likes/" + `${cardId}`, {
        method: "PUT",
        headers: {
            "authorization": token,
            "Content-Type": contentType,
        },
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteLike = (cardId) => {
    return fetch(mainUrl + "cards/likes/" + `${cardId}`, {
        method: "DELETE",
        headers: {
            "authorization": token,
            "Content-Type": contentType,
        },
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    });
};

export { getInitialCards, getUsers, getMyId, getMyProfile, getMyAvatar, sendCards, deleteCards, sendLike, deleteLike };
