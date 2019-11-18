// *** OPTIONAL CHAINING ***************
// A partir de la versión 3.7 TypeScript añade soporte de Optional Chaining.
// Esto nos permite utilizar el operador '?' que nos permite acceder a
// propiedades de objetos que, en caso de ser 'null' o 'undefined' devolverán
// "undefined" y en caso de no serlo devolverán el valor de la propiedad a la
// que estamos atacando.
// Es importante habilitar strictNullChecks para ver las diferencias.

interface Country {
  id: number;
  name: string;
}

// Un usuario puede haberse configurado su perfil para indicar su país de forma opcional
interface Profile {
  id: number;
  username: string;
  email: string;
  country: Country | null;
}

const profile1: Profile = {
  id: 1193,
  username: "max",
  email: "max@gmail.com",
  country: null,
};

const profile2: Profile = {
  id: 1193,
  username: "max",
  email: "max@gmail.com",
  country: {
    id: 37,
    name: "Spain"
  }
};

let countryName;
countryName = profile1.country?.name || "N/A";
console.log(countryName); // "N/A"
countryName = profile2.country?.name;
console.log(countryName); // "Spain"


// *** NULL COALESCING ***************
// A partir de la versión 3.7 TypeScript añade soporte de Optional Chaining.
// Esto nos permite utilizar el operador '??', que funciona de manera similar
// al operador "||" pero sólo devuelve el segundo operando si el primero
// es "null" o "undefined" en vez de "falsy values"
// Es importante habilitar strictNullChecks para ver las diferencias.

