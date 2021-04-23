import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImageFullView = this._popup.querySelector('.popup__image-full')
        this._popupImageTitle = this._popup.querySelector('.popup__image-title')
    }

    open = (src, alt) => {
        this._popupImageFullView.src = src
        this._popupImageTitle.textContent = alt
        this._popupImageFullView.alt = alt
        super.open()
    }
}