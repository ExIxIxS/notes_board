import BasicComponent from "../basicComponents/basicComponent/index.js";
import { checkIsObject, isNonEmptyString } from "../../utils/componentFunctions.js";

const DEFAULT_CLASS_LIST = ['nav-panel'];

class NavPanel extends BasicComponent {
  constructor(argsObj = {}) {
    checkIsObject(argsObj);

    const mainPageButton = new NavButton({
      title: 'Main',
      link: '..\\..\\',
      isDisabled: argsObj.currentPage === 'main',
    })

    const favoritesPageButton = new NavButton({
      title: 'Favorites',
      link: '.\\pages\\favorites',
      isDisabled: argsObj.currentPage === 'favorites',
    })

    super({
      elementType: 'nav',
      basicClassNames: DEFAULT_CLASS_LIST,
      additionalClassNames: argsObj?.additionalClassNames,
      children: [mainPageButton, favoritesPageButton ],
    })
  }

}

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

export default NavPanel;
