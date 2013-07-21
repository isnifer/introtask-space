/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {

  this.name = name;
  this.position = position;
  this.capacity = capacity;
  this.load = 0;

}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {

  return "Корабль: " + this.name + ". Местоположение: " + this.position[0] + ', ' + this.position[1] + '. Занято: ' + this.getOccupiedSpace() + " из " + this.capacity + "т";

}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {

  return this.capacity - this.load;

}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {

  return this.load;

}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
  
  if (newPosition.hasOwnProperty(length)) {
    
    if (newPosition.length === 2) {
      this.position = newPosition;
    } else {
      return 'Введите координаты в формате [X, Y]';
    }

  } else if (typeof newPosition === 'object' && typeof newPosition.position !== undefined) {
    this.position = newPosition.position;
  } else {
    return 'Введите верные координаты';
  }

}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {

  this.name = name;
  this.position = position;
  this.avaiableCargo = availableAmountOfCargo;

}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {

  return "Планета: " + this.name + ". Местоположение: " + this.position[0] + ', ' + this.position[1] + '. Доступно груза: ' + this.getAvailableAmountOfCargo() + "т";

}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {

  return this.avaiableCargo;

}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {

  if (vessel.position[0] === this.position[0] && vessel.position[1] === this.position[1]) {
    var freeSpace = vessel.getFreeSpace();
    if (freeSpace >= cargoWeight) {
      vessel.load += cargoWeight;
      this.avaiableCargo -= cargoWeight;
    }
  }

}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {

  if (vessel.position[0] === this.position[0] && vessel.position[1] === this.position[1]) {
    var load = vessel.getOccupiedSpace();
    vessel.load -= cargoWeight;
    this.avaiableCargo += cargoWeight;
  }

}