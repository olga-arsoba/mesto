const showProfilePopupButton = document.querySelector('#edit-profile');
const popupProfile = document.querySelector('.popup_type_profile');
const closeProfilePopupButton = popupProfile.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileOccupation = document.querySelector('.popup__input_type_occupation');
const profileForm = popupProfile.querySelector('.popup__form');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);

function openPopup(popup) {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    }, {once: true});
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openProfilePopup() {
    inputProfileName.value = profileName.textContent;
    inputProfileOccupation.value = profileOccupation.textContent;
    toggleButtonCheck(profileForm, validationConfig);
    openPopup(popupProfile);
}

showProfilePopupButton.addEventListener('click', openProfilePopup);
closeProfilePopupButton.addEventListener('click', function () {
    closePopup(popupProfile);
});

function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileOccupation.textContent = inputProfileOccupation.value;
    closePopup(popupProfile);
}

profileForm.addEventListener('submit', saveProfile);

const enablePopupClosing = () => {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach(popup => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                closePopup(popup);
            }
        });
    });
};

enablePopupClosing();

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const popupCard = document.querySelector('.popup_type_card');
const addCardButton = document.querySelector('#add-card');
const closePopupCardButton = popupCard.querySelector('.popup__close');
const inputCardTitle = document.querySelector('.popup__input_type_title');
const inputCardLink = document.querySelector('.popup__input_type_link');
const newCardForm = popupCard.querySelector('.popup__form');

addCardButton.addEventListener('click', function () {
    openPopup(popupCard);
});

closePopupCardButton.addEventListener('click', function () {
    closePopup(popupCard);
});

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardElementItem = cardElement.querySelector('.element__item');
    cardElement.querySelector('.element__title').textContent = cardData.name;
    cardElementItem.src = cardData.link;
    cardElementItem.alt = cardData.name;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
        const listItem = evt.target.closest('.element');
        listItem.remove();
    });
    cardElementItem.addEventListener('click', function () {
        openImage(cardData.link, cardData.name);
    });

    return cardElement;
}

function addCard(cardElement) {
    cards.prepend(cardElement);
    newCardForm.reset();
}

initialCards.forEach(function(card) {
    const cardElement = createCard(card);
    addCard(cardElement);
});

function addNewCard(evt) {
    evt.preventDefault();
    const cardData = {
        name: inputCardTitle.value,
        link: inputCardLink.value
    };
    const cardElement = createCard(cardData);
    addCard(cardElement);
    toggleButtonCheck(evt.target, validationConfig);
    closePopup(popupCard);
}

newCardForm.addEventListener('submit', addNewCard);

const openPopupImage = document.querySelector('.popup_type_image');
const closePopupImageButton = openPopupImage.querySelector('.popup__close');
const popupImageFullView = openPopupImage.querySelector('.popup__image-full');
const popupImageTitle = openPopupImage.querySelector('.popup__image-title');

function openImage(link, name) {
    popupImageFullView.src = link;
    popupImageTitle.textContent = name;
    popupImageFullView.alt = name;
    openPopup(openPopupImage);
}

closePopupImageButton.addEventListener('click', function () {
    closePopup(openPopupImage);
});
