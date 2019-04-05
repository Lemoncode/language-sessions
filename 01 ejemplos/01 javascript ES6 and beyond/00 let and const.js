///-- LET/CONST *******************************************************

// "let" y "const" son 2 nuevas palabras reservadas en ES6 para declarar
// variables. Presentan una notable diferencia con respecto a "var",
// y es que tienen ámbito de bloque ("block scope") por lo tanto 
// se redefinen dentro de bloques tales como "if/else" o bucles "for".
// Mientras que "var" tenía ámbito de función (contexto de ejecución)
// ahora con "let" y "const" el ámbito es de bloque.
// Esto tiene una implicación: el "hoisting" tampoco es aplicado a 
// variables declaradas con "let" o "const".
// ¿Cuál es la diferencia entre ellas? "let" está pensado para valores
// reasignables, permite declarar la variable (con inicialización opcional)
// y modificarla tantas veces como queramos. "const", sin embargo, es
// constante, por lo que debe ser declarada e inicializada obligatoriamente,
// y no puede ser reasignada en un futuro.

// var
var a = 13;
a = 14;
console.log(a);

// let
let b; // let b = 13 . Inicialización opcional.
b = 14;
console.log(b);

// const
const c;  // Uncaught SyntaxError: unexpected token (requiere inicialización)

const c = 13; // Hay que inicializarla en su declaración.
console.log(c);
c = 14;  // Uncaught SyntaxError: Assignment to constant variable

// Cuidado por tanto y no usar "const" en sitios donde deba reasignarse
for (const i = 0; i < 10; i++) { // Uncaught TypeError: Assignment to constant variable
  console.log(i);
}

// Debemos aclarar, sin embargo, que no es lo mismo reasignar que mutar. "const" no es
// reasignable (no podemos cambiar la referencia a la que apunta una vez declarada) pero
// en caso de que el contendio de la variable sea un objeto, si que podemos mutar sus
// propiedades o métodos, sin que esto viole su característica de no-reasignable, puesto
// que la referencia al objeto sigue siendo la misma.
// [!] Asi que importante, no entendais el "const" como contenido constante, sino 
// referencia constante.
const list = ["hey", "ho", "let's go"];
list[2] = "yay";
console.log(list); // ["hey", "ho", "yay"]

const user = {
  name: "Adam",
  age: 12,
};
user.age = 22;
console.log(user); // {"name": "Adam", "age": 22}



// HOISTING

// A diferencia de "var", aquellas variables que se declaren usando
// "let" y "const" no les será aplicado el "hoisting":

// Con "var" gracias al hoisting:
function main() {
  console.log(message);
  var message = "hello";
  console.log(message);
}
main(); // undefined
        // "hello"

// Si cambiamos la declaración a "let", no habrá hoisting y la función
// lanzará un error:
function main() {
  console.log(message);
  let message = "hello";
  console.log(message);
}
main(); // Uncaught ReferenceError: message is not defined



// ÁMBITO

// El ámbito pasa a ser de bloque, variables "let" o "const" declaradas
// en bloques no puede ser accedidas desde fuera:
var list = [1, 2, 3];
for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}
console.log(i); // Uncaught ReferenceError: i is not defined

// Otro ejemplo con "scope"
function checkAccess(role) {
  let message = "You're not authorized";
  if(role === "admin") {
    let message = "Hello, admin";
    return message; // Quitar este return para comparar con "var" la diferencia.
  }
  return message;
}

console.log(checkAccess("admin")); // "Hello, admin"
console.log(checkAccess("user")); // "You're not authorized"


// [!] A partir de ahora OLVIDAOS DE VAR :P :)