

class Api {
    constructor({ baseUrl, headers }) {
        this.link = baseUrl;
        this.headers = headers;
    }

    getUserInfo() {
        return this._request(`${this.link}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
        })
    }

    setUserInfo(data) {
        return this._request(`${this.link}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    getInitialCards() {
        return this._request(`${this.link}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
        })

    }

    editAvatar(data) {
        return this._request(`${this.link}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(data)
        })
    }

    createCard(newCard) {
        return this._request(`${this.link}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            })
        })
    }

    deleteCard(id) {
        return this._request(`${this.link}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
        })
    }

    changeLikeCardStatus(id, isLiked) {
        return this._request(`${this.link}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
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
    'Content-Type': 'application/json',
};

const baseURL = 'https://api.yessena.students.nomoredomains.club';

const api = new Api({
    baseUrl: baseURL,
    headers: headers
});
export default api;
