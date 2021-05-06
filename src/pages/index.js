import './index.css'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js'
import {PopupConfirm} from "../components/PopupConfirm";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: '33fa314a-a104-4cf7-ae18-cbcbda3402fe',
        'Content-Type': 'application/json'
    }
})

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
    profileOccupationSelector: '.profile__occupation',
    profileAvatarSelector: '.profile__avatar'
})

api.getUserInfo()
    .then(data => {
        userInfo.setData(data)
        userInfo.setUserInfo(data)
        userInfo.setAvatar(data)
    })
    .catch((err) => {
        console.log(err)
    })

const profileFormValidator = new FormValidator(validationConfig, profileForm)
profileFormValidator.enableValidation()

const profilePopupWithForm = new PopupWithForm('.popup_type_profile', (values) => {
    userInfo.setUserInfo(values)
    return api.editUserInfo(values)
        .then(() => {
            profilePopupWithForm.close()
        })
})

profilePopupWithForm.setEventListeners()
showProfilePopupButton.addEventListener('click', (evt) => {
    const profileInfo = userInfo.getUserInfo()
    inputProfileName.value = profileInfo.name
    inputProfileOccupation.value = profileInfo.about
    profileFormValidator.toggleButtonState()
    profilePopupWithForm.open()
})

showProfilePopupButton.addEventListener('click', profilePopupWithForm.open)

const popupCard = document.querySelector('.popup_type_card')
const addCardButton = document.querySelector('#add-card')
const newCardForm = popupCard.querySelector('.popup__form')

const popupWithImage = new PopupWithImage('.popup_type_image')
popupWithImage.setEventListeners()

const popupConfirm = new PopupConfirm('.popup_type_delete')
popupConfirm.setEventListeners()

const section = new Section(
    (item) => {
        section.addItem(createCard(item))
    }, '.cards')

api.getInitialCards()
    .then(cards => {
        section.setItems(cards)
        section.render()
    })
    .catch((err) => {
        console.log(err)
    });

const cardFormValidator = new FormValidator(validationConfig, newCardForm)
cardFormValidator.enableValidation()

const cardPopupWithForm = new PopupWithForm('.popup_type_card', (values) => {
    const cardData = {
        name: values.title,
        link: values.link
    }

    return api.addCard(cardData)
        .then(data => {
            const cardElement = createCard(data)
            section.addItem(cardElement)
            cardPopupWithForm.close()
            cardFormValidator.toggleButtonState()
        })
})

cardPopupWithForm.setEventListeners()
addCardButton.addEventListener('click', cardPopupWithForm.open)

function createCard(cardData) {
    const card = new Card(
        {
            card: cardData,
            handleTrashClick: () => {
                popupConfirm.open(() => {
                    api.deleteCard(cardData._id)
                        .then(res => {
                            card.getElementTrash().closest('.element').remove()
                        })
                })
            },
            handleLikeClick: () => {
                if (card.getElementLike().classList.contains('element__like_active')) {
                    card.setLikeAmount(card.getLikeAmount() - 1)
                    api.deleteLikeCard(cardData._id)
                        .then(res => {
                            card.setCard(res)
                        })
                } else {
                    card.setLikeAmount(card.getLikeAmount() + 1)
                    api.likeCard(cardData._id)
                        .then(res => {
                            card.setCard(res)
                        })
                }

                card.getElementLike().classList.toggle('element__like_active')
            },
            handleCardClick: popupWithImage.open,
        },
        '#card', userInfo.getId())
    return card.getElement()
}

const popupAvatar = document.querySelector('.popup_type_avatar')
const updateAvatarForm = popupAvatar.querySelector('.popup__form')
const updateAvatarValidator = new FormValidator(validationConfig, updateAvatarForm)
updateAvatarValidator.enableValidation()

const updateAvatarButton = document.querySelector('.profile__avatar-edit')
const updateAvatarPopup = new PopupWithForm('.popup_type_avatar', (values) => {
    return api.editAvatar(values)
        .then(data => {
            userInfo.setData(data)
            updateAvatarPopup.close()
            updateAvatarValidator.toggleButtonState()
        })
})

updateAvatarPopup.setEventListeners()
updateAvatarButton.addEventListener('click', updateAvatarPopup.open)