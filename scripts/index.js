import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

const showProfilePopupButton = document.querySelector('#edit-profile')
const popupProfile = document.querySelector('.popup_type_profile')
const closeProfilePopupButton = popupProfile.querySelector('.popup__close')
const profileName = document.querySelector('.profile__name')
const profileOccupation = document.querySelector('.profile__occupation')
const inputProfileName = document.querySelector('.popup__input_type_name')
const inputProfileOccupation = document.querySelector('.popup__input_type_occupation')
const profileForm = popupProfile.querySelector('.popup__form')
const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const profileFormValidator = new FormValidator(validationConfig, profileForm)
profileFormValidator.enableValidation()

function closePopupByEscape(evt) {
    const openedPopup = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {
        closePopup(openedPopup)
    }
}

function openPopup(popup) {
    document.addEventListener('keydown', closePopupByEscape)
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    document.removeEventListener('keydown', closePopupByEscape)
    popup.classList.remove('popup_opened')
}

function openProfilePopup() {
    inputProfileName.value = profileName.textContent
    inputProfileOccupation.value = profileOccupation.textContent
    profileFormValidator.toggleButtonState()
    openPopup(popupProfile)
}

showProfilePopupButton.addEventListener('click', openProfilePopup)
closeProfilePopupButton.addEventListener('click', function () {
    closePopup(popupProfile)
})

function saveProfile(evt) {
    evt.preventDefault()
    profileName.textContent = inputProfileName.value
    profileOccupation.textContent = inputProfileOccupation.value
    closePopup(popupProfile)
}

profileForm.addEventListener('submit', saveProfile)

const enablePopupClosing = () => {
    const popups = Array.from(document.querySelectorAll('.popup'))
    popups.forEach(popup => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                closePopup(popup)
            }
        })
    })
}

const cards = document.querySelector('.cards')
const popupCard = document.querySelector('.popup_type_card')
const addCardButton = document.querySelector('#add-card')
const closePopupCardButton = popupCard.querySelector('.popup__close')
const inputCardTitle = document.querySelector('.popup__input_type_title')
const inputCardLink = document.querySelector('.popup__input_type_link')
const newCardForm = popupCard.querySelector('.popup__form')

const cardFormValidator = new FormValidator(validationConfig, newCardForm)
cardFormValidator.enableValidation()

addCardButton.addEventListener('click', function () {
    openPopup(popupCard)
})

closePopupCardButton.addEventListener('click', function () {
    closePopup(popupCard)
})

function createCard(cardData) {
    const card = new Card(cardData.name, cardData.link, '#card', openImage)

    return card.getElement()
}

function addCard(cardElement) {
    cards.prepend(cardElement)
    newCardForm.reset()
}

function addNewCard(evt) {
    evt.preventDefault()
    const cardData = {
        name: inputCardTitle.value,
        link: inputCardLink.value
    }
    const cardElement = createCard(cardData)
    addCard(cardElement)
    cardFormValidator.toggleButtonState()
    closePopup(popupCard)
}

newCardForm.addEventListener('submit', addNewCard)

const openPopupImage = document.querySelector('.popup_type_image')
const closePopupImageButton = openPopupImage.querySelector('.popup__close')
const popupImageFullView = openPopupImage.querySelector('.popup__image-full')
const popupImageTitle = openPopupImage.querySelector('.popup__image-title')

function openImage(link, name) {
    popupImageFullView.src = link
    popupImageTitle.textContent = name
    popupImageFullView.alt = name
    openPopup(openPopupImage)
}

closePopupImageButton.addEventListener('click', function () {
    closePopup(openPopupImage)
})

enablePopupClosing()

initialCards.forEach(function(card) {
    const cardElement = createCard(card)
    addCard(cardElement)
})
