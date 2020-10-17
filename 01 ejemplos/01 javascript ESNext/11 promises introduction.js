///-- PROMISE INTRODUCTION ***********************************************

// Para dominar JavaScript es imprescindible tener unas buenas nociones
// de asincronía y conocer el "Event Loop" que implementa el lenguaje
// como solución para gestionar eventos y llamadas asíncronas.
// Recomendamos encarecidamente la lectura de la siguiente guía:
// https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono

// Una llamada asíncrona es aquella donde la tarea asociada se ejecuta
// fuera del contexto de nuestra aplicación,y por tanto nuestra aplicación
// no consume recursos (CPU). A esto se le conoce como operaciones de
// entrada/salida (I/O Operations). Pensad en un acceso a disco o en una
// consulta a servidor.
// Además, en las llamadas asíncronas, la respuesta se notifica a nuestro
// programa, evitando que quede bloqueado a la espera de una respuesta.
// Es decir, nuestro programa lanza la llamada asíncrona, continúa su
// ejecución y en algún momento será notificado con la respuesta a dicha
// llamada.

// *** CALLBACKS
// El patrón mas sencillo para manejar llamadas asíncronas son los
// CALLBACKS, es decir, una función que se pasa como argumento de otra.
// La finalidad del callback es registrar el código que debe ser ejecutado
// una vez tengamos nuestra respuesta. Ejemplo:

// setTimeout es una de las llamadas asíncronas más sencillas que hay:
// postpone la ejecución de un callback, como mínimo, a X segundos después.
const callback = () => console.log("Hello World! con retardo");
setTimeout(callback, 1000);

// Al ser asíncrona, nuestra aplicación sigue corriendo:
const callback = () => console.log("Hello World! con retardo");
setTimeout(callback, 1000);

console.log("No estoy bloqueada, puedo ejecutar código");

// Resultado por consola:
// > No estoy bloqueada, puedo ejecutar código
// > Hello World! con retardo

// [OPCIONAL] Podríamos hacer un mock a una llamada a servidor:
const serverData = 43;
const getDataAsync = (callback) => {
  setTimeout(
    () => callback(serverData), // callback del setTimeout
    Math.random() * 1000 + 2000 // Random entre 1s y 3s.
  );
};

getDataAsync(console.log); // Ejemplo de uso.

// *** PROMESAS
// Una promesa es un objeto que representa el resultado de una operación
// asíncrona. Este resultado podría estar disponible ahora o en el futuro.
// Una promesa puede tener los siguientes estados:
// - A la espera de respuesta -> PENDING
// - Operación completada con éxito -> FULFILLED or RESOLVED
// - Operación rechazada con fallo o error -> REJECTED

// Las promesas se basan en callbacks pero son una evolución de éstos, una
// mejora, que añade azúcar sintáctico para un mejor manejo.

// *Analogía de la pizza y el beeper*

// CONSUMIENDO PROMESAS
// Cuando llamamos a una función asíncrona implementada con Promesas, nos
// devolverá inmediatamente un objeto promesa como garantía de que la
// operación asíncrona se ha puesto en marcha y finalizará en algún momento,
// ya sea con éxito o con fallo.
// Una vez que tengamos el objeto promesa en nuestro poder, lo usamos para
// registrar 2 callbacks: uno para indicar 'que se debe hacer en caso de
// que todo vaya bien' (resolución de la promesa o resolve) y otro para
// indicar 'que hacer en caso de fallo' (rechazo de la promesa o reject).

fetch("https://api.github.com/users/lemoncode")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

// Encadenando promesas. El resolveCallback de una promesa, podría devolver
// otra promesa, en cuyo caso pueden encadenarse. Solo será necesario
// especificar un rejectCallback (un único catch()) para cualquiera de las
// promesas encadenadas.
fetch("https://api.github.com/users/lemoncode")
  .then((response) => response.json())
  .then((data) => console.log(data)) // Muestra el resultado de la promesa `response.json()`
  .catch((error) => console.error(error));

// CREANDO PROMESAS
// Una promesa se crea instanciando un nuevo objeto Promise. En el momento
// de la creación, en el constructor, debemos especificar un callback que
// contenga la carga de la promesa, aquello que la promesa debe hacer.
// Este callback nos provee de dos argumentos: resolveCallback y
// rejectCallback. Te suenan, ¿verdad? Son los dos mismos callbacks
// que se registrarán al consumir la promesa. De este modo, depende de ti
// como desarrollador llamar a resolveCallback y rejectCallback cuando sea
// necesario para señalizar que la promesa ha sido completada con éxito
// o con fallo.

