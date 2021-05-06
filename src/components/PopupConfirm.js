import {Popup} from './Popup.js'

export  class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._confirmCallback = () => {}
    }

    open = (confirmCallback) => {
        this._confirmCallback = confirmCallback
        super.open()
    }

    setEventListeners = () => {
        this._popup.querySelector('.popup__button-submit').addEventListener('click', () => {
            this._confirmCallback()
            this.close()
        })

       super.setEventListeners()
    }
}