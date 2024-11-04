
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
const newCard = document.querySelector('.profile__add-button'); //кнопка +
const popupCard = document.querySelector('.popup_type_new-card'); // попап нового места
const saveButton = popupCard.querySelector('.popup__button'); // кнопка Сохранить в попапе
const closeButton = popupCard.querySelector('.popup__close'); // кнопка х в попапе
const popupForm = popupCard.querySelector('.popup__form');

// @todo: Функция создания карточки

function openPopup() {
  popupCard.classList.add('popup_is-opened');
}

function closePopup() {
  popupCard.classList.remove('popup_is-opened');
}

newCard.addEventListener('click', function(evt) { 
  evt.preventDefault();
  openPopup();
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
    
    closePopup();
  });

// @todo: Функция удаления карточки
closeButton.addEventListener('click', function () {
  popupCard.classList.remove('popup_is-opened');
  popupForm.reset();
  closePopup();
});

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

