import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector(".form__button");
    this._form = this._popup.querySelector("form[name]");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._buttonText = this._button.textContent;
  }
  _getInputValues() {
    this._formData = {};
    this._inputList.forEach(
      (input) => (this._formData[input.name] = input.value)
    );
    return this._formData;
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  showLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = this._buttonText;
    }
  }
  close() {
    this._form.reset();
    super.close();
  }
}
