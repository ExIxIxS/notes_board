function makeDeepCopy(originalObj) {
  if (!originalObj || typeof(originalObj) !== 'object' || Array.isArray(originalObj)) {
    throw new Error();
  }

  return recursiveDeepCopy(originalObj);
}

function recursiveDeepCopy(original) {
  if (!original || typeof(original) !== 'object') {
    return original;
  }

  if (Array.isArray(original)) {
     return original.map((item) => recursiveDeepCopy(item));
  }

  if (original instanceof Map) {
    const mapCopy = new Map();
    original.forEach((value, key) => {
      mapCopy.set(recursiveDeepCopy(key), recursiveDeepCopy(value));
    });

    return mapCopy;
  }

  if (original instanceof Set) {
    const setCopy = new Set();
    original.forEach((value) => {
      setCopy.add(recursiveDeepCopy(value));
    });

    return setCopy;
  }

  const deepObjCopy = {};
  for (let key in original) {
    deepObjCopy[key] = recursiveDeepCopy(original[key]);
  }

  return deepObjCopy;
}

function createIterable(...limitArgs) {
  if (limitArgs.length !== 2) {
    throw new Error();
  }

  limitArgs.forEach((limit) => {
    if (!Number.isInteger(limit)) {
      throw new Error();
    }
  })

  const [from, to] = limitArgs;

  if (to <= from) {
    throw new Error();
  }

  const iterableObj = {};
  iterableObj[Symbol.iterator] = getIterator.bind(null, from, to);

  return iterableObj;
}

function getIterator(from, to) {
  let currentValue = from - 1;

  return {
    next: () => {
      currentValue++;

      return {
        value: currentValue,
        done: currentValue > to,
      }
    }
  }
}

// could be passed any plain object, not only empty like in example;
function createProxy(originalObj) {
  if (!originalObj || typeof(originalObj) !== 'object' || Array.isArray(originalObj)) {
    throw new Error();
  }

  const proxyHandler = {
    get: proxyGetter,
    set: proxySetter
  };

  return new Proxy(originalObj, proxyHandler);
}

function proxyGetter(target, prop) {
  if (isPropExists(target, prop)) {
    if (isPropIsObj(target, prop)) {
      target[prop].readAmount = (target[prop].readAmount || 0) + 1;
    } else {
      target[prop] = {
        value: target[prop],
        readAmount: 1,
      }
    }

    return target[prop];
  }

  return;
}

function proxySetter(target, prop, value) {
  if (!isPropExists(target, prop)) {
    target[prop] = {
      value: value,
      readAmount: 0,
    }

    return;
  }

  if (isPropIsObj(target, prop)) {
    if (isObjValueTypeEqual(target, prop, value)) {
      target[prop] = {...target[prop], value: value};
    }
  } else {
    if (isPrimitiveTypeEqual(target, prop, value)) {
      target[prop] = {value: value, readAmount: 0}
    }
  }
}

function isPropExists(obj, propName) {
  return propName in obj;
}

function isPropIsObj(obj, propName) {
  return obj[propName] && typeof(obj[propName]) === 'object';
}

function isObjValueTypeEqual(obj, propName, value) {
  return typeof(value) === typeof(obj[propName].value) || typeof(value) === typeof(obj[propName]);
}

function isPrimitiveTypeEqual(obj, propName, value) {
  return typeof(value) === typeof(obj[propName]);
}
