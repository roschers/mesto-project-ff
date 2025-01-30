import { checkResponse } from './utils/check.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
    headers: {
      authorization: 'fb63e46f-40cc-49e2-b30a-76d96479150a',
      'Content-Type': 'application/json'
    }
  };
  
  // Функция для получения данных пользователя
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Функция для получения карточек
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Функция для обновления данных пользователя
  export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(checkResponse);
  };
  
  // Функция для добавления новой карточки
  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(checkResponse);
  };
  
  // Функция для удаления карточки
  export const removeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Функция для постановки лайка
  export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Функция для снятия лайка
  export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Функция для обновления аватара
  export const updateAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(checkResponse);
  };