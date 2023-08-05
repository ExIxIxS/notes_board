import { checkIsObject } from "../../utils/componentFunctions.js";
import InputLabel from "../InputLabel/index.js";
import BasicComponent from "../basicComponent/index.js";
import SingleInput from "../singleInput/index.js";

class BasicInput extends BasicComponent {
  constructor(inputArgsObj) {
    checkIsObject(inputArgsObj);

    const label = new InputLabel({
      basicClassNames: ['form-label'],
      for: inputArgsObj.id,
      innerHTML: inputArgsObj.label,
    })

    const input = new SingleInput({
      ...inputArgsObj,
      basicClassNames: ['form-input'],
    });

    super({
      elementType: 'div',
      children: [label, input]
    });
  }
}

export default BasicInput;
