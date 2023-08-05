import { checkIsObject } from "../../utils/componentFunctions.js";
import BasicComponent from "../basicComponent/index.js";

const DEFAULT_CLASS_LIST = ['app-header'];

const child = document.createElement('p');
child.innerHTML = 'Cool!!!'

class Header extends BasicComponent {
  constructor(argsObj = {}) {
    checkIsObject(argsObj);

    super({
      elementType: 'header',
      basicClassNames: DEFAULT_CLASS_LIST,
      additionalClassNames: argsObj?.additionalClassNames,
      children: [child],
    })
  }

}

export default Header;
