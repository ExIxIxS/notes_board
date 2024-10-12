import BasicComponent from "../components/basicComponents/basicComponent/index.js";
import BasicInput from "../components/basicComponents/basicInput/index.js";
import Fieldset from "../components/basicComponents/fieldset/index.js";

import { isNonEmptyString } from "./componentFunctions.js";

import { NOTE_DESCRIPTION_REQUIREMENT, NOTE_TITLE_REQUIREMENT } from "../constants/formValidation.constants.js";
import { BG_NOTE_COLORS } from "../constants/appData.constants.js";

function getNoteFormChildren() {
  return [
    getFormTitleComponent('Create a new note'),
    getTextFieldsetComponent(),
    getColorFieldsetComponent(),
    getSubmitButtonComponent('create-note-submit-button'),
  ]
}

function getNoteEditorFormComponent(titleValue, descriptionValue) {
  const formTitle = getFormTitleComponent('Edit note');
  const textFieldsetComponent =  getTextFieldsetComponent(titleValue, descriptionValue, false);
  const submitButtonComponent = getSubmitButtonComponent();
  const formComponent = new BasicComponent({
    elementType: 'form',
    basicClassNames: ['note__editor-form'],
    children: [formTitle, textFieldsetComponent, submitButtonComponent],
  });

  formComponent._element.method = 'post';

  return formComponent;
}

function getFormTitleComponent(title) {
  const formTitleOptions = {
    elementType: 'h2',
    basicClassNames: ['note-form-title'],
    innerHTML: isNonEmptyString(title) ? title : 'Please fill the form:'
  };

  return new BasicComponent(formTitleOptions);
}

function getTextFieldsetComponent(titleValue, descriptionValue, isLabels = true) {
  const componentOptions = {
    basicClassNames: ['text-data'],
    children: [getTitleInputComponent(titleValue, isLabels), getDescriptionInputComponent(descriptionValue, isLabels)],
  };

  return new Fieldset(componentOptions);
}

function getTitleInputComponent(value, islabel = true) {
  const titleInputOptions = {
    id: islabel ? 'note-title-input' : '',
    basicClassNames: ['note-title-input'],
    inputType: 'text',
    label: islabel ? 'Title:' : '',
    value: isNonEmptyString(value) ? value : '',
    placeholder: 'enter a note title',
    requered: true,
    autofocus: true,
    minLength: NOTE_TITLE_REQUIREMENT.MIN_LENGTH,
    maxLength: NOTE_TITLE_REQUIREMENT.MAX_LENGTH,
  };

  return new BasicInput(titleInputOptions);
}

function getDescriptionInputComponent(value, islabel = true) {
  const descriptionInputOptions = {
    id: islabel ? 'note-description-input': '',
    basicClassNames: ['note-description-input'],
    isTextarea: true,
    inputType: 'text',
    label: islabel ? 'Description:' : '',
    value: isNonEmptyString(value) ? value : '',
    placeholder: 'enter a note description',
    requered: true,
    minLength: NOTE_DESCRIPTION_REQUIREMENT.MIN_LENGTH,
    maxLength: NOTE_DESCRIPTION_REQUIREMENT.MAX_LENGTH,
  };

  return new BasicInput(descriptionInputOptions);
}

function getColorFieldsetLegendComponent() {
  const componentOptions = {
    elementType: 'legend',
    innerHTML: 'Please choose a note background color:'
  };

  return new BasicComponent(componentOptions);
}

function getColorRadioComponents() {
  const components = BG_NOTE_COLORS.map((color, index) => {
    const componentIndex = index + 1;
    const componentOptions = {
      inputType: 'radio',
      id: `bg-color-option-${componentIndex}`,
      name: 'bg-color',
      label: color.alias,
      checked: !index,
      requered: true,
      value: color.colorCode,
    };

    return new BasicInput(componentOptions);
  })

  return components;
}


function getColorFieldsetComponent() {
  const componentOptions = {
    id: 'color-fieldset',
    basicClassNames: ['color-data'],
    children: [getColorFieldsetLegendComponent(), ...getColorRadioComponents()],
  };

  return new Fieldset(componentOptions);
}

function getSubmitButtonComponent(buttonId) {
  const buttonOptions = {
    elementType: 'button',
    id: buttonId ?? '',
    basicClassNames: ['form-submit-button'],
    innerHTML: 'Confirm'
  }

  const button = new BasicComponent(buttonOptions);
  button.element.type = buttonId ? 'submit' : 'button';
  button.element.title = buttonId ? 'Please check and fill required fields' : '';

  return button;
}

export {
  getNoteEditorFormComponent,
  getNoteFormChildren,
};
