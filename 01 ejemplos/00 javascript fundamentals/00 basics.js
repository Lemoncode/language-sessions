///-- EXPRESIONES BÁSICAS *************************************************

// Asignación de valores a variables
var a = 3;

// multiples asignaciones
var b = 10, c = "hello";

// comentarios
var a = 4; // a value is 4

// comentarios de bloque
/*
var c = 3;
var d = 4;
*/
var a = 5;



///-- TIPOS DE DATOS ******************************************************

// 7 tipos primitivos + Objetos


// PRIMITIVOS

// Aquellos que trae el lenguaje por defecto. Un typo primitivo es aquel
// que no es un objeto y por tanto no tiene métodos.

// string
"hello world" // dobles comillas
'hello world' // comillas simples
''
""

// number
101       // entero positivo
  - 200      // entero negativo
1220.31   // flotante
1e6       // notación exponencial (1 x 10^6)
Infinity  // infinito
NaN       // NotANumber (de hecho es de tipo número)

// boolean
true
false

// null
null

// undefined
undefined

// symbol
// [!] Lo veremos en más adelante en el apartado ES6 and beyond

// bigint
// [!] Bajo Implementación ES2020. Nuevo tipo numérico para representar
// enteros de cualquier tamaño, con cualquier precisión.


// OBJETOS

// object
// [!] Los objetos y estructuras de datos (arrays) se darán en el siguiente capítulo

// funciones (Son un tipo especial de objetos en JS)
function main(arg) {
  console.log(arg);
  return arg;
}

console.log(typeof main); // "function" Aunque en el fondo, es también un objeto, un objeto especial.



///-- OPERADORES *******************************************************

// 1. Operadores ARITMÉTICOS
console.log(52 + 21); // 73
console.log("hello " + "world"); // "hello world"
console.log(10 - 5); // 5
console.log(10 * 10); // 100;
console.log(9 / 3); // 3
console.log(15 / 2); // 7.5;
console.log(15 % 3); // 0 (Módulo o resto)
console.log(2 ** 3); // 8 (Exponenciación)

// [copy-paste version]
console.log(52 + 21);
console.log("hello " + "world");
console.log(10 - 5);
console.log(10 * 10);
console.log(9 / 3);
console.log(15 / 2);
console.log(15 % 3);
console.log(2 ** 3);

// Asignaciones con operadores aritméticos
var num = 3;
console.log(num++); // 3 (increases after console.log)
console.log(num--); // 4 (decreases after console.log)
console.log(++num); // 4 (increases before console.log)
console.log(--num); // 3 (decreases before console.log)
num += 5; // Equivalent to num = num + 5
console.log(num); // 8
num -= 5; // Equivalent to num = num - 5
console.log(num); // 3
num *= 10; // Equivalent to num = num * 10
console.log(num); // 30
num /= 6; // Equivalent to num = num / 6
console.log(num); // 5
num %= 3; // Equivalent to num = num % 3
console.log(num); // 2
num **= 10 // Equivalent to ten times num * num or Math.pow(2, 10)
console.log(num) // 1024

// [copy paste version]
var num = 3;
console.log(num++);
console.log(num--);
console.log(++num);
console.log(--num);
num += 5;
console.log(num);
num -= 5;
console.log(num);
num *= 10;
console.log(num);
num /= 6;
console.log(num);
num %= 3;
console.log(num);
num **= 10
console.log(num);


// 2. Operadores de COMPARACIÓN
// Mayor que, menor que, igualdad, desigualdad

console.log(3 > 0); // true
console.log(3 < 0); // false
console.log(3 > 3); // false
console.log(3 < 3); // false
console.log(3 >= 3); // true
console.log(3 <= 3); // true
console.log(5 == 5); // true

// [copy paste version]
console.log(3 > 0);
console.log(3 < 0);
console.log(3 > 3);
console.log(3 < 3);
console.log(3 >= 3);
console.log(3 <= 3);
console.log(5 == 5);



// "TYPE COERCION"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Puesto que JS no es un lenguaje tipado, se puede comparar miembros de 
// distinta naturaleza (distinto tipo). En tal caso, la estrategia que 
// sigue JS es convertir implicitamente uno de los miembros o los dos a un 
// tipo común para poder realizar la comparativa. A esto se le llama 
// "type coercion" o "conversión implícita/automática".
console.log(5 == "5");    // true // [!] Loose equality. Igualdad débil. (Por type coertion, "5" string se convierte a 5 numero)
console.log(5 === "5");   // false // [!] Strict equality. Igualdad fuerte.
console.log(5 != 5);      // false
console.log(5 != "5");    // false. (Por type coercion, "5" string se convierte a 5 numero)
console.log(5 !== 5);     // false
console.log(5 !== "5");   // true
console.log(0 == false);  // true. (Por type coercion, false se castea a 0)
console.log(0 === false); // false. (number != boolean)

// [copy paste version]
console.log(5 == "5");
console.log(5 === "5");
console.log(5 != 5);
console.log(5 != "5");
console.log(5 !== 5);
console.log(5 !== "5");
console.log(0 == false);
console.log(0 === false);
console.log(true + false);

