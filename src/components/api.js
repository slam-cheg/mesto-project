const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-4/",
    headers: {
        "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
        "Content-Type": "application/json",
    },
};

const getInitialCards = () => {
    return fetch(config.baseUrl + "cards", {
        method: "GET",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
    })
        .then(checkResponse)
};

const getMyProfile = () => {
    return fetch(config.baseUrl + "users/me", {
        method: "GET",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
    }).then(checkResponse);
};

const updateMyProfile = (name, about) => {
    return fetch(config.baseUrl + "users/me", {
        method: "PATCH",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`,
        }),
    }).then(checkResponse);
};

const getMyAvatar = (avatar) => {
    return fetch(config.baseUrl + "users/me/avatar", {
        method: "PATCH",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
        body: JSON.stringify({
            avatar: `${avatar}`,
        }),
    }).then(checkResponse);
};

const getUsers = () => {
    return fetch(config.baseUrl + "users", {
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
    }).then(checkResponse);
};

const sendCards = (name, link, userId) => {
    return fetch(config.baseUrl + "cards", {
        method: "POST",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`,
            _id: `${userId}`,
        }),
    }).then(checkResponse);
};

const deleteCards = (cardId) => {
    return fetch(config.baseUrl + "cards/" + `${cardId}`, {
        method: "DELETE",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    }).then(checkResponse);
};

const sendLike = (cardId) => {
    return fetch(config.baseUrl + "cards/likes/" + `${cardId}`, {
        method: "PUT",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
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
    return fetch(config.baseUrl + "cards/likes/" + `${cardId}`, {
        method: "DELETE",
        headers: {
            "authorization": config.headers.authorization,
            "Content-Type": config.headers["Content-Type"],
        },
        body: JSON.stringify({
            _id: `${cardId}`,
        }),
    })
        .then(checkResponse)
        .catch((err) => {
            console.log(err);
        });
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export { getInitialCards, getUsers, getMyProfile, updateMyProfile, getMyAvatar, sendCards, deleteCards, sendLike, deleteLike, config };
