const showInputError = (form, input, errorMessage, config) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (form, input, config) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (form, input, config) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, config);
    } else {
        hideInputError(form, input, config);
    }
};

const hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
}

const toggleButtonState = (inputs, buttonSubmit, config) => {
    if (hasInvalidInput(inputs)) {
        buttonSubmit.classList.add(config.inactiveButtonClass);
    } else {
        buttonSubmit.classList.remove(config.inactiveButtonClass);
    }
}

const setEventListeners = (form, config) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputs, buttonSubmit, config);

    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            checkInputValidity(form, input, config);
            toggleButtonState(inputs, buttonSubmit, config);
        });
    });
};

const toggleButtonCheck = (form, config) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputs, buttonSubmit, config);
}

const enableValidation = (config) => {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, config);
    });
};