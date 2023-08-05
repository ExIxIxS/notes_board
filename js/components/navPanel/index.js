import BasicComponent from "../basicComponents/basicComponent/index.js";
import NavButton from "../navButton/index.js";

import { checkIsObject } from "../../utils/componentFunctions.js";


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

    const navChildren = (argsObj.children?.every((child) => child instanceof BasicComponent))
      ? [mainPageButton, ...argsObj.children,favoritesPageButton]
      : [mainPageButton, favoritesPageButton]

    super({
      elementType: 'nav',
      basicClassNames: DEFAULT_CLASS_LIST,
      additionalClassNames: argsObj?.additionalClassNames,
      children: navChildren,
    })
  }

}

export default NavPanel;
