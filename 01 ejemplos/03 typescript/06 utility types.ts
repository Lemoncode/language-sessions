///-- TIPOS GENÉRICOS DE UTILIDADES *******************************************************

// *** PARTIAL

// Convierte en opcionales las propiedades de un interfaz, en la practica
// esto permite usar implementaciones parciales de un tipo o interfaz:

// - Definition -
interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>;

// - Use Case -
interface GlobalState {
  prop1: string;
  prop2: number;
  prop3: boolean;
}

const createState = <T = any>(initialState: T) => {
  let state: T = initialState;

  return {
    setState: (partialState: Partial<T>): T => {
      return state = { ...state, ...partialState };
    },
  }
}

const { setState } = createState<GlobalState>({ prop1: "hola", prop2: 43, prop3: true });

console.log(setState({ prop2: 34 }));

// *** REQUIRED

// La contraparte de Partial, convierte en requeridas las propiedades de una
// interfaz

interface Coords {
  x: number;
  y: number;
  z?: number;
}

type Coords3D = Required<Coords>;

const cs: Coords3D = { // TS: Property 'z' is missing
  x: 3,
  y: 0,
};


// *** READONLY

// Convierte todas las propiedades en solo lectura:

// - Definition -
interface State {
  username: string;
  password: string;
}
type RState = Readonly<State>

// - Use Case -
const state: State = {
  username: 'santi',
  password: 's3cr37'
};

state.password = 'cloud'; // Cannot assign to 'password' because it is a read-only property.


// *** RECORD

// Es un tipo bastante útil para crear tipos de objetos con claves definidas y/o
// valores definidos

type Cloth = 'shirt' | 'shoes' | 'trousers';

type ClothSizes = Record<Cloth, number>;

const resolutions: ClothSizes = {
  shirt: 38,
  trousers: 44,
  shoes: 41,
};


// *** PICK

// Pick nos permite extraer un subconjunto de propiedades de una interfaz
interface Employee {
  firstName: string;
  surname: string;
  employeeId: number;
  age: number;
}

type EmployeeResume = Pick<Employee, 'firstName' | 'surname'>;

const employeeResume: EmployeeResume = {
  firstName: 'John',
  surname: 'Doe',
  age: 35, // Object literal may only specify known properties, and 'age' does not exist in type ...
};


// *** OMIT

// Omit sería el opuesto a Pick: permite crear un tipo con todas las propiedades menos las especificadas

type User = Omit<Employee, 'employeeId'>;

const user: User = {
  age: 52,
  firstName: 'Alan',
  surname: 'Walker',
};


// *** RETURNTYPE

// De las más recientes adquisiciones (TS 2.8) permite inferir el tipo de dato que devuelve una función

const addTimestamp = (user: User) => ({ ...user, timestamp: Date.now() });
type UserWithTimestamp = ReturnType<typeof addTimestamp>;
