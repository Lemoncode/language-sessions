// *** OPTIONAL CHAINING & NULL COALESCING ***************

// OPTIONAL CHAINING
// A partir de la versión 3.7 TypeScript añade soporte de Optional Chaining.
// Esto nos permite utilizar el operador '?' que nos permite acceder a
// propiedades de objetos que, en caso de ser 'null' o 'undefined' devolverán
// "undefined" y en caso de no serlo devolverán el valor de la propiedad a la
// que estamos atacando.

// NULL COALESCING
// A partir de la versión 3.7 TypeScript añade soporte de Null Coalescing.
// Esto nos permite utilizar el operador '??', que funciona de manera similar
// al operador "||" pero sólo devuelve el segundo operando si el primero
// es "null" o "undefined" en vez de "falsy values"

// *Se puede habilitar strictNullChecks para ver las diferencias.

// -- Caso Práctico --
interface Profile {
  id: number;
  name: string;
  stats?: {
    likes: number;
    rt: number;
  };
}

const CreateProfile = (): Profile => ({
  id: 3643,
  name: "Javi",
  stats: {
    rt: 4,
    likes: 15, // Suponer que es 0 también para el null coalescing.
  },
});

const myProfile = CreateProfile();

// -- Optional Chaining --
// Supongamos que address no existe en nuestro "myProfiles".
// console.log(myProfile.address.num); // Poco robusto, candidato a petar.
console.log(myProfile && myProfile.stats && myProfile.stats.likes); // Chequeos inline, engorroso
console.log(myProfile ?.stats ?.likes || "Not Available"); // Optional chaining, más elegante.

// -- Null Coalescing --
// Supongamos que likes=0, problema, es un falsy value. En la linea anterior
// habría devuelto "Not Available". Con null coalescing evaluamos si es
// null o undefined solamente.
console.log(myProfile ?.stats ?.likes ?? "Not Available");
