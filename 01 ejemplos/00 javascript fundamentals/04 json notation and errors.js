///-- NOTACIÓN JSON *******************************************************

// La notación JSON consiste en un objeto formado por clave : valor.
// Las claves obligatoriamente deben ser strings con comillas dobles.
// Los valores deben ser strings, números, booleanos, null, objetos y arrays.
// No puede tener comentarios
// No puede tener "trailing commas" a menos que sea para dar lugar a un siguiente elemento

/*
{
  "product": {
    "id": 13,
    "name": "Note 9",
    "type": "phone"
  }
};
*/

// Podemos serializar un objeto en formato JSON utilizando JSON.stringify

var product = {
  id: 13,
  name: "Note 9",
  type: "phone",
};

var jsonProduct = JSON.stringify(product);

console.log(jsonProduct); // {"id":13,"name":"Note 9","type":"phone"}
console.log(JSON.stringify(product, null, 4)); // Stringify con parámetros para formatear.
/*
{
    "product": {
        "id": 13,
        "name": "Note 9",
        "type": "phone"
    }
}
*/

// Podemos convertir de vuelta un string en formato JSON a objeto utilizando JSON.parse
var parsedProduct = JSON.parse(jsonProduct);
console.log(parsedProduct); // {id: 13, name: "Note 9", type:"phone"}

// Si el objeto está malformado lanzará un error:
JSON.parse('{"id":13,"name":"Note 9",`type`:"phone"}'); // Uncaught SyntaxError: Unexpected token ` in JSON at position 25
//                               backticks ~~~~~~~~~~^~~~~^


///-- ERRORES *******************************************************

// Para controlar los errores lanzados utilizamos el bloque try-catch-finally
var config = '{"port": 3002}';
var port;
try {
  // Bloque que puede lanzar errores
  port = JSON.parse(config);
} catch (err) {
  // Bloque donde actuamos si hay errores
  console.log("Catched error!!!", err);
  port = 3000;
} finally {
  // Bloque que queremos ejecutar tanto si hay errores como si no
  console.log('Port set up to', port);
}

// Podemos diferenciar entre tipos de errores basándonos en el tipo de instancia
// del error:

function doOperation() {
  he$-s*lloworld; // SyntaxError
  return a * 5; // ReferenceError
  return Array(-5); // RangeError
}

try {
  doOperation();
} catch (err) {
  if(err instanceof TypeError) {
    console.log('typeerror catched');
  } else if (err instanceof RangeError) {
    console.log('rangeerror catched');
  } else {
    console.log('another error');
  }
}


// Podemos crear objetos de tipo error:
var myErr = new Error('Not found');

// Dichos errores podemos lanzarlos utilizando el operador "throw"
throw myErr;

// [!] No es buena práctica el trabajo con errores ya que una mala
// gestión de los mismos puede provocar una salida abrupta del programa.
// Sólo deberían de ser usados en secciones que manejen control de errores
// Por ejemplo: Promises
