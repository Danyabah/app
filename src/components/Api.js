export default class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    // тело конструктора
  }

  _request(url, options) {
    return fetch(url, options).then(this._response);
  }

  _response(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Произошла ошибка: ${response.status}`);
  }

  getProfile() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  setProfile(obj) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.userName,
        about: obj.userWork,
      }),
    });
  }

  addNewCard(obj) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.cardName,
        link: obj.cardLink,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setAvatar(obj) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.cardLink,
      }),
    });
  }

  // другие методы работы с API
}
