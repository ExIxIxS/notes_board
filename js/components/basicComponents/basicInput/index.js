import { checkIsObject, isNonEmptyString } from "../../../utils/componentFunctions.js";
import InputLabel from "../InputLabel/index.js";
import BasicComponent from "../basicComponent/index.js";
import SingleInput from "../singleInput/index.js";

class BasicInput extends BasicComponent {
  constructor(inputArgsObj) {
    checkIsObject(inputArgsObj);

    const children = [];

    if (isNonEmptyString(inputArgsObj.label)) {
      const label = new InputLabel({
        basicClassNames: ['form-label'],
        for: inputArgsObj.id,
        innerHTML: inputArgsObj.label,
      })

      children.push(label);
    }

    const input = new SingleInput({
      ...inputArgsObj,
      basicClassNames: Array.isArray(inputArgsObj.basicClassNames)
        ? ['form-input', ...inputArgsObj.basicClassNames]
        : ['form-input'],
    });

    children.push(input);

    super({
      basicClassNames: ['basic-form-input'],
      elementType: 'div',
      children: children,
    });
  }
}

export default BasicInput;
