import { NOTE_TITLE_REQUIREMENT } from "../../constants/formValidation.constants.js";
import BasicComponent from "../basicComponent/index.js";
import BasicInput from "../basicInput/index.js";

function getFormTitleComponent() {
  const formTitleOptions = {
    elementType: 'h2',
    basicClassNames: ['note-form-title'],
    innerHTML: 'Please fill the note options:'
  };

  return new BasicComponent(formTitleOptions);
}

function getTitleInputComponent() {
  const titleInputOptions = {
    inputType: 'text',
    id: 'note-title',
    label: 'Title:',
    placeholder: 'enter a note title',
    requered: true,
    autofocus: true,
    minLength: NOTE_TITLE_REQUIREMENT.MIN_LENGTH,
    maxLength: NOTE_TITLE_REQUIREMENT.MAX_LENGTH,
  };

  return new BasicInput(titleInputOptions);
}

function getSubmitButtonComponent() {
  const buttonOptions = {
    id: 'create-note-submit-button',
    basicClassNames: ['form-submit-button'],
    innerHTML: 'Confirm'
  }

  const button = new BasicComponent(buttonOptions);
  button.type = 'submit';
  button.title = 'Please check and fill required fields';

  return button;
}

export {
  getFormTitleComponent,
  getTitleInputComponent,
  getSubmitButtonComponent,
};
