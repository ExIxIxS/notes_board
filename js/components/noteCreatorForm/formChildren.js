import BasicComponent from "../basicComponent/index.js";
import BasicInput from "../basicInput/index.js";

import { NOTE_DESCRIPTION_REQUIREMENT, NOTE_TITLE_REQUIREMENT } from "../../constants/formValidation.constants.js";
import { BG_NOTE_COLORS } from "../../constants/appData.constants.js";
import Fieldset from "../fieldset/index.js";

function getNoteFormChildren() {
  return [
    getFormTitleComponent(),
    getTextFieldsetComponent(),
    getColorFieldsetComponent(),
    getSubmitButtonComponent(),
  ]
}

function getFormTitleComponent() {
  const formTitleOptions = {
    elementType: 'h2',
    basicClassNames: ['note-form-title'],
    innerHTML: 'Please fill the note options:'
  };

  return new BasicComponent(formTitleOptions);
}

function getTextFieldsetComponent() {
  const componentOptions = {
    basicClassNames: ['text-data'],
    children: [getTitleInputComponent(), getDescriptionInputComponent()],
  };

  return new Fieldset(componentOptions);
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

function getDescriptionInputComponent() {
  const descriptionInputOptions = {
    isTextarea: true,
    inputType: 'text',
    id: 'note-description',
    label: 'Description:',
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
  getNoteFormChildren,
};
