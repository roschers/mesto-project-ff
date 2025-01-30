import '../pages/index.css';
import { closePopup, openPopup, setSubmitButtonState } from './modal.js';
import { createCard, cardLike, deleteCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  removeCard,
  addLike,
  removeLike,
  updateAvatar
} from './api.js';

// DOM узлы
const cardContainer = document.querySelector('.places__list');
const newCardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const saveButtonCard = popupCard.querySelector('.popup__button');
const closeButtonCard = popupCard.querySelector('.popup__close');
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newPlaceForm.querySelector('.popup__input[name="place-name"]');
const linkInput = newPlaceForm.querySelector('.popup__input[name="link"]');

const editProfileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameProfileInput = editProfileForm.querySelector('.popup__input[name="name"]');
const descriptionInput = editProfileForm.querySelector('.popup__input[name="description"]');
const currentProfileTitle = document.querySelector('.profile__title');
const currentProfileDescription = document.querySelector('.profile__description');
const saveButtonProfile = popupProfile.querySelector('.popup__button');
const closeButtonProfile = popupProfile.querySelector('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
const img = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');


const profileAvatar = document.querySelector('.profile__image');
const avatarForm = document.querySelector('.popup__form[name="update-avatar"]');
const avatarInput = avatarForm.querySelector('.popup__input[name="avatar-link"]');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включаем валидацию для форм редактирования профиля и добавления места
enableValidation(config);

let userId; // Переменная для хранения ID пользователя

// Функция для изменения текста кнопки
function toggleSubmitButton(button, isLoading, defaultText = 'Сохранить') {
  if (!button) {
    console.error('Кнопка не найдена'); // Защита от ошибок
    return;
  }

  if (isLoading) {
    button.textContent = 'Сохранение...'; // Текст во время загрузки
    button.disabled = true; // Делаем кнопку неактивной
  } else {
    button.textContent = defaultText; // Возвращаем исходный текст
    button.disabled = false; // Делаем кнопку активной
  }
}

// Функция для отображения данных пользователя
function renderUserInfo(userData) {
  currentProfileTitle.textContent = userData.name;
  currentProfileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}

// Функция для отображения карточек
function renderCards(cards) {
  cards.forEach(card => {
    const isOwnCard = card.owner._id === userId; // Проверяем, является ли текущий пользователь автором
    const isLiked = card.likes.some(like => like._id === userId); // Проверяем, лайкнул ли текущий пользователь
    cardContainer.append(createCard(
      card.name,
      card.link,
      deleteCard,
      cardLike,
      openPhotoPopup,
      card._id,
      isOwnCard,
      isLiked,
      card.likes.length // Передаем начальное количество лайков
    ));
  });
}

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; // Сохраняем ID пользователя
    renderUserInfo(userData); // Отображаем данные пользователя
    renderCards(cards); // Отображаем карточки
  })
  .catch(err => {
    console.error(err); // Обработка ошибок
  });

// Функция для обработки отправки формы редактирования профиля
function handleEditProfileForm(evt) {
  evt.preventDefault();
  const saveButton = popupProfile.querySelector('.popup__button');
  const newName = nameProfileInput.value;
  const newAbout = descriptionInput.value;

  // Меняем текст кнопки на "Сохранение..."
  toggleSubmitButton(saveButton, true);

  updateUserInfo(newName, newAbout)
    .then(userData => {
      renderUserInfo(userData); // Обновляем данные на странице
      closePopup(popupProfile); // Закрываем попап
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err); // Логируем ошибку
      alert('Не удалось обновить профиль. Попробуйте еще раз.'); // Уведомляем пользователя
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      toggleSubmitButton(saveButton, false);
    });
}

// Обработчик клика по кнопке добавления новой карточки
newCardButton.addEventListener('click', function () {
  openPopup(popupCard);
  clearValidation(newPlaceForm, config); // Очищаем валидацию формы при открытии попапа
});

//нажатие х для картинки
closeButtonImage.addEventListener('click', function () {
  closePopup(popupImage);
}); 

// Функция для открытия попапа с изображением
function openPhotoPopup(image, nameImg) {
  img.src = image;
  img.alt = nameImg;
  caption.textContent = nameImg;
  openPopup(popupImage);
}

//нажатие х для карточки нового места
closeButtonCard.addEventListener('click', function () { 
  newPlaceForm.reset();
  closePopup(popupCard);
}); 

// Обработчик отправки формы создания новой карточки
newPlaceForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const saveButton = popupCard.querySelector('.popup__button');
  const newCardName = placeNameInput.value;
  const newCardLink = linkInput.value;

  // Меняем текст кнопки на "Сохранение..."
  toggleSubmitButton(saveButton, true);

  addNewCard(newCardName, newCardLink)
    .then(cardData => {
      // Создаем новую карточку и добавляем её в DOM
      cardContainer.prepend(createCard(
        cardData.name,
        cardData.link,
        deleteCard,
        cardLike,
        openPhotoPopup,
        cardData._id,
        true, // Новая карточка всегда принадлежит пользователю
        false, // Новая карточка не имеет лайков
        0 // Начальное количество лайков
      ));
      newPlaceForm.reset(); // Очищаем форму
      closePopup(popupCard); // Закрываем попап
    })
    .catch(err => {
      console.error('Ошибка при добавлении карточки:', err); // Логируем ошибку
      alert('Не удалось добавить карточку. Попробуйте еще раз.'); // Уведомляем пользователя
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      toggleSubmitButton(saveButton, false);
    });
});

// Обработчик клика по кнопке редактирования профиля
editProfileButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  nameProfileInput.value = currentProfileTitle.textContent;
  descriptionInput.value = currentProfileDescription.textContent;
  openPopup(popupProfile);
  clearValidation(editProfileForm, config);
});

// Обработчик отправки формы редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileForm);

// Обработчик клика по аватару для изменения
profileAvatar.addEventListener('click', function () {
  openPopup(document.querySelector('.popup_type_avatar'));
  clearValidation(avatarForm, config);
});

// Обработчик отправки формы изменения аватара
avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const saveButton = document.querySelector('.popup_type_avatar .popup__button');
  const avatarLink = avatarInput.value;

  // Меняем текст кнопки на "Сохранение..."
  toggleSubmitButton(saveButton, true);

  updateAvatar(avatarLink)
    .then(userData => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closePopup(document.querySelector('.popup_type_avatar'));
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err); // Логируем ошибку
      alert('Не удалось обновить аватар. Попробуйте еще раз.'); // Уведомляем пользователя
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      toggleSubmitButton(saveButton, false);
    });
});