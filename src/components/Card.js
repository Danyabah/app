//Использую директиву импорта из index.js

export default class Card {
  constructor(
    data,
    cardConfig,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    getUserId,
    handleLike,
    handleDislike
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._titleSelector = cardConfig.titleCardText;
    this._imgSelector = cardConfig.imgCardElement;
    this._buttonLikeSelector = cardConfig.likeBtn;
    this._buttonDeleteSelector = cardConfig.deleteBtn;
    this._likesCountSelector = cardConfig.likesCount;
    this._userId = getUserId;
    this._likeCardApi = handleLike;
    this._dislikeCardApi = handleDislike;
  }
  //Генерирую карточку методом _createTemplate
  _createTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const card = cardTemplate.querySelector(".card__item").cloneNode(true);
    return card;
  }
  //Добавление данных методом _setData
  _getElements() {
    this._likesCount = this._cardElement.querySelector(
      this._likesCountSelector
    );
    this._buttonDelete = this._cardElement.querySelector(
      this._buttonDeleteSelector
    );
  }
  _setData() {
    const title = this._cardElement.querySelector(this._titleSelector);
    this._img = this._cardElement.querySelector(this._imgSelector);

    title.textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;
  }
  //Подключаю переключение активной Like методом _toggleCardActive
  // _toggleCardActive() {
  //   this._buttonLike.classList.toggle("card__button-likes_active");
  // }
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
    this._buttonLike.addEventListener("click", () => {
      this._toggleLikeApi(this._data);
    });
    // this._buttonLike.addEventListener("click", () => this._toggleCardActive());

    this._buttonDelete.addEventListener("click", () =>
      this._handleDeleteCard(this._data, this._deleteCard.bind(this))
    );
    this._img.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
  _isDelete(data) {
    if (data.owner._id !== this._userId()) {
      this._buttonDelete.remove();
    }
  }
  // счетчик лайков
  countLikes(data) {
    this._likesCount.textContent = data.likes.length;
  }

  toggleLike(data) {
    const result = data.likes.some((element) => {
      return element._id === this._userId();
    });
    if (!result) {
      this._dislikeCard();
    } else {
      this._likeCard();
    }
  }

  _dislikeCard() {
    this._buttonLike.classList.remove("card__button-likes_active");
  }

  _likeCard() {
    this._buttonLike.classList.add("card__button-likes_active");
  }

  _toggleLikeApi(data) {
    if (this._buttonLike.classList.contains("card__button-likes_active")) {
      this._dislikeCardApi(data._id);
    } else {
      this._likeCardApi(data._id);
    }
  }
  //Метод создание карточки createCard из шаблона
  createCard() {
    this._cardElement = this._createTemplate();
    this._getElements();
    this._isDelete(this._data);
    this.countLikes(this._data);

    this._setData();
    this._setListener();
    return this._cardElement;
  }
}
