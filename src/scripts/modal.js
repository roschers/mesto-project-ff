function keyHandler(e) {
  if (e.key === 'Escape') { 
    closePopup(document.querySelector('.popup_is-opened')); 
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