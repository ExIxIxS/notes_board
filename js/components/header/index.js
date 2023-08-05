import BasicComponent from "../basicComponents/basicComponent/index.js";
import { checkIsObject } from "../../utils/componentFunctions.js";

const DEFAULT_CLASS_LIST = ['app-header'];

class Header extends BasicComponent {
  constructor(argsObj = {}) {
    checkIsObject(argsObj);

    super({
      ...argsObj,
      elementType: 'header',
      basicClassNames: DEFAULT_CLASS_LIST,
    })
  }

}

export default Header;
