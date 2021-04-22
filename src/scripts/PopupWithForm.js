import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector)
        this._submitCallBack = submitCallBack
        this._popupForm = this._popup
            .querySelector('.popup__form')
    }

    _getInputValues = () => {
        const inputValues = {}
        this._popupForm
            .querySelectorAll('input')
            .forEach((input) => {
                inputValues[input.name] = input.value
            })

        return inputValues
    }

    setEventListeners = () => {
        this._popupForm.addEventListener('submit', this._submitCallBack)
        super.setEventListeners()
    }

    close = () => {
        this._popupForm.reset()
        super.close()
    }
}