// Modifiquemos el ejemplo anterior en el que haciamos un mock de llamada
// a servidor para adaptarlo al patrón de promesas:
const getDataAsync = (callback) => {
  setTimeout(
    () => callback(Math.ceil(Math.random() * 100)), // callback del setTimeout
    Math.random() * 2000 + 1000 // Random entre 1s y 3s.
  );
};

const getDataWithPromise = () => {
  return new Promise((resolve, reject) => {
    try {
      getDataAsync(resolve);
      // throw new Error("Servidor no pudo procesar la petición"); // Probar el catch()
    } catch (e) {
      reject(e);
    }
  });
};

// Su utilización sería:
getDataWithPromise()
  .then((data) => console.log(data))
  .catch((error) => console.log(`ERROR CAPTURADO: ${error}`));

// *** MANEJANDO MÚLTIPLES PROMESAS [OPCIONAL SI DA TIEMPO]

// Hagamos otra función que devuelve promesa basada en la anterior. El objetivo
// De esta nueva función es wrapear a getDataWithPromise para mostrar por consola
// el resultado devuelto en cada llamada.
const getDataAndLog = () =>
  getDataWithPromise().then((data) => {
    console.log(data);
    return data;
  });

// Promise Race: devuelve una nueva promesa que se resuelve con el resultado o
// rechazo de la primera promesa que termine:
Promise.race([
  getDataAndLog(),
  getDataAndLog(),
  getDataAndLog(),
  getDataAndLog(),
  getDataAndLog(),
]).then((winner) => console.log("And the winner is ...", winner));

// Promise All: devuelve una nueva promesa que se resuelve con el array de resultados
// de todas las promesas de entrada. Por tanto se resolverá cuando todas las promesas
// se completen. Si alguna promesa es rechazada, entonces Promise.all también se rechaza.
// Por tanto espera a que todas se cumplan o al primer rechazo.
// El array de resultados preserva el mismo orden que el array de promesas de entrada.
Promise.all([
  getDataAndLog(),
  getDataAndLog(),
  getDataAndLog(),
  getDataAndLog(),
  getDataAndLog(),
]).then((result) => console.log("And the result is ...", result));

// *** ASYNC / AWAIT [OPCIONAL SI DA TIEMPO]

// Las promesas, al igual que los callbacks, pueden llegar a ser tediosas
// cuando se anidan y se requieren más y más .then(). Async / Await son 2
// palabras clave que surgieron para simpificar el manejo de las promesas.
// Son azúcar sinctáctico para reducir el anidamiento y manejar código
// asíncrono como si de código síncrono se tratara.

const getDataWithSugar = async () => {
  const data = await getDataWithPromise();
  return data;
};

// Su utilización sería:
getDataWithSugar()
  .then((data) => console.log(data))
  .catch((error) => console.log(`ERROR CAPTURADO: ${error}`));

// [OPCIONAL] Versión con manejo de errores:
const getDataWithSugar = async () => {
  try {
    const data = await getDataWithPromise();
    return data;
  } catch (e) {
    throw new Error(`ERROR LANZADO: ${e}`);
  }
};

// Manejo de Múltiples Promesas con Async / Await

// OPCION 1. Las promesas se lanzan y se esperan secuencialmente OJO!
const getMultiDataWithSugar = async () => {
  const data1 = await getDataWithPromise();
  const data2 = await getDataWithPromise();
  const data3 = await getDataWithPromise();
  const data4 = await getDataWithPromise();
  const data5 = await getDataWithPromise();
  return [data1, data2, data3, data4, data5];
};
getMultiDataWithSugar().then(console.log);

// OPCIÓN 2. Lanzamos todas las promesas primero, y hacemos la espera de todas
// a la vez, al estilo de Promise.all().
const getMultiDataWithSugar = async () => {
  const promise1 = getDataWithPromise();
  const promise2 = getDataWithPromise();
  const promise3 = getDataWithPromise();
  const promise4 = getDataWithPromise();
  const promise5 = getDataWithPromise();
  const data1 = await promise1;
  const data2 = await promise2;
  const data3 = await promise3;
  const data4 = await promise4;
  const data5 = await promise5;
  return [data1, data2, data3, data4, data5];
};
getMultiDataWithSugar().then(console.log);
