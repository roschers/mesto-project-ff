
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
const createCard = document.querySelector('.profile__add-button'); //кнопка +
const newCard = document.querySelector('.popup_type_new-card'); // попап нового места
const saveButton = newCard.querySelector('.popup__button'); // кнопка Сохранить в попапе
const closeButton = newCard.querySelector('.popup__close'); // кнопка х в попапе

// @todo: Функция создания карточки

function openPopu() {
  newCard.classList.add('popup_is-opened');
}

function closePopup() {
  newCard.classList.remove('popup_is-opened');
}

createCard.addEventListener('click', function(evt) { 
  evt.preventDefault();
  openPopu();
});

saveButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    const name = newCard.querySelector('.popup__input_type_card-name');
    const link = newCard.querySelector('.popup__input_type_url');

    addCard(name.value, link.value);

    name.value = '';
    link.value = '';
    
    closePopup();
  });

// @todo: Функция удаления карточки
closeButton.addEventListener('click', function () {
  newCard.classList.remove('popup_is-opened');
  closePopup();
});

// @todo: Вывести карточки на страницу
function addCard(name, link) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  cardContainer.prepend(cardElement); 

  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.places__item').remove();
  });
};

for (const card of initialCards) {
  addCard(card.name, card.link);
  console.log(initialCards);
};

