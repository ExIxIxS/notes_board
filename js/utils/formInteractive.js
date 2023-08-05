import appStorage from "../services/appStorage.service.js";
import { checkFormForValidData, isFormValid } from "./formValidation.js";

function makeNoteCreatorInteractive(elementsGetter, form, noteListComponent) {
  const noteTitleInput = elementsGetter('#note-title-input');
  noteTitleInput.addEventListener('input', () => makeElementValid(noteTitleInput));

  const noteDescriptionInput = elementsGetter('#note-description-input');
  noteDescriptionInput.addEventListener('input', () => makeElementValid(noteDescriptionInput));

  const bgColorRadioInput_1 = elementsGetter('#bg-color-option-1');
  bgColorRadioInput_1.addEventListener('input', () => makeElementValid(bgColorRadioInput_1.parentElement.parentElement));

  const bgColorRadioInput_2 = elementsGetter('#bg-color-option-2');
  bgColorRadioInput_2.addEventListener('input', () => makeElementValid(bgColorRadioInput_2.parentElement.parentElement));

  const submitButton = elementsGetter('#create-note-submit-button');
  submitButton.addEventListener('click', () => handleSubmitClick(elementsGetter,form, noteListComponent));

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', (event) => event.preventDefault());
}

function submitForm(elementsGetter, noteListComponent) {
  const noteFormData = getNoteFormData(elementsGetter);

  clearNoteFormInputs(elementsGetter);
  const storageNote = appStorage.createStorageNote(noteFormData)
  appStorage.addNote(storageNote);
  noteListComponent.addNoteToList(storageNote);
}

function handleSubmitClick(elementsGetter, form, noteListComponent) {
  checkFormForValidData(elementsGetter);
  const validInputsNumber = 3;

  if (isFormValid(form, validInputsNumber )) {
    submitForm(elementsGetter, noteListComponent);
  }
}

function makeElementInvalid(element) {
  if (!element.classList.contains('invalid')) {
    element.classList.remove('valid');
    element.classList.add('invalid');
  }
}

function makeElementValid(element) {
  element.classList.add('valid');
  if (element.classList.contains('invalid')) {
    element.classList.remove('invalid');
  }
}

function getNoteFormData(elementsGetter) {
  const noteFormData = {};
  noteFormData.noteTitle = elementsGetter('#note-title-input').value;
  noteFormData.noteDescription = elementsGetter('#note-description-input').value;
  const radioInputs = elementsGetter('#color-fieldset').querySelectorAll('input');

  for (let input of radioInputs) {
    if (input.checked === true) {
      noteFormData.bgColor = input.value;
    }
  }

  return noteFormData;
}

function clearNoteFormInputs(elementsGetter) {
  elementsGetter('#note-title-input').value = '';
  elementsGetter('#note-description-input').value = '';
  const radioInputs = elementsGetter('#color-fieldset').querySelectorAll('input');

  for (let input of radioInputs) {
    input.checked === false;
  }

  elementsGetter('#bg-color-option-1').checked = true;
}

export {
  makeNoteCreatorInteractive,
  makeElementValid,
  makeElementInvalid,
};
