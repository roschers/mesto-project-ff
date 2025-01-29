export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      if (!formElement) {
        console.error(`Форма с селектором ${config.formSelector} не найдена.`);
        return;
      }
  
      const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
      const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
      if (!buttonElement) {
        console.error(`Кнопка с селектором ${config.submitButtonSelector} не найдена.`);
        return;
      }
  
      toggleSubmitButtonState(buttonElement, hasValidInputs(inputList), config);
  
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, config);
          toggleSubmitButtonState(buttonElement, hasValidInputs(inputList), config);
        });
      });
  
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    });
  }
  
  function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (!errorElement) {
      console.error(`Элемент ошибки с селектором .${inputElement.name}-error не найден`);
      return;
    }
    const errorMessage = inputElement.dataset.errorMessage || 'Ошибка валидации';
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
  
  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (!errorElement) {
      console.error(`Элемент ошибки с селектором .${inputElement.name}-error не найден`);
      return;
    }
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
  
  function checkInputValidity(formElement, inputElement, config) {
    const value = inputElement.value.trim();
  
    const isProfileName = inputElement.name === 'name';
    const isProfileAbout = inputElement.name === 'description';
    const isPlaceName = inputElement.name === 'place-name';
    const isPlaceLink = inputElement.name === 'link';
    const isAvatarLink = inputElement.name === 'avatar-link';
  
    let minLength, maxLength, errorMessage;
  
    if (isProfileName) {
      minLength = 2;
      maxLength = 40;
      errorMessage = 'Должно быть от 2 до 40 символов.';
    } else if (isProfileAbout) {
      minLength = 2;
      maxLength = 200;
      errorMessage = 'Должно быть от 2 до 200 символов.';
    } else if (isPlaceName) {
      minLength = 2;
      maxLength = 30;
      errorMessage = 'Должно быть от 2 до 30 символов.';
    }
  
    if (value === '') {
      showInputError(formElement, inputElement, config);
    } else if ((isProfileName || isProfileAbout || isPlaceName) && (!/^[a-zA-Zа-яА-Я-\s]+$/.test(value) || value.length < minLength || value.length > maxLength)) {
      if (!/^[a-zA-Zа-яА-Я-\s]+$/.test(value)) {
        inputElement.dataset.errorMessage = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
        showInputError(formElement, inputElement, config);
      } else {
        inputElement.dataset.errorMessage = errorMessage;
        showInputError(formElement, inputElement, config);
      }
    } else if ((isPlaceLink || isAvatarLink) && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
      inputElement.dataset.errorMessage = 'Здесь должна быть ссылка';
      showInputError(formElement, inputElement, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  function hasValidInputs(inputList) {
    return inputList.every((inputElement) => inputElement.validity.valid && inputElement.value.trim() !== '');
  }
  
  export function clearValidation(formElement, config) {
    if (!formElement) {
      console.error('Форма не найдена.');
      return;
    }
  
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    });
  
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    if (buttonElement) {
      toggleSubmitButtonState(buttonElement, true, config);
    }
  }
  
  function toggleSubmitButtonState(buttonElement, isValid, config) {
    if (isValid) {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(config.inactiveButtonClass);
    }
  }