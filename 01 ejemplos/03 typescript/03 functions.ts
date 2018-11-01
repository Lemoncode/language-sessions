///-- FUNCIONES *******************************************************

// Tipar una función en TypeScript no es más que especificar los tipos
// de los argumentos que recibe y el tipo de dato que devuelve.
// Es importante tener en cuenta que el número de argumentos que 
// especifiquemos son obligatorios.
function toUpperWithReverse(value: string, reverse: boolean): string {
  const uppercased = value.toUpperCase();
  return reverse ?
    uppercased.split('').reverse().join('') :
    uppercased;
}

const res1 = toUpperWithReverse("secured arguments"); // [ts] Expected 2 arguments, but got 1
const res2 = toUpperWithReverse("secured arguments", false); // [ts] Expected 2 arguments, but got 1
console.log(res2); // "SECURED ARGUMENTS"

// Su homólogo en arrow function
const toUpperWithReverseArrow = (value: string, reverse: boolean): string => {
  const uppercased = value.toUpperCase();
  return reverse ?
    uppercased.split('').reverse().join('') :
    uppercased;
};

const res3 = toUpperWithReverseArrow("secured arguments"); // [ts] Expected 2 arguments, but got 1
const res4 = toUpperWithReverseArrow("secured arguments", true); // [ts] Expected 2 arguments, but got 1
console.log(res4); // "STNEMUGRA DERUCES"

// Utilizando el operador [?] sobre un argumento significa que dicho
// argumento es opcional a la hora de invocar a la función
const addQuantity = (base: number, extra: number, offset?: number) =>
  offset ?
    (base + extra) * offset :
    base + extra;

const res5 = addQuantity(52, 29); // 81
const res6 = addQuantity(112, 35, 0.3); // 29.4

// Si no pasamos explícitamente un argumento opcional su valor es, 
// al igual que en JavaScript, undefined.
const concatStrings = (text: string, other?: string): string => text + other;
const res7 = concatStrings("Here is "); // "Here is undefined"

// También es posible declarar el tipo de valores por defecto, aunque
// por lo general es más legible el no declarar el tipo y dejar que 
// TypeScript lo infiera.
// [!] No se puede mezclar el operador opcional con valores por defecto aunque al inspeccionar el tipo ya es opcional
const secureConcatStrings = (text: string, other: string = "Johny") => text + other;
const res8 = secureConcatStrings("Here is "); // "Here is Johny"

// También podemos utilizar el operador type para
// declarar el tipo de una función anónima (esto se conoce como 
// ALIAS y lo veremos un poco más adelante):
type stringMapper = (value: string) => string;
const toLower: stringMapper = (value) => value.toLowerCase();
console.log(toLower("ArrowFunction using TYPE")); // "arrowfunction using type"

// También es posible tipar argumentos que son funciones:
function squareAndPass(value: number, callback: (v: number) => string): number {
  const valueAfterCallback = callback(value * value);
  return valueAfterCallback.length / 2;
}

const repeatV = (length) => Array.from({ length }, () => 'V').join('');
console.log(squareAndPass(4, repeatV)); // 8

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
