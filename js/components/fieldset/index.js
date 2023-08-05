import { checkIsObject } from "../../utils/componentFunctions.js";
import BasicComponent from "../basicComponent/index.js";

class Fieldset extends BasicComponent {
  constructor(fieldsetArgsObj) {
    checkIsObject(fieldsetArgsObj);

    super({
      ...fieldsetArgsObj,
      elementType: 'fieldset',
    });
  }
}

export default Fieldset
