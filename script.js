let showPopupButton = document.querySelector('#edit-profile');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let inpupProfileName = document.querySelector('.popup__input-name');
let inputProfileOccupation = document.querySelector('.popup__input-occupation');
let profileForm = document.querySelector('.popup__form');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

showPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

function setInputsValue() {
    inpupProfileName.value = profileName.textContent;
    inputProfileOccupation.value = profileOccupation.textContent;
}

showPopupButton.addEventListener('click', setInputsValue);

function saveProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inpupProfileName.value;
    profileOccupation.textContent = inputProfileOccupation.value;
}

profileForm.addEventListener('submit', saveProfile);
profileForm.addEventListener('submit', togglePopup);