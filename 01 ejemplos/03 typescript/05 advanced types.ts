///-- TIPOS AVANZADOS *******************************************************

// Hasta ahora hemos visto la base de Typescript sobre la que se sustenta
// todo el chequeo de tipos. Pero la verdadera potencia llega con los tipos
// avanzado.


// INTERSECCIÓN

// Con la intersección podemos combinar múltiples tipos en uno solo. Sería
// equivalente al operador AND pero con tipos. Es muy util para componer:
interface WithColor {
  color: string;
}

interface WithShape {
  shape: string;
}

const describeObject = (obj: WithColor & WithShape): string =>
  `Your object is ${obj.color} and with ${obj.shape} shape`;

console.log(describeObject({ color: "yellow", shape: "round" }));
console.log(describeObject({ color: "blue" })); // TS error: Property 'shape' is missing.



// UNION


// Siguiendo la analogía anterior, la unión de tipos sería entendida como
// el operador OR.
// La unión de tipos es muy util para indicar que una determinada
// entidad podrá ser de un tipo u otro, ámbos válidos.

// Por ejemplo, sin unión, tendriamos que recurrir al any para admitir
// argumentos de tipo string o númerico:
const saySomething = (message: any) => console.log(message);

// Pero con la unión, restringimos el argumento a los tipos deseados:
const saySomethingTyped = (message: string | number) => console.log(message);

saySomethingTyped(true) // Argument of type 'true' is not assignable


// GUARDAS

// La situación anterior, sin embargo, puede llevarnos a un escenario donde
// tengamos que comprobar de que tipo concreto es un determinado argumento
// recibido, de entre todos los posibles tipos de su unión.

// Imaginemos la siguiente situacion, 2 interfaces y una función que devuelve
// uno u otro de forma aleatoria:

const randomBool = (): boolean => Boolean(Math.round(Math.random()));

interface Human {
  sleep: () => void;
}

interface Man extends Human {
  moustache: boolean;
}

interface Woman extends Human {
  longHair: boolean;
}

const randomMan = (): Man => ({
  moustache: randomBool(),
  sleep: () => console.log("Man is zzz"),
});

const randomWoman = (): Woman => ({
  longHair: randomBool(),
  sleep: () => console.log("Woman is zzz"),
});

const getRandomPerson = (): Man | Woman =>
  randomBool() ? randomMan() : randomWoman();


// ¿Cómo se que tengo un hombre o una mujer devueltos?
const person = getRandomPerson();
if (person.moustache) { }  // Intellisense error
if (person.longHair) { } // Intellisese error

// [!] El acceso a estas propiedades causa un error porque tenemos
// que DESAMBIGUAR el tipo. Para ello recurrimos a las GUARDAS.
// Podemos construirlas de distintas maneras:

// -- Guardas Definidas por el Usuario

// Estas guardas se usan cuando queremos desambiguar objetos.
// Una forma podría ser aplicando "duck typing" mediante el operador
// "in" para comprobar de forma segura que una propiedad existe
// en un objeto:
if ("moustache" in person) {
  console.log("Man with moustache:", person["moustache"]);
} else if ("longHair" in person) {
  console.log("Woman with long hair:", person["longHair"]);
}

// Otra forma más habitual para hacer el "duck typing" consiste en
// hacer uso de la aseveración de tipos para discriminar entre
// uno u otro:
if ((person as Man).moustache !== undefined) {
  console.log("Man with moustache:", (person as Man).moustache);
} else if ((<Woman>person).longHair !== undefined) {
  console.log("Woman with long hair:", (<Woman>person).longHair);
}

// Una forma más eficiente para este tipo de guardas sería haciendo
// uso de de una funcion especial de chequeo que devuelve un
// "type predicado":
const isMan = (whoever: any): whoever is Man =>
  (<Man>whoever).moustache !== undefined;

if (isMan(person)) {
  console.log("Man with moustache:", person.moustache);
} else {
  console.log("Woman with long hair:", person.longHair);
}

// -- Guardas con "typeof"

// Cuando queremos desambiguar tipos primitivos, podemos recurrir
// al operador "typeof":
const giveMeSomething = (): number | string =>
  randomBool() ? 13 : "trece";

const something = giveMeSomething();
if (typeof something === "number") { }


// -- Guardas con "instanceof"

// Cuando queremos desambiguar clases, es habitual recurrir
// al operador "instanceof":
class Bool { value: boolean };

const giveMeSomeClass = (): Bool | String =>
  randomBool() ? { value: true } : "trece";

const someClass = giveMeSomeClass();
if (someClass instanceof Bool) console.log("Is Bool");
else console.log("Is String");



// ALIAS

// Un alias no es más que un nuevo nombre para un tipo, sea cual sea,
// tipos primitivos, interfaces, funciones, uniones, etc:
// Es muy util para REUSAR tipos cuya definición es más compleja o verbosa
// de forma fácil y eficiente, sin tener que repetirla una y otra vez.
type Message = string | number;
type FunctionVoid = () => void;
type Whatever<T> = {
  value: T;
}

// Incluso un alias puede referirse a si mismo y aparecer en una
// propiedad. POP POP POP:
type SomethingIterable<T> = T & { next: SomethingIterable<T> };

interface Student {
  name: string;
}

let myClass: SomethingIterable<Student>;
myClass.name;
myClass.next.name;
myClass.next.next.name;



// STRING LITERALS

// Muy útil para hacer que un tipo solo pueda tomar determinados
// string literales como posibles valores, es decir, limitamos los
// posible string que puede tomar como valores a un conjunto dado:
type WorkDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
const day: WorkDay = "sunday";  // "sunday" is not assignable.



// NUMERIC LITERALS

// Igual pero con números:

const throwDice = (): 1 | 2 | 3 | 4 | 5 | 6 => {
  return 6; // Dado trucado MUAHAHAHAHA.
}



// KEYOF

// Operador muy util para extraer las propiedades de un interfaz como
// posibles literales de un tipo concreto:
interface Week {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

type WeedDay = keyof Week;




// TIPOS CONDICIONALES

// Permite mapear a diferentes tipos comprobando el valor de otro.
// En la practica es equivalente a poder usar ternarios para tipos.
// Ejemplo:

type DarkColors = "black" | "grey";
type LightColors = "white" | "yellow" | "pink";

type Status = "sad" | "happy";

type Palette<T extends Status> = T extends "sad" ?
  DarkColors : LightColors;

const palette: Palette<"sad"> = "black";  // Only black or grey allowed.
