import BasicComponent from "../basicComponents/basicComponent/index.js";

import { getNoteFormChildren } from "../../utils/formChildren.js";
import { checkIsObject, createElementsGetter } from "../../utils/componentFunctions.js";
import { makeNoteCreatorInteractive } from "../../utils/formInteractive.js";

const DEFAULT_CLASS_LIST = ['note-creator-form'];

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

    makeNoteCreatorInteractive(this.getFormElementById, this._element, formArgsObj.noteList);
  }

}

export default NoteCreatorForm;
