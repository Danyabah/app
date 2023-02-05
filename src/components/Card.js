//Использую директиву импорта из index.js

export default class Card {
  constructor(data, cardConfig, templateSelector, handleCardClick) {
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._titleSelector = cardConfig.titleCardText;
    this._imgSelector = cardConfig.imgCardElement;
    this._buttonLikeSelector = cardConfig.likeBtn;
    this._buttonDeleteSelector = cardConfig.deleteBtn;
  }
  //Генерирую карточку методом _createTemplate
  _createTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const card = cardTemplate.querySelector(".card__item").cloneNode(true);
    return card;
  }
  //Добавление данных методом _setData
  _setData() {
    const title = this._cardElement.querySelector(this._titleSelector);
    this._img = this._cardElement.querySelector(this._imgSelector);
    title.textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;
  }
  //Подключаю переключение активной Like методом _toggleCardActive
  _toggleCardActive() {
    this._buttonLike.classList.toggle("card__button-likes_active");
  }
  // Удаление карточки методом _deleteCard
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  //Добавляю слушателей событий методом _setListeners
  _setListener() {
    this._buttonLike = this._cardElement.querySelector(
      this._buttonLikeSelector
    );
    this._buttonLike.addEventListener("click", () => this._toggleCardActive());
    this._cardElement
      .querySelector(this._buttonDeleteSelector)
      .addEventListener("click", () => this._deleteCard());
    this._img.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
  //Метод создание карточки createCard из шаблона
  createCard() {
    this._cardElement = this._createTemplate();
    this._setData();
    this._setListener();
    return this._cardElement;
  }
}
