export class Card {
    constructor({card, handleTrashClick, handleLikeClick, handleCardClick}, templateSelector, userId) {
        this._card = card
        this._templateSelector = templateSelector
        this._handleCardClick = handleCardClick
        this._handleTrashClick = handleTrashClick
        this._handleLikeClick = handleLikeClick
        this._userId = userId
    }

    setCard = (card) => {
        this._card = card
    }

    getElement = () => {
        this._element = this._getTemplate()
        this._setData()
        this._showTrashIconOnlyForMe()
        this.toggleLikeState()
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

    _setData = () => {
        this._element.querySelector('.element__title').textContent = this._card.name
        const elementItem = this._getElementItem()
        elementItem.src = this._card.link
        elementItem.alt = this._card.name
        this.setLikeAmount(this.getLikeAmount())
    }

    toggleLikeState = () => {
        if(this.isLikedByMe()) {
            this.getElementLike().classList.add('element__like_active')
        }
    }

    isLikedByMe = () => {
        return this._card.likes.some((like) => {
            return like._id === this._userId
        })
    }

    setLikeAmount = (amount) => {
        const elementLikeAmount = this._element.querySelector('.element__like-amount')
        elementLikeAmount.textContent = amount
    }

    getLikeAmount = () => {
       return this._card.likes.length
    }

    _showTrashIconOnlyForMe = () => {
        if (this._card.owner._id !== this._userId) {
            this.getElementTrash().remove()
        }
    }

    getElementLike = () => {
        return this._element.querySelector('.element__like')
    }

    getElementTrash = () => {
        return this._element.querySelector('.element__trash')
    }

    _setEventListeners = () => {
        this.getElementLike().addEventListener('click', () => {
            this._handleLikeClick()
        })

        this.getElementTrash()?.addEventListener('click', () => {
            this._handleTrashClick()
        })

        this._getElementItem().addEventListener('click', () =>  {
            this._handleCardClick(this._card.link, this._card.name)
        })
    }
}
