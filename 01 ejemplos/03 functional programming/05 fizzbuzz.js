import {
  compose,
  concat,
  curry,
  equals,
  filter,
  flip,
  inc,
  isEmpty,
  last,
  lensIndex,
  map,
  modulo,
  not,
  of,
  over,
  pipe,
  times,
  view,
  when,
  xprod,
  __,
} from 'ramda';

// Ejemplo de composición para resolver el ejercicio "fizzbuzz" usando ramda

// La siguiente notación <function_name> :: <arg1> -> <arg2> -> ... -> <argN> -> <return>
// se lee: <function_name> toma <arg1>, <arg2>, <argN> y devuelve <return>


// fizzbuzz(15) [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
const isMultipleOf = curry(compose(equals(0), flip(modulo)));

const rule = (predicate, result) => when(
  compose(predicate, view(lensIndex(0))),
  over(lensIndex(1), concat(__, result))
);

const fizzBuzz = n => map(
  pipe(
    rule(isMultipleOf(3), 'Fizz'),
    rule(isMultipleOf(5), 'Buzz'),
    filter(compose(not, isEmpty)),
    last,
  ),
  xprod(times(inc, n), of(''))
);
