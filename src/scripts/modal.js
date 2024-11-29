const editProfile = document.forms['edit-profile']; //форма попап Редактирование
const nameProfile = editProfile.elements['name']; // форма Редактирование Имя
const description = editProfile.elements['description']; //форма Редактирование Хобби

const currentProfile = document.querySelector('.profile__title'); // текущее имя профиля
const currentProfileDesc = document.querySelector('.profile__description'); // текущее описание профиля


function keyHandler(e) {
  if (e.key === 'Escape') { 
    console.log(document.querySelector('.popup_type_new-card'));
     closePopup(document.querySelector('.popup_type_new-card')) 
   }
}

function closePopupOverlay(evt) { 
  if (evt.target === evt.currentTarget) { 
    closePopup(evt.currentTarget); 
  } 
}

export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
  popupElement.addEventListener('click', closePopupOverlay);
}

//функция закрыть окно
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandler);
  popupElement.removeEventListener('click', closePopupOverlay);
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


export function editProfileHandleForm(evt) {
  evt.preventDefault(); 
  
  currentProfile.textContent = nameProfile.value;
  currentProfileDesc.textContent = description.value;
 
};

export function openPhotoPopup(image, nameImg) {
  const popupElement = document.querySelector('.popup_type_image');
  const img = popupElement.querySelector('.popup__image');
  const popupcardImageСaption = popupElement.querySelector('.popup__caption');

  img.src = image;
  img.alt = nameImg;
  popupcardImageСaption.textContent = nameImg;

  openPopup(popupElement);
};
