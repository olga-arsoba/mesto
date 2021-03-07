const showPopupButton = document.querySelector('#edit-profile');
const popupProfile = document.querySelector('.popup_type_profile');
const closeProfilePopupButton = popupProfile.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const inpupProfileName = document.querySelector('.popup__input_type_name');
const inputProfileOccupation = document.querySelector('.popup__input_type_occupation');
const profileForm = popupProfile.querySelector('.popup__form');

function openPopup() {
    inpupProfileName.value = profileName.textContent;
    inputProfileOccupation.value = profileOccupation.textContent;
    popupProfile.classList.add('popup_opened');
}

function closePopup() {
    popupProfile.classList.remove('popup_opened');
}

showPopupButton.addEventListener('click', openPopup);
closeProfilePopupButton.addEventListener('click', closePopup);

function saveProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inpupProfileName.value;
    profileOccupation.textContent = inputProfileOccupation.value;
    closePopup();
}

profileForm.addEventListener('submit', saveProfile);

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const popupCard = document.querySelector('.popup_type_card');
const addCardButton = document.querySelector('#add-card');
const closePopupCardButton = popupCard.querySelector('.popup__close');
const inpupCardTitle = document.querySelector('.popup__input_type_title');
const inputCardLink = document.querySelector('.popup__input_type_link');
const newCardForm = popupCard.querySelector('.popup__form');

function openNewCardPopup(){
    inpupCardTitle.value = '';
    inputCardLink.value = '';
    popupCard.classList.add('popup_opened');
}

function closeNewCardPopup() {
    popupCard.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', openNewCardPopup);
closePopupCardButton.addEventListener('click', closeNewCardPopup);

const initialCards = [
    {
        name: 'Мраморный каньон',
        link: 'https://images.unsplash.com/photo-1598535348425-e76a7cc312d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
    },
    {
        name: 'Озеро Байкал',
        link: 'https://images.unsplash.com/photo-1610984660607-90b67b18e2c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
    },
    {
        name: 'Агурские водопады',
        link: 'https://images.unsplash.com/photo-1611976431475-3d7b40d3c422?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
    },
    {
        name: 'Домбай-Ульген',
        link: 'https://images.unsplash.com/photo-1595854777457-f70e8c737018?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
    },
    {
        name: 'Эльбрус',
        link: 'https://images.unsplash.com/photo-1603736115415-fd1f3473291f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
    },
    {
        name: 'Авачинская бухта',
        link: 'https://images.unsplash.com/photo-1591530639235-fd4a499d7779?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
    }
];

function addCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__item').src = link;
    cardElement.querySelector('.element__item').alt = name;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
        const listItem = evt.target.closest('.element');
        listItem.remove();
    });
    cardElement.querySelector('.element__item').addEventListener('click', function (evt) {
        const listItem = evt.target.closest('.element');
        const link = listItem.querySelector('.element__item').src;
        const name = listItem.querySelector('.element__title').textContent;
        openImage(link, name);
    });
    cards.prepend(cardElement);
}

initialCards.forEach(function(card) {
    addCard(card.name, card.link);
});

function addNewCard(evt) {
    evt.preventDefault();
    addCard(inpupCardTitle.value, inputCardLink.value);
    closeNewCardPopup();
}

newCardForm.addEventListener('submit', addNewCard);

const openPopupImage = document.querySelector('.popup_type_image');
const showPopupImage = document.querySelector('.popup__image');
const closePopupImageButton = openPopupImage.querySelector('.popup__close');

function openImage(link, name) {
    openPopupImage.querySelector('.popup__image-full').src = link;
    openPopupImage.querySelector('.popup__image-title').textContent = name;
    openPopupImage.querySelector('.popup__image-full').alt = name;
    openPopupImage.classList.add('popup_opened');
}

function closeImage() {
    openPopupImage.classList.remove('popup_opened');
}

closePopupImageButton.addEventListener('click', closeImage);
