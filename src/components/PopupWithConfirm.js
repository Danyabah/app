import { Popup } from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, deleteApi }) {
    super({ popupSelector });
    this._form = this._popup.querySelector(".form");
    this._deleteApi = deleteApi;
  }

  setData(data, deleteCard) {
    this._data = data;
    this._deleteCard = deleteCard;
  }

  getData() {
    return { data: this._data, deleteCard: this._deleteCard };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._deleteApi();
    });
  }
}
