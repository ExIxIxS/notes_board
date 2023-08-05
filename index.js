Array.prototype.customFilter = customFilter;

function customFilter(callBack, thisArg) {
  checkIsFunction(callBack);

  if (arguments.length === 2 && !isThisArgValid(thisArg)) {
    throw new Error("Invalid argument.");
  }

  const resultArr = [];
  this.forEach((item, index, arr) => {
    const callResult = callBack.call((thisArg ?? null), item, index, arr);

    if (callResult) {
      resultArr.push(item);
    }
  });

  return resultArr;
}

function bubbleSort(numArr) {
  if (!Array.isArray(numArr) || !isArrayOfFinites(numArr)) {
    throw new Error("Invalid argument.");
  }

  if (!numArr.length) {
    return [];
  }

  return sortArrWithBubbles(numArr);
}

function sortArrWithBubbles(arr) {
  const sortedArr = [...arr];
  const lastIndex = sortedArr.length - 1;

  for (let i = lastIndex; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (sortedArr[j] > sortedArr[j + 1]) {
        [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
      }
    }
  }

  return sortedArr;
};

function storageWrapper(callBack, targetArr) {
  checkIsFunction(callBack);

  if (arguments.length === 2 && !Array.isArray(targetArr)) {
    throw new Error("Invalid argument.");
  }

  const logArr = targetArr ?? [];

  return () => {
    const nextValue = callBack();
    logArr.push(nextValue);

    return (targetArr) ? nextValue : logArr;
  }
}

function isArrayOfFinites(arr) {
  return arr.every((item) => Number.isFinite(item));
}

function isThisArgValid(thisArg) {
  return thisArg && typeof(thisArg) === 'object';
}

function checkIsFunction(func) {
  if (!func || typeof(func) !== 'function') {
    throw new Error("Invalid argument.");
  }
}