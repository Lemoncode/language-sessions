///-- ARROW FUNCTIONS *******************************************************


// SINTAXIS

// Funciones flecha o también llamadas "lambda". Siempre son anónimas.
const toUpper = (text) => {
  return text.toUpperCase();
};

// Si solo tenemos la sentencia "return" podemos acortar la función y ahorrarnos
// la palabra clave "return" y las llaves:
const toUpper = (text) => text.toUpperCase();

// También podemos omitir los paréntesis cuando el argumento es único:
const toUpper = text => text.toUpperCase();
// Sólo cuando es único, porque sino la coma de separación de argumentos se 
// podría confundir con el operador coma.

// En caso de que lo que devuelva sea un objeto literal hay que tener cuidado:
const toObject = (name, surname, age) => {
  return { name, surname, age }
}
// y utilizar paréntesis para devolver en la forma corta, ya que las llaves de
// objeto literal se confundirían con las llaves de ámbito de función.
const toObject = (name, surname, age) => ({ name, surname, age })


// Las "fat arrow" o "lambdas" puede utilizarse como si de un objeto se tratara, y 
// puede ser pasadas como argumentos de otra función, o devueltas como valor de retorno.
function createCounter() {
  let i = 0;
  return () => console.log(i++);
}
const printCounter = createCounter();
printCounter(); // 0
printCounter(); // 1
printCounter(); // 2


// THIS

// ¿Por qué otra forma de expresar funciones? ¿Es sólo estética? No, las funciones flecha
// tienen una característica muy importante, y es el motivo de su existencia:
// *** Mantienen a "this" apuntando al contexto en el que fueron creadas ... SIEMPRE ***
// Es decir, el "this" dentro de una lambda siempre se refiere al contexto donde dicha
// lambda fue creada. "this" deja de ser el que llama a la lambda.
// Dicho de otro modo, las lambdas no tienen contexto propio porque siempre lo toman
// prestado desde el contexto donde fueron creadas.

// *** EJEMPLOS DE DEMOSTRACIÓN ***

function f() {
  console.log(this.age);  // Aqui el contexto es el "caller" de la función. this -> caller.
}

// Si llamo a f haciendo que su contexto sea un objeto que tenga 'age',
// no habrá problemas:
f.call({age: 35}); // 35

// De lo contrario:
f(); // undefined

// A menos que me cree una propiedad "age" en el contexto global "window":
age = 35;
f(); // 35

// Una arrow function no tiene contexto como tal sino que lo toma de donde
// ha sido definida.
const g = () => console.log(this.surname);

// Por tanto, no puedo hacer esto ahora, porque su contexto es siempre "window",
// tal y como ha sido definida la fat arrow.
g.call({surname: "calzado"}); // undefined pq window no tiene "surname".
g(); // undefined pq window no tiene "surname".

// Creemos un "surname" en "window":
surname = "camargo";
g.call({surname: "calzado"}); // camargo.
g(); // camargo.


// *** PROBLEMÁTICA DE LAS FUNCTIONS vs ARROW FUNCTIONS ***

// Las arrow function irrumpieron no solo por ser más expresivas y compactas sino
// para ofrecer una alternativa de funciones cuyo contexto fuese invariante, no cambiase,
// siempre es el mismo (ya que lo toma prestado el contexto en el que fue creada.).caption
// De este modo el 'this' siempre se refiere a lo mismo en una 'arrow function', a diferencia
// de las funciones que pueden inducir a errores en ciertos casos. Veamos ejemplos:

// WARNING: Elegir uno de los 2 ejemplos.
// - ¿Corto de tiempo? => EJEMPLO 1. 
// - ¿Bien de tiempo? => EJEMPLO 2.

// EJEMPLO 1.

// Un ejemplo sencillo de como una function normal puede jugarnos una mala pasada
// debido al THIS.

// ** Problematica **
// Supongamos una función que simplemente loguee un texto almacenado globalmente.
text = "Mensaje almacenado en contexto princial";
const logText = function() {
  console.log(this.text);
};

// Aqui el 'this' se refiere al contexto global, donde tenemos 'text'.
logText(); // "Mensaje almacenado en contexto princial"

// Pero ¿y aqui? En este caso, quien llama a la función logText es el 'document'
// y no el contexto global (window). Y por tanto no existe miembro 'text' 
document.addEventListener("mousemove", logText); // undefined.

// ** Arreglo **
// Para arreglar esto basta con usar una arrow function en su lugar ya que nos
// garantiza que el this siempre siempre siempre se refiere al contexto donde
// fue definida, y por tanto es invariante.

