import '../pages/index.css'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {Section} from './Section.js'
import {PopupWithForm} from './PopupWithForm.js'
import {PopupWithImage} from './PopupWithImage.js'
import {UserInfo} from './UserInfo.js'
import {initialCards} from './initial-сards.js'

const showProfilePopupButton = document.querySelector('#edit-profile')
const popupProfile = document.querySelector('.popup_type_profile')
const profileForm = popupProfile.querySelector('.popup__form')
const inputProfileName = document.querySelector('.popup__input_type_name')
const inputProfileOccupation = document.querySelector('.popup__input_type_occupation')
const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileOccupationSelector: '.profile__occupation'
})

const profileFormValidator = new FormValidator(validationConfig, profileForm)
profileFormValidator.enableValidation()

const profilePopupWithForm = new PopupWithForm('.popup_type_profile', (evt) => {
    evt.preventDefault()
    const inputValues = profilePopupWithForm._getInputValues()
    userInfo.setUserInfo(inputValues)
    profilePopupWithForm.close()
})
profilePopupWithForm.setEventListeners()
showProfilePopupButton.addEventListener('click', (evt) => {
    const profileInfo = userInfo.getUserInfo()
    inputProfileName.value = profileInfo.name
    inputProfileOccupation.value = profileInfo.occupation
    profileFormValidator.toggleButtonState()
    profilePopupWithForm.open()
})

showProfilePopupButton.addEventListener('click', profilePopupWithForm.open)

const popupCard = document.querySelector('.popup_type_card')
const addCardButton = document.querySelector('#add-card')
const newCardForm = popupCard.querySelector('.popup__form')

const popupWithImage = new PopupWithImage('.popup_type_image')
popupWithImage.setEventListeners()

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        section.addItem(createCard(item))
    }
}, '.cards')

section.render()

const cardFormValidator = new FormValidator(validationConfig, newCardForm)
cardFormValidator.enableValidation()

const cardPopupWithForm = new PopupWithForm('.popup_type_card', (evt) => {
    evt.preventDefault()
    const inputValues = cardPopupWithForm._getInputValues()
    const cardData = {
        name: inputValues.title,
        link: inputValues.link
    }
    const cardElement = createCard(cardData)
    section.addItem(cardElement)
    cardFormValidator.toggleButtonState()
    cardPopupWithForm.close()
})
cardPopupWithForm.setEventListeners()
addCardButton.addEventListener('click', cardPopupWithForm.open)

function createCard(cardData) {
    const card = new Card(cardData.name, cardData.link, '#card', popupWithImage.open)
    return card.getElement()
}