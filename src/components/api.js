const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-4",
    headers: {
        "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
        "Content-Type": "application/json",
    },
};

function getInitialCards() {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/cards", {
        method: "GET",
        headers: {
            authorization: "63df2546-4d95-4a42-b062-f15b89a1551f",
        },
    });
}

function getMyId() {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me", {
        method: "GET",
        headers: {
            authorization: "63df2546-4d95-4a42-b062-f15b89a1551f",
        },
    })
}

const getMyProfile = (name, about) => {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me", {
        method: "PATCH",
        headers: {
            "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`,
            _id: "6043356bdb4f546a17e4e66d",
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

const getMyAvatar = (avatar) => {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me/avatar", {
        method: "PATCH",
        headers: {
            "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: `${avatar}`,
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

const getUsers = () => {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/users", {
        headers: {
            authorization: "63df2546-4d95-4a42-b062-f15b89a1551f",
        },
    });
};

const sendCards = (name, link, userId) => {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/cards", {
        method: "POST",
        headers: {
            "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`,
            _id: `${userId}`,
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

export { getInitialCards, getUsers, getMyId, getMyProfile, getMyAvatar, sendCards };
