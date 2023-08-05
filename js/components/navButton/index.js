import BasicComponent from "../basicComponents/basicComponent/index.js";
import { checkIsObject, isNonEmptyString } from "../../utils/componentFunctions.js";

class NavButton extends BasicComponent {
  constructor(argsObj = {}) {
    checkIsObject(argsObj);

    super({
      elementType: 'a',
      basicClassNames: ['nav-button'],
      additionalClassNames: argsObj?.additionalClassNames,
    })

    const link = argsObj.link ?? '#'
    this.element.href = link;

    this.element.innerHTML = `
      <button type="button" ${argsObj.isDisabled ? 'disabled' : ''}>${
        isNonEmptyString(argsObj.title)
          ? argsObj.title
          : `${link}`
      }</button>
    `
  }
}

export default NavButton;

