import { NOTE_DESCRIPTION_REQUIREMENT, NOTE_TITLE_REQUIREMENT } from "../../constants/formValidation.constants.js";
import { checkIsObject, createElementsGetter } from "../../utils/componentFunctions.js";
import BasicComponent from "../basicComponent/index.js";
import BasicInput from "../basicInput/index.js";
import Fieldset from "../fieldset/index.js";
import { getFormTitleComponent, getSubmitButtonComponent, getTitleInputComponent } from "./formChildren.js";
import { makeNoteCreatorInteractive } from "./formInteractive.js";

const DEFAULT_CLASS_LIST = ['note-creator'];

const descriptionInput = new BasicInput({
  isTextarea: true,
  inputType: 'text',
  id: 'note-description',
  label: 'Description:',
  placeholder: 'enter a note description',
  requered: true,
  minLength: NOTE_DESCRIPTION_REQUIREMENT.MIN_LENGTH,
  maxLength: NOTE_DESCRIPTION_REQUIREMENT.MAX_LENGTH,
})


const colorFieldsetLegend = new BasicComponent({
  elementType: 'legend',
  innerHTML: 'Please choose a note background color:'
})

const bgColorRadioInput_1 = new BasicInput({
  inputType: 'radio',
  id: 'bg-color-option-1',
  name: 'bg-color',
  label: 'Red',
  checked: true,
  requered: true,
  value: 'red',
});

const bgColorRadioInput_2 = new BasicInput({
  inputType: 'radio',
  id: 'bg-color-option-2',
  name: 'bg-color',
  label: 'Green',
  requered: true,
  value: 'green',
});

const colorFieldset = new Fieldset({
  id: 'color-fieldset',
  basicClassNames: ['color-data'],
  children: [colorFieldsetLegend, bgColorRadioInput_1, bgColorRadioInput_2],
})

class NoteCreator extends BasicComponent {
  #elementsLib = {};

  constructor(formArgsObj = {}) {
    checkIsObject(formArgsObj);

    const formTitle = getFormTitleComponent();
    const titleInput = getTitleInputComponent();
    const textFieldset = new Fieldset({
      basicClassNames: ['text-data'],
      children: [titleInput, descriptionInput],
    })

    const submitButton = getSubmitButtonComponent();

    super({
      ...formArgsObj,
      elementType: 'form',
      basicClassNames: DEFAULT_CLASS_LIST,
      children: [formTitle, textFieldset, colorFieldset, submitButton],
    })

    this.getFormElementById = createElementsGetter(this._element, this.#elementsLib);

    makeNoteCreatorInteractive(this.getFormElementById, this._element);
  }

}

export default NoteCreator;
