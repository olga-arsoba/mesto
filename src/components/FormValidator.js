export class FormValidator {
    constructor(config, form, inputList, buttonElement) {
        this._config = config
        this._form = form
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector))
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector)
    }

    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners()
    }

    _setEventListeners = () => {
        this.toggleButtonState()

        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this.toggleButtonState()
            })
        })
    }

    toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute("disabled", true)
            this._buttonElement.classList.add(this._config.inactiveButtonClass)
        } else {
            this._buttonElement.removeAttribute("disabled")
            this._buttonElement.classList.remove(this._config.inactiveButtonClass)
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some((input) => {
            return !input.validity.valid
        })
    }

    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage)
        } else {
            this._hideInputError(input)
        }
    }

    _getErrorElement = (input) => {
        return this._form.querySelector(`.${input.id}-error`)
    }

    _showInputError = (input, errorMessage) => {
        const errorElement = this._getErrorElement(input)
        input.classList.add(this._config.inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._config.errorClass)
    }

    _hideInputError = (input) => {
        const errorElement = this._getErrorElement(input)
        input.classList.remove(this._config.inputErrorClass)
        errorElement.classList.remove(this._config.errorClass)
        errorElement.textContent = ''
    }
}