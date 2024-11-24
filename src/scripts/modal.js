const editProfile = document.forms['edit-profile']; //форма попап Редактирование
const name = editProfile.elements['name']; // форма Редактирование Имя
const description = editProfile.elements['description']; //форма Редактирование Хобби

const currentProfile = document.querySelector('.profile__title'); // текущее имя профиля
const currentProfileDesc = document.querySelector('.profile__description'); // текущее описание профиля

export function openPopup(popupClass) {
  popupClass.classList.add('popup_is-opened');

  document.addEventListener('keydown', function keyHandler(e) {
    if (e.key === 'Escape') {
      closePopup(popupClass)
    }
  });

  popupClass.addEventListener('click', function closePopupOverlay(evt) {
    if (evt.target === popupClass) {
      closePopup(popupClass);
    }
  });
}

//функция закрыть окно
export function closePopup(popupClass) {
  popupClass.classList.remove('popup_is-opened');
  
  document.removeEventListener('keydown', function keyHandler(e) {
    if (e.key === 'Escape') {
      closePopup(popupClass)
    }
  });
  
  popupClass.removeEventListener('click', function closePopupOverlay(evt) {
    if (evt.target === popupClass) {
      closePopup(popup);
    }
  });
}

//функция закрытия окна Enter

//неактивная кнопка
export function setSubmitButtonState(saveButton, isFormValid) { 
  if (isFormValid) {
    saveButton.removeAttribute('disabled');
  } else {
    saveButton.setAttribute('disabled', true);
  }
}


export function handleFormSubmit(evt) {
  evt.preventDefault(); 
  
  currentProfile.textContent = name.value;
  currentProfileDesc.textContent = description.value;
 
};

export function photoPopup(popupClass, image, name) {
  const img = popupClass.querySelector('.popup__image');
  const popupcardImageСaption = document.querySelector('.popup__caption');
  img.src = image;
  popupcardImageСaption.innerHTML = name;
  openPopup(popupClass);
};
