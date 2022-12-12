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
        authorization:`Bearer ${localStorage.getItem('jwt')}`,
    },
      body: JSON.stringify({ email, password }),
    })
  }

  checkToken(jwt) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization:`Bearer ${jwt}`,
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

const auth = new Auth('https://api.yessena.students.nomoredomains.club');

export default auth;