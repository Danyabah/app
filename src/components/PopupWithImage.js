import {Popup} from './Popup.js'
export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__image")
        this._popupImageDescription = this._popup.querySelector(".popup__image-description")
    }
    open(name, link) {
        this._popupImage.src = link;
        this._popupImageDescription.textContent = name;
        this._popupImage.alt = name;

        super.open();
    }
}
