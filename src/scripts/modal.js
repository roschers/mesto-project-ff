

//функция модального окна 
export function openPopup(popupClass) {
  popupClass.classList.add('popup_is-opened');
}

export function closePopup(popupClass) {
  popupClass.classList.remove('popup_is-opened');
}