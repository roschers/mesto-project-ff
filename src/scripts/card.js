import {addLike, removeLike} from './api.js'
// Функция для создания карточки
export const createCard = (name, link, handleDelete, handleLike, handleImageClick, cardId, isOwnCard, isLiked, likesCount) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  // Установка начальных значений
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Устанавливаем начальное количество лайков
  likeCounter.textContent = likesCount;

  // Проверяем, лайкнута ли карточка текущим пользователем
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active'); // Добавляем класс активности
  }

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (!isOwnCard) {
    deleteButton.remove(); // Удаляем кнопку удаления, если карточка не принадлежит пользователю
  }

  // Обработчик клика по изображению
  cardImage.addEventListener('click', () => handleImageClick(link, name));

  // Обработчик лайка
  likeButton.addEventListener('click', () => {
    handleLike(cardId, likeButton, likeCounter);
  });

  // Обработчик удаления карточки
  if (isOwnCard) {
    deleteButton.addEventListener('click', () => {
      handleDelete(cardElement, cardId);
    });
  }

  return cardElement;
};

// Функция для обработки лайков
export const cardLike = (cardId, likeButton, likeCounter) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    removeLike(cardId)
      .then(updatedCard => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
      })
      .catch(err => {
        console.error(err); // Обработка ошибок
      });
  } else {
    addLike(cardId)
      .then(updatedCard => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
      })
      .catch(err => {
        console.error(err); // Обработка ошибок
      });
  }
};

// Функция для удаления карточки
export const deleteCard = (cardElement, cardId) => {
  removeCard(cardId)
    .then(() => {
      cardElement.remove(); // Удаляем карточку из DOM
    })
    .catch(err => {
      console.error(err); // Обработка ошибок
    });
};