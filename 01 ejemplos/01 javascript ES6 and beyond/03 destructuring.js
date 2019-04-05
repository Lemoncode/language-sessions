///-- DESTRUCTURING *******************************************************

// Destructuring es una técnica rápida para asignar propiedades de objetos a
// variables, o items de un array a variables.


// "DESTRUCTURING" SOBRE OBJETOS

// Ejemplo a mano, sin "destructuring":
const student = {
  name: "Evan",
  surname: "Smith",
  country: "USA",
};
const name = student.name;
const surname = student.surname;
console.log(name); // "Evan"
console.log(surname); // "Smith"

// Pero con "destructuring" podemos asignar propiedades ya existentes
// a variables de forma directa, en una línea:
const student = {
  name: "Evan",
  surname: "Smith",
  country: "USA",
};
const { name, surname } = student;
console.log(name); // "Evan"
console.log(surname); // "Smith"

// La de arriba es una forma abreviada a la notación clave-valor, por
// lo que es equivalente a hacer:
const student = {
  name: "Evan",
  surname: "Smith",
  country: "USA",
};
const { name: name, surname: surname } = student;
console.log(name); // "Evan"
console.log(surname); // "Smith"

// Aunque si queremos, también podemos reemplazar el nombre de las
// variables donde vamos asignando nuestras propiedades:
const studentEvan = {
  name: "Evan",
  surname: "Smith",
  country: "USA",
};
const { name: evanName, surname: evanSurname } = studentEvan;
console.log(evanName); // "Evan"
console.log(evanSurname); // "Smith"

// También podemos hacer un "destructuring" profundo, es decir,
// extraer propiedades de objetos anidados:
const student = {
  name: "Evan",
  surname: "Smith",
  country: {
    id: 21,
    name: "Spain",
    iso3: "SPA",
  },
};
const { name, country: { name: countryName, iso3 } } = student;
console.log(name); // "Evan"
console.log(countryName); // "Spain"
console.log(iso3); // "SPA"

// Incluso podemos aplicar "destructuring" sobre objetos que se
// pasan como argumento de una función:
const student = {
  name: "Evan",
  surname: "Smith",
  country: "USA",
};
const getName = ({ name }) => name;
console.log(getName(student));  // "Evan"


// "DESTRUCTURING" SOBRE ARRAYS

// Ejemplo a mano, sin "destructuring":
const students = ["Alan", "Evan", "Ana"];
const alan = students[0];
const evan = students[1];
const ana = students[2];
const nobody = students[3];
console.log(alan); // "Alan"
console.log(evan); // "Evan"
console.log(ana); // "Ana"
console.log(nobody); // undefined

// Pero con "destructuring" podemos asignar elementos existentes en 
// el array a variables de forma directa, en una línea:
// [!] El orden en la asignación se mantiene
const students = ["Alan", "Evan", "Ana"];
const [alan, evan, ana, nobody] = students;
console.log(alan); // "Alan"
console.log(evan); // "Evan"
console.log(ana); // "Ana"
console.log(nobody); // undefined

// Podemos omitir elementos intermedios usando la coma (,)
const students = ["Alan", "Evan", "Ana"];
const [, , ana] = students;
console.log(ana); // "Ana"

// Se puede aplicar "destructuring" sobre arrays pasados como
// argumento de una función:
const students = ["Alan", "Evan", "Ana"];
const getSecond = ([, second]) => second;
console.log(getSecond(students));  // "Evan"

// También se puede aplicar "destructuring" profundo en
// arrays bidimensionales.
const matrix = [
  [0, 0, 0],
  [0, 10, 0],
  [0, 0, 0]
];

const [, [, center]] = matrix;
console.log(center); // 10;


// "DESTRUCTURING" PARA REASIGNAR VARIABLES

// Supongamos un escenario en el que queremos reasignar variables:
let a = 5;
let b = 1;

// Y queremos reasignarlas. La forma clásica sería;
b = a + b;
a = a + 5;

// Con destructuring se podría compactar en una sola línea del siguiente modo:
[a , b] = [a + 5, a + b];