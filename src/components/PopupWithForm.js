import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector)
        this._submitCallBack = submitCallBack
        this._popupForm = this._popup
            .querySelector('.popup__form')
        this._submitButton = this._popupForm
            .querySelector('.popup__button-submit')
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
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            const buttonLabel = this._submitButton.textContent
            this._submitButton.textContent = 'Сохранение...'
            const inputValues = this._getInputValues()
            this._submitCallBack(inputValues)
                .then(() => {
                    this._submitButton.textContent = buttonLabel
            })
        })

        super.setEventListeners()
    }

    close = () => {
        this._popupForm.reset()
        super.close()
    }
}