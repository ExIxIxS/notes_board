function getDistance(...coords) {
  function throwError() {
    throw new Error();
  }

  function isValidCoord(coord) {
    return (typeof(coord) === 'number' && coord >= -1000 && coord <= 1000)
  }

  if (coords.length !== 4) {
    throwError();
  }

  coords.forEach((coord) => {
    if (!isValidCoord(coord)) {
      throwError();
    }
  });

  const [x1, y1, x2, y2] = coords;
  const TRIM_LIMIT = 2;
  const calcDistance = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
  const trimmedDistance = +calcDistance.toFixed(TRIM_LIMIT);

  return trimmedDistance;
}

function switchPlaces(inputArr) {
  if (!Array.isArray(inputArr)) {
    throw new Error();
  }

  if (!inputArr.length) {
    return [];
  }

  const halfLength = Math.floor(inputArr.length / 2);

  return (inputArr.length % 2 === 0)
    ? [...inputArr.slice(halfLength), ...inputArr.slice(0, halfLength)]
    : [...inputArr.slice(halfLength + 1), inputArr[halfLength], ...inputArr.slice(0, halfLength)];
}

function getDivisors(num) {
  if (!Number.isFinite(num)) {
    throw new Error();
  }

  const divisors = [];

  for (let i = num; i > 0; i--) {
    if (num % i === 0) {
      divisors.push(i);
    }
  }

  return divisors;
}

export { getDistance, switchPlaces, getDivisors };
