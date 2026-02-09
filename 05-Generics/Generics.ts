/*
// Generics

// without generics
// 1. give function a specific type
const doSomething = (a: number): number => {
  console.log(a);
  return a;
};
// 2. or give `any` type
const doSomethingAny = (a: any): any => {
  console.log(a);
};

// use generics
// const doSomethingGenerics = <Type>(a: Type): Type => {
//   return a;
// };
// or
function doSomethingGenerics<Type>(a: Type): Type {
  return a;
}

// Generic Types
// type of generic functions
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;

// different name
let myIdentityInput: <Input>(arg: Input) => Input = identity;
// use object literal type
let myIdentityObject: { <Type>(arg: Type): Type } = identity;
*/

// generics in interface
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

// Generic Classes
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;

  constructor(zeroValue: NumType, add: (x: NumType, y: NumType) => NumType) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

// Generic Constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// using Type Parameters
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
// getProperty(x, "m"); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.

// Using Class Types in Generics

class DogKeeper {
  behavior: string = "playing plate";
}

class CatKeeper {
  behavior: string = "playing hairball";
}

class Pets {
  legs: number = 4;
}

class Dogs extends Pets {
  keeper: DogKeeper = new DogKeeper();
}

class Cats extends Pets {
  keeper: CatKeeper = new CatKeeper();
}

function createInstance<A extends Pets>(c: new () => A): A {
  return new c();
}

const dog = createInstance(Dogs);
console.log(dog);
