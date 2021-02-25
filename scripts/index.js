let showPopupButton = document.querySelector('#edit-profile');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let inpupProfileName = document.querySelector('.popup__input_name');
let inputProfileOccupation = document.querySelector('.popup__input_occupation');
let profileForm = document.querySelector('.popup__form');

function openPopup() {
    inpupProfileName.value = profileName.textContent;
    inputProfileOccupation.value = profileOccupation.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

showPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function saveProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inpupProfileName.value;
    profileOccupation.textContent = inputProfileOccupation.value;
    closePopup();
}

profileForm.addEventListener('submit', saveProfile);