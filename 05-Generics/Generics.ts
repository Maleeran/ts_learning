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

//
