///-- DEFAULT ARGUMENTS *******************************************************

// A partir de ES6 podemos asignar valores por defecto a los argumentos de una función:
const greet = (name = "Unknown") => "Hello, " + name;

console.log(greet()); // "Hello, Unknown"
console.log(greet("Jake")); // "Hello, Jake"

// Los valores por defecto son aplicados si el argumento es específicamente undefined
console.log(greet(undefined)); // "Hello, Unknown"
console.log(greet(null)); // "Hello, null"

// Se pueden aplicar valores por defecto a variables asignadas por destructuring
function getName({name = "Unknown"}) {
  console.log(name);
}
getName({age: 24}); // "Unknown"
getName({name: "Carl"}); // "Carl"
getName({}) // "Unknown"

// PREGUNTA: Pero ¿que creeis que pasaría si llamo a la función sin argumento?
// ¿o con argumento null u objeto vacío?

getName(); // [!] Si no inicializamos el parametro a {} esto daría TypeError.

// Para evitar esos errores tenemos que inicializar también el argumento completo
// como objeto vacío, no solo su propiedad name.
function getName({name = "Unknown"} = {}) {
  console.log(name);
}

getName(); // Unknown. Ahora si!

// Este sería el único caso todavía problemático.
// Al ser null un objeto no se toma la inicialización por defecto, el problema es
// que no se puede hacer destructuring sobre null.
getName(null); // [!] Uncaught TypeError.

// Ejemplo con arrays:
function sumDice([d1 = 0, d2 = 0] = []) {
  return d1 + d2;
}
console.log(sumDice()); // 0
console.log(sumDice([])); // 0
console.log(sumDice([3])); // 3
