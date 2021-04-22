export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this.open = this.open.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.classList.add('popup_opened')
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose)
        this._popup.classList.remove('popup_opened')
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup
            .querySelector('.popup__close')
            .addEventListener('click',  () => {
                this.close()
            })

        this._popup
            .addEventListener('click', (evt) => {
                if (evt.target.classList.contains('popup')) {
                    this.close()
                }
            })
    }
}