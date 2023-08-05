import { checkIsObject } from "../../../utils/componentFunctions.js";
import BasicComponent from "../basicComponent/index.js";

class InputLabel extends BasicComponent {
  constructor(labelArgsObj) {
    checkIsObject(labelArgsObj);

    super({
      elementType: 'label',
      basicClassNames: labelArgsObj.basicClassNames ?? [],
      innerHTML: labelArgsObj.innerHTML ?? '',
    });

    if (labelArgsObj.for) {
      this._element.for = labelArgsObj.for;
    }
  }
}

export default InputLabel;
