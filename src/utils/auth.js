class Auth {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  registration({ email, password }) {
    return this._request(`${this.baseUrl}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
  }

  authorization({ email, password }) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
  }

  checkToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
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

const auth = new Auth('https://auth.nomoreparties.co');

export default auth;