import { makeElementInvalid, makeElementValid } from "./formInteractive.js";

import { NOTE_DESCRIPTION_REQUIREMENT, NOTE_TITLE_REQUIREMENT } from "../constants/formValidation.constants.js";

function checkTitleField(inputElement) {
  const title = inputElement.value;
  const trimmedString = title.trim();

  if (trimmedString.length
    && title.length >= NOTE_TITLE_REQUIREMENT.MIN_LENGTH
    && title.length <= NOTE_TITLE_REQUIREMENT.MAX_LENGTH) {
      makeElementValid(inputElement);
  } else {
      makeElementInvalid(inputElement);
  }

}

function checkDescriptionField(inputElement) {
  const description = inputElement.value;
  const trimmedString = description.trim();

  if (trimmedString.length
    && description.length >= NOTE_DESCRIPTION_REQUIREMENT.MIN_LENGTH
    && description.length <= NOTE_DESCRIPTION_REQUIREMENT.MAX_LENGTH) {

    makeElementValid(inputElement);
  } else {
    makeElementInvalid(inputElement);
  }

}

function checkColorFieldset(fieldsetElement) {
  const inputsCollection = fieldsetElement.querySelectorAll('input');

  for (let input of inputsCollection) {
    if (input.checked) {
      makeElementValid(fieldsetElement);
      return;
    }
  }

  makeElementInvalid(fieldsetElement);
}

function checkFormForValidData(elementsGetter) {
  const noteTitleInput = elementsGetter('#note-title-input');
  checkTitleField(noteTitleInput);

  const noteDescriptionInput = elementsGetter('#note-description-input');
  checkDescriptionField(noteDescriptionInput);

  const colorFieldset = elementsGetter('#color-fieldset');
  checkColorFieldset(colorFieldset);
}

function isFormValid(formElement, requiredValidInputsAmount) {
  const validCollection = formElement.querySelectorAll('.valid');

  return (validCollection.length === requiredValidInputsAmount);
}

function checkNoteEditorForValidData(noteTitleInput, noteDescriptionInput) {
  checkTitleField(noteTitleInput);
  checkDescriptionField(noteDescriptionInput);
}

export {
  checkTitleField,
  checkDescriptionField,
  checkFormForValidData,
  isFormValid,
  checkColorFieldset,
  checkNoteEditorForValidData,
}