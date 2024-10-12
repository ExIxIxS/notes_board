import appStorage from "../services/appStorage.service.js";
import { checkFormForValidData, checkNoteEditorForValidData, isFormValid } from "./formValidation.js";

import { BG_NOTE_COLORS } from "../constants/appData.constants.js";

function makeNoteCreatorInteractive(elementsGetter, form, noteListComponent) {
  const noteTitleInput = elementsGetter('#note-title-input');
  noteTitleInput.addEventListener('input', () => makeElementValid(noteTitleInput));

  const noteDescriptionInput = elementsGetter('#note-description-input');
  noteDescriptionInput.addEventListener('input', () => makeElementValid(noteDescriptionInput));

  BG_NOTE_COLORS.forEach((_, index) => {
    const bgColorRadioInput = elementsGetter(`#bg-color-option-${index + 1}`);
    bgColorRadioInput.addEventListener('input', () => makeElementValid(bgColorRadioInput.parentElement.parentElement));
  });

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

function submitNoteEditorForm(noteComponent, titleInput, descriptionInput) {
  const noteEditorFormData = getNoteEditorFormData(titleInput, descriptionInput);

  noteComponent.updateNoteState(noteEditorFormData, true);
  noteComponent.endNoteEditing();
}

function handleNoteEditorSubmitClick(noteComponent, form, titleInput, descriptionInput) {
  checkNoteEditorForValidData(titleInput, descriptionInput);
  const validInputsAmount = 2;

  if (isFormValid(form, validInputsAmount)) {
    submitNoteEditorForm(noteComponent, titleInput, descriptionInput);
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

function getNoteEditorFormData(noteTitleInput, noteDescriptionInput) {
  return {
    noteTitle: noteTitleInput.value,
    noteDescription: noteDescriptionInput.value,
  };
}

export {
  makeNoteCreatorInteractive,
  makeElementValid,
  makeElementInvalid,
  handleNoteEditorSubmitClick,
};