text = "Mensaje almacenado en contexto princial";
const logText = () => console.log(this.text);
logText(); // "Mensaje almacenado en contexto princial"
document.addEventListener("mousemove", logText); // "Mensaje almacenado en contexto princial"



// EJEMPLO 2.
// El siguiente ejemplo es algo más complejo pero muy ilustrativo 
// Veamos la problemática que existía con las funciones "functions":

function ClassRoom(title, students) { // PascalCase es la convención para nombrar constructores.
  this.title = title;
  this.students = students || [];
}

ClassRoom.prototype.showStudents = function() {
  this.students.forEach(function(student) {
    // Pregunta: ¿Qué problema creeis que puede haber aqui? (Dejar pensar. Respuesta: "this" es ahora "students")
    console.log(this.title + ": " + student); // "undefined: Student 1"
  });                                         // "undefined: Student 2"
};                                            // "undefined: Student 3"

const secondPrimary = new ClassRoom("2nd Primary", ["Student 1", "Student 2", "Student 3"]);
secondPrimary.showStudents();

// El "this" es ahora el array "students", que es quien realmente llama
// a la función, y por tanto, "students" no tiene propiedad "title".

// Para resolver este problema usando funciones, tendremos que almacenar
// temporalmente el "this" que apunta a ClassRoom en una variable para 
// poder usarlo como el "this" de la función:
function ClassRoom(title, students) {
  this.title = title;
  this.students = students || [];
}

ClassRoom.prototype.showStudents = function () {
  const self = this;
  this.students.forEach(function (student) {
    // Ahora tenemos a self que representa al "this" correcto
    console.log(self.title + ": " + student); // "2nd Primary: Student 1"
  });                                         // "2nd Primary: Student 2"
};                                            // "2nd Primary: Student 3"

const secondPrimary = new ClassRoom("2nd Primary", ["Student 1", "Student 2", "Student 3"]);
secondPrimary.showStudents();

// Otra forma podría haber sido "atar" intencionalmente el "this" a
// ClassRoom, de la siguiente forma:
ClassRoom.prototype.showStudents = function () {
  const printStudent = function (student) {
    console.log(this.title + ": " + student);
  };

  this.students.forEach(printStudent.bind(this))
};

// En cualquier caso, es un engorro, queda feo y es muy propenso a errores.
// La solución más sencilla y elegante, las "arrow functions".
function ClassRoom(title, students) {
  this.title = title;
  this.students = students || [];
}

ClassRoom.prototype.showStudents = function () {
  // Ahora "this" es la misma referencia que el "this" del contexto en el
  // que ha sido declarada la lambda.
  this.students.forEach((student) => {
    console.log(this.title + ": " + student); // "2nd Primary: Student 1"
  });                                         // "2nd Primary: Student 2"
};                                            // "2nd Primary: Student 3"

const secondPrimary = new ClassRoom("2nd Primary", ["Student 1", "Student 2", "Student 3"]);
secondPrimary.showStudents();


// QUE NO SE PUEDE HACER CON LAS ARROW FUNCTIONS

// 1. Las "arrow functions" no pueden hacer tracking de sus argumentos a través
// de la variable dinámica "arguments".
function sum() {
  let total = 0;
  for (const num of arguments) {  // Aprovechar y explicar el for..of
    total += num;
  }
  return total;

  // Alternativa más compacta: Reduce!!!
  //return Array.from(arguments).reduce((acc, val) => acc + val);
}
console.log(sum(1, 2, 3)); // 6;

// Si lo intentamos nos petará (OJO en Stackblitz no peta)
const sum = () => {
  return Array.from(arguments).reduce((acc, val) => acc + val);
};
console.log(sum(1, 2, 3)); // Uncaught ReferenceError: arguments is not defined

// [!] No obstante, si lo que queremos es trackear argumentos, veremos en el capítulo
// de spread-rest operator como hacerlo fácilmente, ya sea una lambda o función. (...args)

// 2. Las funciones flecha no se pueden usar como constructores, no pueden
// ser llamadas con el operador "new", precisamente por el contexto:
const Person = (name) => {
  this.name = name; // "this" aqui sería el objeto "window".
};

const dan = new Person("Dan"); // Uncaught TypeError: Person is not a constructor

// 3. Y tampoco tienen propiedad "prototype"
const Person = (name) => {
  this.name = name;
};

console.log(Person.prototype); // undefined. (OJO en Stackblitz)