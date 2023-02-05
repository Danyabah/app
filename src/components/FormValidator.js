//Создан класс FormValidator для настройки валидации полей формы
export default class FormValidator {
  constructor(params, validatedForm) {
    (this._form = params.formSelector),
      (this._input = params.inputSelector),
      (this._submitBtn = params.submitButtonSelector),
      (this._inputError = params.inputErrorClass),
      (this._error = params.errorClass),
      (this._formElement = validatedForm);
    this._inputList = Array.from(validatedForm.querySelectorAll(this._input));
    this._buttonElement = this._formElement.querySelector(this._submitBtn);
  }
  //Проверяю методом _hasInvalidInp наличие невалидного поля
  _hasInvalidInp() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Методом _toggleBtn переключаю кнопку отправки
  _toggleBtn() {
    if (this._hasInvalidInp()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }
  //Проверяю на валидность
  _checkIsValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //Методом _showInputError добавляю калсс с ошибкой
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._error);
  }
  //Методом _hideInputError удаляю калсс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._error);
    errorElement.textContent = "";
  }
  //На все поля ввода внутри формы добавляю слушателей методом _setEvtListeners
  _setEvtListeners() {
    this._toggleBtn();

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleBtn();
      }, 0);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkIsValid(inputElement);
        this._toggleBtn();
      });
    });
  }
  //Вызываю валидацию форм методом enableValidation
  enableValidation() {
    this._setEvtListeners();
  }
}
