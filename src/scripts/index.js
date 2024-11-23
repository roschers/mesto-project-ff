import '../pages/index.css';
import {initialCards} from './cards.js'
import {closePopup, openPopup} from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
const newCard = document.querySelector('.profile__add-button'); //кнопка +
const popupCard = document.querySelector('.popup_type_new-card'); // попап Нового места
const saveButton = popupCard.querySelector('.popup__button'); // кнопка Сохранить в попапе Новое место
const closeButtonCard = popupCard.querySelector('.popup__close'); // кнопка х в попапе Новое место
const popupForm = popupCard.querySelector('.popup__form');
const editProfile = document.querySelector('.profile__edit-button'); //кнопка изменения профиля
const popupProfile = document.querySelector('.popup_type_edit'); //попап редактирование профиля 
const saveButtonProfile = popupProfile.querySelector('.popup__button'); // кнопка Сохранить в попапе Профиль
const closeButtonProfile = popupProfile.querySelector('.popup__close'); // кнопка х в попапе Профиль
const popupFormProfile = popupProfile.querySelector('.popup__form');


// @todo: Функция создания карточки

newCard.addEventListener('click', function(evt) { 
  evt.preventDefault();
  openPopup(popupCard);
});

saveButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    let name = popupCard.querySelector('.popup__input_type_card-name');
    let link = popupCard.querySelector('.popup__input_type_url');

    name = name.value;
    link = link.value;
    const newCardData = {name, link}

    createCard(newCardData, deleteCard);
    
    popupForm.reset();
    
    closePopup(popupCard);
  });

  closeButtonCard.addEventListener('click', function () {
    popupCard.classList.remove('popup_is-opened');
    popupForm.reset();
    closePopup(popupCard);
  });
  
// @todo: Функция удаления карточки

function deleteCard (cardElement) {
  cardElement.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardContainer.prepend(cardElement); 

  deleteButton.addEventListener('click', ()=> {
    deleteCard (cardElement);
  });

  return cardElement;
};

// function addCard()  

for (const card of initialCards) {
  createCard(card, deleteCard);
  console.log(initialCards);
};

// редактирование аккаунта 
editProfile.addEventListener('click', function(evt) { 
  evt.preventDefault();
  openPopup(popupProfile);
});

saveButtonProfile.addEventListener('click', function (evt) {
  evt.preventDefault();

  let name = popupProfile.querySelector('.popup__input_type_name');
  let description = popupProfile.querySelector('.popup__input_type_description');

  name = name.value;
  description = description.value;
  const newCardData = {name, description}

  createCard(newCardData, deleteCard);
  
  popupFormProfile.reset();
  
  closePopup(popupProfile);
});

closeButtonProfile.addEventListener('click', function () {
  popupProfile.classList.remove('popup_is-opened');
  popupFormProfile.reset();
  closePopup(popupProfile);
});