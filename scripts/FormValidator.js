export class FormValidator {
    constructor(config, form) {
        this._config = config
        this._form = form
    }

    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners()
    }

    toggleButton = () => {
        const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
        const buttonSubmit = this._form.querySelector(this._config.submitButtonSelector)
        this._toggleButtonState(inputs, buttonSubmit)
    }

    _setEventListeners = () => {
        const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
        const buttonSubmit = this._form.querySelector(this._config.submitButtonSelector)
        this._toggleButtonState(inputs, buttonSubmit)

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButtonState(inputs, buttonSubmit)
            })
        })
    }

    _toggleButtonState = (inputs, buttonSubmit) => {
        if (this._hasInvalidInput(inputs)) {
            buttonSubmit.classList.add(this._config.inactiveButtonClass)
        } else {
            buttonSubmit.classList.remove(this._config.inactiveButtonClass)
        }
    }

    _hasInvalidInput = (inputs) => {
        return inputs.some((input) => {
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