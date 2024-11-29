// @todo: Функция удаления карточки

export function deleteCard (cardElement) {
  cardElement.closest('.places__item').remove();
};


export function cardLike(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
};

// @todo: Вывести карточки на страницу
export function createCard(name, link, deleteCard, cardLike, openPopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  // const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardImagePopup = document.querySelector('.popup_type_image');
  const popupcardImageСaption = document.querySelector('.popup__caption');

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
 

  deleteButton.addEventListener('click', ()=> {
    deleteCard(cardElement);
  });

  cardElement.addEventListener('click', function (evt) {
    cardLike(evt);
  }); 

  cardImage.addEventListener('click', (evt)=> {
    evt.preventDefault();
    openPopup(cardImage.src, cardImage.alt);
  });

  return cardElement;
};
