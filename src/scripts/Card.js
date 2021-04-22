export class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name
        this._link = link
        this._templateSelector = templateSelector
        this._handleCardClick = handleCardClick
    }

    getElement = () => {
        this._element = this._getTemplate()
        this._setNameAndLink()
        this._setEventListeners()
        return this._element
    }

    _getTemplate = () => {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    _getElementItem = () => {
        return this._element.querySelector('.element__item')
    }

    _setNameAndLink = () => {
        this._element.querySelector('.element__title').textContent = this._name
        const elementItem = this._getElementItem()
        elementItem.src = this._link
        elementItem.alt = this._name
    }

    _getElementLike = () => {
        return this._element.querySelector('.element__like')
    }

    _handleLike = () => {
        this._getElementLike().classList.toggle('element__like_active')
    }

    _getElementTrash = () => {
        return this._element.querySelector('.element__trash')
    }

    _handleTrash = () => {
        this._getElementTrash().closest('.element').remove()
    }

    _setEventListeners = () => {
        this._getElementLike().addEventListener('click', () => {
            this._handleLike()
        })

        this._getElementTrash().addEventListener('click', () => {
            this._handleTrash()
        })

        this._getElementItem().addEventListener('click', () =>  {
            this._handleCardClick(this._link, this._name)
        })
    }
}
