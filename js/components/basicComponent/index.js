import {
  checkIsChildrenArr,
  checkIsObject,
  getClasslist,
  isNonEmptyString
} from "../../utils/componentFunctions.js";

/*
{
  elementType: string,
  id: string,
  basicClassNames: string[],
  additionalClassNames: string[],
  children: components[]
  innerHTML: string;
}
*/

class BasicComponent {
  constructor(argsObj = {}) {
    checkIsObject(argsObj);

    this._element = this.createElement(argsObj);
  }

  get element() {
    return this._element;
  }

  createElement(argsObj) {
    const element = document.createElement(argsObj.elementType ?? 'div');

    if (isNonEmptyString(argsObj.id)) {
      element.id = argsObj.id;
    }

    element.classList = getClasslist(argsObj.basicClassNames ?? [], argsObj.additionalClassNames);

    if (isNonEmptyString(argsObj.innerHTML)) {
      element.innerHTML = argsObj.innerHTML;
    }

    if (argsObj.children) {
      checkIsChildrenArr(argsObj.children);

      const childrenElements = argsObj.children
        .map((child) => (child instanceof BasicComponent)
          ? child.element
          : child);

      element.prepend(...childrenElements);
    }

    return element;
  }



}

export default BasicComponent;
