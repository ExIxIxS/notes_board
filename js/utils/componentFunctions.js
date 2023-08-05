import BasicComponent from "../components/basicComponents/basicComponent/index.js";

function getClasslist(mainClasslist, additionalClasslist) {
  if (!Array.isArray(mainClasslist)) {
    throw new TypeError('First arg should be an Array');
  }

  const classList = (Array.isArray(additionalClasslist))
      ? mainClasslist.concat(additionalClasslist)
      : mainClasslist;

  return classList.length ? classList.join(' ') : '';
}

function isObject(obj) {
  return obj && typeof(obj) === 'object';
}

function checkIsObject(obj) {
  if (!isObject(obj)) {
    throw new TypeError('Argument should be an object');
  };
}

function IsChildrenArr(arr) {
  return Array.isArray(arr) && arr.every((item) => {
    return (item instanceof HTMLElement || item instanceof BasicComponent);
  })
}

function checkIsChildrenArr(arr) {
  if (!IsChildrenArr(arr)) {
    throw new TypeError('Children should be a HTMLElements array')
  }
}

function isNonEmptyString(str) {
  return (str && typeof(str) === 'string');
}

function isNonNegativeInteger(num) {
  return (Number.isInteger(num) && num >= 0);
}

function createElementsGetter(rootElement, elementsLib) {
  return (id) => {
    if (!elementsLib[id]) {
      elementsLib[id] = rootElement.querySelector(id);
    }

    return elementsLib[id];
  }
}

function getNoteByButton(buttonElement) {
  return buttonElement.parentElement.parentElement;
}

export {
  getClasslist,
  isObject,
  checkIsObject,
  IsChildrenArr,
  checkIsChildrenArr,
  isNonEmptyString,
  isNonNegativeInteger,
  createElementsGetter,
  getNoteByButton,
};
