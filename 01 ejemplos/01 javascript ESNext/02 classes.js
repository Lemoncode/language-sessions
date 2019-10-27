///-- CLASSES *******************************************************

// Las clases se introdujeron en ES6 como una forma abreviada de
// implementar el modelo de prototipos. Es puro azúcar sintáctico.
// Recordemos que no existen clases como tales en JS. Todo se basa en
// funciones constructoras, prototipos y el operador new.

// Recordemos:
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log("Hello, I'm " + this.name);
};
const antonio = new Person("Antonio");
antonio.greet(); // "Hello, I'm Antonio"

// Una forma rápida de conseguir esto mismo en ES6 es usando la
// palabra reservada "class".
class Person {
  constructor(name) { // Mi antigua función constructora
    this.name = name;
  }

  greet() {
    console.log("Hello, I'm " + this.name);
  }
}
const antonio = new Person("Antonio");
antonio.greet(); // "Hello, I'm Antonio"

// Formular pregunta, ¿que pensáis que dará esto?
console.log(typeof Person); // function!
// No hay tipo "class" en JS. Una clase equivale a su función constructora.


// HERENCIA

// La herencia se aplica usando la palabra clave "extends".
// Veamos el ejemplo de Automobile transformado a sintaxis de "class".

// Recordemos
function Automobile(wheels) {
  this.wheels = wheels;
  this.kms = 0;
}

Automobile.prototype.run = function (kms) {
  this.kms += kms;
  console.log("I'm running " + kms + "kms");
};

Automobile.prototype.printKms = function () {
  console.log("I ran " + this.kms + "kms");
};

function Taxi() {
  Automobile.call(this, 4); // super();
  this.isOccupied = false;
}

Taxi.prototype = Object.create(Automobile.prototype); // extends Automobile
Taxi.prototype.constructor = Taxi;
Taxi.prototype.moveSomeone = function () {
  this.isOccupied = true;
};

// super.run()
Taxi.prototype.run = function (kms) {
  Automobile.prototype.run.call(this, kms);
  const movingMessage = this.isOccupied ? "moving someone" : "not moving no one";
  console.log("And I'm " + movingMessage);
};

// @override;
Taxi.prototype.printKms = function () {
  console.log("I ran " + this.kms + "kms and I could run another " + this.kms + "kms more.");
};

const taxi = new Taxi();
console.log(taxi);
console.log(taxi.run(100)); // "I'm running 100kms"
console.log(taxi.isOccupied); // false
taxi.moveSomeone();
console.log(taxi.isOccupied); // true

// Todo ese ejemplo sería equivalente a lo siguiente:
class Automobile {
  constructor(wheels) {
    this.wheels = wheels;
    this.kms = 0;
  }

  // Estos métodos se añadirán al objeto Automobile.prototype.
  run(kms) {
    this.kms += kms;
    console.log("I'm running " + kms + "kms");
  }

  printKms() {
    console.log("I ran " + this.kms + "kms");
  }
}

class Taxi extends Automobile {
  constructor() {
    super(4);
    this.isOccupied = false;
  }

  // Estos métodos se añadirán al objeto Taxi.prototype.
  moveSomeone() {
    this.isOccupied = true;
  };

  run(kms) {
    super.run(kms);
    const movingMessage = this.isOccupied ? "moving someone" : "not moving no one";
    console.log("And I'm " + movingMessage);
  }

  printKms() {
    console.log("I ran " + this.kms + "kms and I could run another " + this.kms + "kms more.");
  }
}
const taxi = new Taxi();
console.log(taxi);
console.log(taxi.run(100)); // "I'm running 100kms"
console.log(taxi.isOccupied); // false
taxi.moveSomeone();
console.log(taxi.isOccupied); // true

// Las clases también pueden ser anónimas, al igual que las funciones.
// Veamos un ejemplo de FACTORÍA DE CLASES.
// Aqui estamos usando el concepto de CLOSURE para 'recordar' el mensaje
// y crear clases especializadas (distintas) con distinto mensaje.
function makeClass(message) {
  return class {
    talk() {
      console.log(message);
    }
  }
}

const Cat = makeClass("Meow!");
const cat = new Cat();
cat.talk();

const Dog = makeClass("Woof!");
const dog = new Dog();
dog.talk();