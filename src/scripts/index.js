import '../pages/index.css';
import {initialCards} from './cards.js'
import {closePopup, openPopup, setSubmitButtonState, editProfileHandleForm, openPhotoPopup} from './modal.js';
import {createCard, cardLike, deleteCard} from './card.js';

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
const newCard = document.querySelector('.profile__add-button'); //кнопка +
const popupCard = document.querySelector('.popup_type_new-card'); // попап Нового места
const saveButton = popupCard.querySelector('.popup__button'); // кнопка Сохранить в попапе Новое место
const closeButtonCard = popupCard.querySelector('.popup__close'); // кнопка х в попапе Новое место

const newPlace = document.forms['new-place']; //форма попап Новое место
const placeName = newPlace.elements['place-name']; // Новое место название
const link = newPlace.elements['link']; // Новое место ссылка

const editProfileButton = document.querySelector('.profile__edit-button'); //кнопка изменения профиля
const popupProfile = document.querySelector('.popup_type_edit'); //попап редактирование профиля 

const editProfile = document.forms['edit-profile']; //форма попап Редактирование
const nameProfile = editProfile.elements['name']; // форма Редактирование Имя
const description = editProfile.elements['description']; //форма Редактирование Хобби

const saveButtonProfile = popupProfile.querySelector('.popup__button'); // кнопка Сохранить в попапе Профиль
const closeButtonProfile = popupProfile.querySelector('.popup__close'); // кнопка х в попапе Профиль

const popupImage = document.querySelector('.popup_type_image'); //блок с открытой картинкой
const closeButtonImage = popupImage.querySelector('.popup__close'); //крестик у картинки

//добавить Новое место

//Кнопка +
newCard.addEventListener('click', function(evt) { 
  evt.preventDefault();
  openPopup(popupCard);
});

//проверка на работу формы для создание новой карточки
newPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();

  cardContainer.prepend(createCard(placeName.value, link.value, deleteCard, cardLike, openPhotoPopup));
  newPlace.reset();
  setSubmitButtonState(saveButton, false);

  closePopup(popupCard);
});


// валидность формы карточки
newPlace.addEventListener('input', function (evt) {
  const isValid = placeName.value.length > 0 && link.value.length > 0;
  setSubmitButtonState(saveButton, isValid);
});

//нажатие х для карточки нового места
closeButtonCard.addEventListener('click', function () { 
  newPlace.reset();

  closePopup(popupCard);
}); 

// создание первоначальных карточек
for (const card of initialCards) {
  cardContainer.prepend(createCard(card.name, card.link, deleteCard, cardLike, openPhotoPopup));
};

// редактирование аккаунта 
// Работа кноки с карандашом
editProfileButton.addEventListener('click', function(evt) { 
  evt.preventDefault();

  const currentProfile = document.querySelector('.profile__title').textContent // текущее имя профиля
  const currentProfileDesc = document.querySelector('.profile__description').textContent // текущее описание профиля
  
  nameProfile.value = currentProfile;
  description.value = currentProfileDesc;
  
  openPopup(popupProfile);
});

//Прослушивание на работу формы
editProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();

  editProfileHandleForm(evt); 
  editProfile.reset();
  setSubmitButtonState(saveButtonProfile, false);

  closePopup(popupProfile);
});

// проверка на валидность формы для профиля
editProfile.addEventListener('input', function (evt) {
  const isValid = nameProfile.value.length > 0 && description.value.length > 0;
  setSubmitButtonState(saveButtonProfile, isValid);
});

// нажатие х для формы профиля
closeButtonProfile.addEventListener('click', function () {
  editProfile.reset(); //нужно ли очищать форму профиля ?

  closePopup(popupProfile);
}); 

closeButtonImage.addEventListener('click', function () {
  closePopup(popupImage);
}); 