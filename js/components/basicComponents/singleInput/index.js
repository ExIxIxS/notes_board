import { checkIsObject, isNonEmptyString, isNonNegativeInteger } from "../../../utils/componentFunctions.js";
import BasicComponent from "../basicComponent/index.js";

class SingleInput extends BasicComponent {
  constructor(inputArgsObj) {
    checkIsObject(inputArgsObj);

    super({
      elementType: 'input',
      id: inputArgsObj.id,
      basicClassNames: inputArgsObj.basicClassNames ?? [],
    });

    this._element.type = inputArgsObj.inputType ?? 'text';
    this._element.name = inputArgsObj.name ?? inputArgsObj.id;

    if (isNonEmptyString(inputArgsObj.placeholder)) {
      this._element.placeholder = inputArgsObj.placeholder;
    }

    if (typeof(inputArgsObj.requered) === 'boolean') {
      this._element.requered = inputArgsObj.requered;
    }

    if (typeof(inputArgsObj.autofocus) === 'boolean') {
      this._element.autofocus = inputArgsObj.autofocus;
    }

    if (typeof(inputArgsObj.checked) === 'boolean') {
      this._element.checked = inputArgsObj.checked;
    }

    if (isNonNegativeInteger(inputArgsObj.minLength)) {
      this._element.minLength = inputArgsObj.minLength;
    }

    if (isNonNegativeInteger(inputArgsObj.maxLength)) {
      this._element.maxLength = inputArgsObj.maxLength;
    }

    if (inputArgsObj.value) {
      this._element.value = inputArgsObj.value;
      this._element.defaultValue = inputArgsObj.value;
    }
  }
}

export default SingleInput;
