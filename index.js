class Stack {
  static fromIterable(iterable) {
    checkIsIterable(iterable);

    let length = 0;

    for (let _ of iterable) {
      length++;
    }

    const newStack = new Stack(length);

    for (let item of iterable) {
      newStack.push(item);
    }

    return newStack;
  }

  #limit;
  #stack = {};
  #length = 0;

  #getLastIndex() {
    return (!this.isEmpty()) ? this.#length - 1 : null;
  }

  constructor(limit) {
    if (arguments.length && !isPositiveFinite(limit)) {
      throw new Error('Invalid limit value');
    }

    this.#limit = limit
      ? Math.round(limit)
      : 10;
  }

  isEmpty() {
    return !this.#length;
  }

  push(item) {
    if (this.#length === this.#limit) {
      throw new Error('Limit exceeded');
    }

    this.#stack[this.#length] = item;
    this.#length++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Empty stack');
    }

    const itemIndex = this.#getLastIndex();
    const item = this.#stack[itemIndex];
    delete this.#stack[itemIndex];
    this.#length--;

    return item;
  }

  peek() {
    return (!this.isEmpty())
      ? this.#stack[this.#getLastIndex()]
      : null;
  }

  toArray() {
    const arr = [];

    for (let i = 0; i < this.#length; i++) {
      arr.push(this.#stack[i]);
    }

    return arr;
  }

}

class LinkedList {
  static fromIterable(iterable) {
    checkIsIterable(iterable);

    const newList = new LinkedList();
    for (let item of iterable) {
      newList.append(item);
    }

    return newList;
  }

  #reduceList(reducer) {
    if (!this.#lastLevel) {
      return;
    }

    let currentLevel = this.#list;

    while (true) {
      const item = currentLevel.value;
      reducer(item);

      if (!currentLevel.next) {
        break;
      }

      currentLevel = currentLevel.next;
    }
  }

  #list = {};
  #lastLevel = null;

  constructor() {}

  append(item) {
    if (this.#lastLevel) {
      this.#lastLevel.next = {
        value: item,
        next: null,
      }

      this.#lastLevel = this.#lastLevel.next;
    } else {
      this.#list.value = item;
      this.#list.next = null;
      this.#lastLevel = this.#list;
    }

    return this;
  }

  prepend(item) {
    this.#list = {
      value: item,
      next: this.#lastLevel ? this.#list : null,
    }

    this.#lastLevel = this.#lastLevel ?? this.#list;

    return this;
  }

  find(item) {
    let isItemFound = false;

    this.#reduceList((listItem) => {
      if (item === listItem) {
        isItemFound = true;
      }
    });

    return (isItemFound) ? item : null;
  }

  toArray() {
    const arr = [];
    this.#reduceList((listItem) => arr.push(listItem));

    return arr;
  }
}

class Car {
  #brand = '';
  #model = '';
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  constructor() {}

  get brand(){
    return this.#brand;
  }

  set brand(newBrand) {
    if (!isValidString(newBrand, 1, 50)) {
      throw new Error('Invalid brand name');
    }

    this.#brand = newBrand;
  }

  get model(){
    return this.#model;
  }

  set model(newModel) {
    if (!isValidString(newModel, 1, 50)) {
      throw new Error('Invalid model name');
    }

    this.#model = newModel;
  }

  get yearOfManufacturing(){
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(year) {
    if (!isYearValid(year)) {
      throw new Error('Invalid year of manufacturing');
    }

    this.#yearOfManufacturing = year;
  }

  get maxSpeed(){
    return this.#maxSpeed;
  }

  set maxSpeed(speedValue) {
    if (!isValidPositiveInteger(speedValue, 100, 330)) {
      throw new Error('Invalid max speed');
    }

    this.#maxSpeed = speedValue;
  }

  get maxFuelVolume(){
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(volume) {
    if (!isValidPositiveInteger(volume, 20, 100)) {
      throw new Error('Invalid max fuel volume');
    }

    this.#maxFuelVolume = volume;
  }

  get fuelConsumption(){
    return this.#fuelConsumption;
  }

  set fuelConsumption(consumption) {
    if (!isValidPositiveInteger(consumption, 1, Infinity)) {
      throw new Error('Invalid fuel consumption');
    }

    this.#fuelConsumption = consumption;
  }

  get damage(){
    return this.#damage;
  }

  set damage(damage) {
    if (!isValidPositiveInteger(damage, 1, 5)) {
      throw new Error('Invalid damage');
    }

    this.#damage = damage;
  }

  get currentFuelVolume(){
    return this.#currentFuelVolume;
  }

  get isStarted(){
    return this.#isStarted;
  }

  get health(){
    return this.#health;
  }

  get mileage(){
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Car has already started');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Car hasn\'t started yet');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(fuelAmount) {
    if (!isPositiveFinite(fuelAmount)) {
      throw new Error('Invalid fuel amount');
    }

    if (this.#currentFuelVolume + fuelAmount > this.#maxFuelVolume) {
      throw new Error('Too much fuel');
    }

    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }

    this.#currentFuelVolume += fuelAmount;
  }

  drive(speed, hours) {
    if (!isPositiveInteger(speed)) {
      throw new Error('Invalid speed');
    }

    if (!isPositiveInteger(hours)) {
      throw new Error('Invalid duration');
    }

    if (speed > this.#maxSpeed) {
      throw new Error('Car can\'t go this fast');
    }

    if (!this.#isStarted) {
      throw new Error('You have to start your car first');
    }

    const path = speed * hours;
    const hundredsOfKm = path / 100;
    const requiredFuel = this.#fuelConsumption * (hundredsOfKm);

    if (requiredFuel > this.#currentFuelVolume) {
      throw new Error('You don\'t have enough fuel');
    }

    const requiredHealth = this.#damage * (hundredsOfKm)

    if (requiredHealth > this.#health) {
      throw new Error('Your car won’t make it');
    }

    this.#currentFuelVolume -= +requiredFuel.toFixed(10);
    this.#health -= requiredHealth;
    this.#mileage += path;
  }

  repair() {
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }

    if (this.getFullAmount()) {
      throw new Error('You have to fill up your gas tank first');
    }

    this.#health = 100;
  }

  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }

}

function isPositiveFinite(num) {
  return (Number.isFinite(num) && num > 0);
}

function isPositiveInteger(num) {
  return (Number.isInteger(num) && num > 0);
}

function checkIsIterable(iterable) {
  if (!iterable?.[Symbol.iterator]) {
    throw new Error('Not iterable');
  }
}

function isValidString(str, from, to) {
  return (typeof(str) === 'string')
    && (str.length >= from)
    && (str.length <= to);
}

function isValidPositiveInteger(num, from, to) {
  return isPositiveInteger(num)
    && (num >= from)
    && (num <= to);
}

function isYearValid(year) {
  const START_YEAR = 1950;
  const CURRENT_YEAR = new Date().getFullYear();

  return isPositiveInteger(year)
    && (year >= START_YEAR)
    && (year <= CURRENT_YEAR);
}
