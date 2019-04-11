///-- FUNCIONES *******************************************************

// Tipar una función en TypeScript no es más que especificar los tipos
// de los argumentos que recibe y el tipo de dato que devuelve.
// Es importante tener en cuenta que el número de argumentos que 
// especifiquemos son obligatorios.
function shout(text: string, upperCase: boolean): string {
  return (upperCase ? text.toUpperCase() : text) + "!!!";
}

const t1 = shout("hi"); // [ts] Expected 2 arguments, but got 1
const t2 = shout("hi", true);
console.log(t2); // "HI!!!"

// Su homólogo en arrow function
const shout = (text: string, upperCase: boolean): string =>
  (upperCase ? text.toUpperCase() : text) + "!!!";

const t3 = shout("hi"); // [ts] Expected 2 arguments, but got 1
const t4 = shout("hi", false);
console.log(t4); // "hi!!"

// Utilizando el operador [?] sobre un argumento significa que dicho
// argumento es opcional a la hora de invocar a la función
const shout = (text: string, upperCase?: boolean): string =>
  (upperCase ? text.toUpperCase() : text) + "!!!";

// Si no pasamos explícitamente un argumento opcional su valor es, 
// al igual que en JavaScript, undefined.
console.log(shout("hi")); // "hi!!!" ---> upperCase = undefined.

// También es posible declarar el tipo de valores por defecto, aunque
// por lo general es más legible el no declarar el tipo y dejar que 
// TypeScript lo infiera.
// [!] No se puede mezclar el operador opcional con valores por defecto
// aunque al inspeccionar el tipo ya es opcional
const shout = (text: string, upperCase: boolean = true): string =>
  (upperCase ? text.toUpperCase() : text) + "!!!";

console.log(shout("hi")); // "HI!!!"

// También podemos utilizar el operador type para
// declarar el tipo de una función anónima (esto se conoce como 
// ALIAS y lo veremos un poco más adelante):
type ShoutFunction = (text: string, upperCase: boolean) => string;
const shout: ShoutFunction = (text, upperCase) =>
  (upperCase ? text.toUpperCase() : text) + "!!!";

console.log(shout("TS rocks", true));

// También es posible tipar argumentos que son funciones:
const shout = (text: string, getNumExclamation: () => number): string =>
  text.toUpperCase() + "!".repeat(getNumExclamation());

const getRandom = () => (Math.random() * 10) + 1; // Este es mi callback.

console.log(shout("WoW", getRandom));
console.log(shout("WoW", getRandom));
console.log(shout("WoW", getRandom));
console.log(shout("WoW", getRandom));
console.log(shout("WoW", getRandom));
console.log(shout("WoW", getRandom));


// Sobrecarga de funciones (mismos nº argumentos, diferente tipo)
function switchType(c: string): number;
function switchType(c: number): string;
function switchType(c) {
  if (typeof c === 'string') {
    return Number(c);
  } else {
    return String(c);
  }
}

const r1 = switchType(3);
const r2 = switchType("65");
const r3 = switchType({}); // [ts] Argument of type '{}' is not assignable to parameter of type 'number'
