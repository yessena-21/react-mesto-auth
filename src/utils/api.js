
class Api {
    constructor({ baseUrl, headers }) {
        this.link = baseUrl;
        this.headers = headers;
    }

    getUserInfo() {
        return this._request(`${this.link}users/me`, {
            method: 'GET',
            headers: this.headers
        })
    }

    setUserInfo(data) {
        return this._request(`${this.link}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    getInitialCards() {
        return this._request(`${this.link}cards`, {
            headers: this.headers
        })

    }

    editAvatar(data) {
        return this._request(`${this.link}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        })
    }

    createCard(newCard) {
        return this._request(`${this.link}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            })
        })
    }

    deleteCard(id) {
        return this._request(`${this.link}cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
    }

    changeLikeCardStatus(id, isLiked) {
        return this._request(`${this.link}cards/likes/${id}`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this.headers,
        });
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    _request(url, options) {
        return fetch(url, options).then(this._getResponseData)
    }
}

const headers = {
    authorization: '9f07f35c-3f62-4d72-b050-c9f2d51971ca',
    'Content-Type': 'application/json'
};

const baseURL = 'https://mesto.nomoreparties.co/v1/cohort-49/';

const api = new Api({
    baseUrl: baseURL,
    headers: headers
});
export default api;
