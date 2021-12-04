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
        headers: {
            authorization: "63df2546-4d95-4a42-b062-f15b89a1551f",
        },
    });
}

function getMyProfile(name, about) {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me", {
        method: "PATCH",
        headers: {
            "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`,
        }),
    });

}

function sendMyProfile(name, about) {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me", {
        method: "POST",
        headers: {
            "authorization": "63df2546-4d95-4a42-b062-f15b89a1551f",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`,
        }),
    });

}

function sendCards() {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/cards", {
        method: "POST",
        headers: {
            "authorization": "c56e30dc-2883-4270-a59e-b2f7bae969c6",
            "Content-Type": "json",
        },
    });
}

const getUsers = () => {
    return fetch("https://nomoreparties.co/v1/plus-cohort-4/users", {
        headers: {
            authorization: "63df2546-4d95-4a42-b062-f15b89a1551f",
        },
    })
        .then((res) => res.json())
        .then((result) => {})
        .catch((err) => {
            console.log(err);
        });
};

export { getInitialCards, getUsers, getMyId, getMyProfile, sendMyProfile };
