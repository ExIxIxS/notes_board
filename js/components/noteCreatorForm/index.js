import BasicComponent from "../basicComponent/index.js";

import { getNoteFormChildren } from "./formChildren.js";
import { checkIsObject, createElementsGetter } from "../../utils/componentFunctions.js";
import { makeNoteCreatorInteractive } from "./formInteractive.js";

const DEFAULT_CLASS_LIST = ['note-creator'];

class NoteCreatorForm extends BasicComponent {
  #elementsLib = {};

  constructor(formArgsObj = {}) {
    checkIsObject(formArgsObj);

    const formChildren = getNoteFormChildren();

    super({
      ...formArgsObj,
      elementType: 'form',
      basicClassNames: DEFAULT_CLASS_LIST,
      children: formChildren,
    })

    this.getFormElementById = createElementsGetter(this._element, this.#elementsLib);

    makeNoteCreatorInteractive(this.getFormElementById, this._element);
  }

}

export default NoteCreatorForm;