// Type coertion o casteo de tipos también se aplica a otros operadores
console.log(true + false); // 1. (1 + 0)
console.log(true - false); // 1. (1 - 0)
console.log("num" + 3); // "num3". 3 (numero) se castea a "3" (string) y se concatena. 
console.log(3 + "num"); // "3num". 3 (numero) se castea a "3" (string) y se concatena.
// ¿Y esto que daría?
console.log("num" - 3); // NaN. Porque convierte "num" (string) a NaN (número) y NaN - 3 = NaN.
// ¿Pero y esto otro?
console.log("" - 3); // -3. Porque convierte "" (string vacio) a 0 (número) y 0 - 3 = -3.


// 3. Operadores LÓGICOS

// && AND
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false

// || OR
console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false

// IMPORTANTE. De nuevo, JS puede tener operandos de distinta naturaleza.
// Los operadores && y ||, cuando se usan con operandos no booleanos
// pueden devolver un resultado no booleano, cualquiera: array, objeto ...

// Por ejemplo:
var a = 3 || 20; // 3.

// Para saber que operando se devuelve, JS tiene que evaluarlos como booleanos
// ya que los operadores lógicos trabajan con operandos booleanos.
// En JavaScript, al convertir o evaluar cualquier valor como booleano, pueden suceder
// 2 cosas, que nos de true o que nos de false. A los valores que nos dan false se le
// conocen como "falsy values" y son sólamente estos:
0;
NaN;
false;
"";
null;
undefined;
// el resto de valores serán evaluados como "truthy values"

// MAS EJEMPLOS:
var a = 3 || 20; // 3. El 3 es el primer valor "truthy" que se encuentra el OR.
var a = 0 || 20; // 20. El 20 es el primer valor "truthy" que se encuentra el OR.
var a = Boolean(0 || 20); // true
var a = 3 && 20; // 20
var a = 0 && 20; // 0
var a = Boolean(0 && 20); // false
var a = 2 > 0 && "hello"; // "hello"
var a = 2 < 0 && "hello"; // false

// [copy paste version]
var a = 3 || 20;
var a = 0 || 20;
var a = Boolean(0 || 20);
var a = 3 && 20;
var a = 0 && 20;
var a = Boolean(0 && 20);
var a = 2 > 0 && "hello";
var a = 2 < 0 && "hello";

// 4. Operadores BITWISE u operadores de bits
// No los daremos pero sabed que existen y que son poco frecuentes.
// Suelen ser utilizados en implementaciones de algoritmos más "a bajo nivel"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise



///-- DIRECTIVAS DE CONTROL *******************************************************

// if
if (3 > 0) {
  console.log("greater");
}

// if sin llaves, no necesarias
if (3 > 0) console.log("greater");

// else
var user = "admin";
if (user == "admin") {
  console.log("Hello admin");
} else {
  console.log("hello, user");
}

// else sin llaves, no necesarias (1 sola linea)
var user = "admin"
if (user == "admin") console.log("Hello admin");
else console.log("hello, user");

// else if
var year = 2018;
if (year < 2015) {
  console.log("year is smaller than 2015");
} else if (year > 2015) {
  console.log("year is greater than 2018");
} else {
  console.log("year is exactly 2015");
}

// else if sin llaves, no necesarias (1 sola linea)
var year = 2018;
if (year < 2015) console.log("year is smaller than 2015");
else if (year > 2015) console.log("year is greater than 2018");
else console.log("year is exactly 2015");

// switch
var animal = "dog";
switch (animal) {
  case "bird":
    console.log("It has wings.");
    break;
  case "dog":
    console.log("It has legs");
    break;
  case "dolphin":
    console.log("It has fins");
    break;
  default:
    console.log("I don't know what it has");
}

// switch con reuso de casos
var animal = "dog";
switch (animal) {
  case "dog":
  case "dolphin":
    console.log("Mammal");
    break;
  case "bird":
  default:
    console.log("Non-mammal");
}

// operador ternario
var age = 20;
var status = (age >= 18) ? "adult" : "minor";

// operador ternario sin paréntesis, no necesario
var status = age >= 18 ? "adult" : "minor";

// anidamiento de ternarios "ternary nesting"
var year = 2018;
var result = (year === 2015) ?
  "year is 2015" :
  (year > 2015) ?
    "year is greater than 2015" :
    "year is smaller than 2015";

// bucle "for"
var limit = 10;
for (var i = 0; i < limit; i++) {
  console.log(i);
}

// múltiples asignaciones en bucle "for"
for (var i = 0, limit = 10; i < limit; i++) {
  console.log(i);
}

// bucle "while"
var limit = 10;
var i = 0;
while (i < limit) {
  console.log(i);
  i++;
}

// bucle "do while"
var limit = 10;
var i = 0;
do {
  console.log(i);
  i++;
} while (i < limit);

// [!] for..in que será vista con los objetos
// [!] forEach() se verá con los arrays

// operador coma
var a = (2 + 4, 9);
console.log(a); // 9
var b = 3;
var a = (b += 5, 10);
console.log(a); // 10
console.log(b); // 8;
