export class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    console.log("ffgg");
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    console.log(this._popup);
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup_opened")
      ) {
        this.close();
      }
    });
  }
}
