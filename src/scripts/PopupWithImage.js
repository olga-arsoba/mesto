import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open = (src, alt) => {
        const popupImageFullView = this._popup.querySelector('.popup__image-full')
        const popupImageTitle = this._popup.querySelector('.popup__image-title')
        popupImageFullView.src = src
        popupImageTitle.textContent = alt
        popupImageFullView.alt = alt
        super.open()
    }
}