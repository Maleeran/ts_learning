"use strict";
// Greets the world.
// console.log("Hello world!");

// function greet(person: string, date: Date) {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }

// greet("Maleeran", new Date());

// The primitives: string, number, and boolean

// let myName: string;
// myName = "Maleeran";
// let age: number;
// age = 25;
// let isStudent: boolean;
// isStudent = true;

// console.log(myName, age, isStudent);

/******************************************************************/
// Everyday types

/*
////////////////////////////////////////
// primitives: string , number, boolean

////////////////////////////////////////
// Array: use number[] or string[].
let list1: string[];
let numbers: number[];

let list2: Array<string>; // Array<string> is the same as string[]. T<U> is a generic type.

// any
let anything: any = { x: 0 };

// using any type will never throw an error even if you assign a value of a different type to it.
anything = 123;
anything = true;
anything = [];

////////////////////////////////////////
// Functions
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!"); // add parameter type annotation
}

greet("Maleeran"); // Hello, MALEERAN!!
// greet(123); // error. the type of parameter should be 'string'

// Return type annotation
function getFavouriteNumber(): number {
  // add return type annotation
  return 9;
}

// Functions which return Promises
async function getFavoriteNumber(): Promise<number> {
  return 9;
}

// anonymous function
const names = ["Alice", "Bob", "Charlie"];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

////////////////////////////////////////
// Object

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });

//Optional Properties
// function printName(obj: { first: string; last?: string }) {
//   console.log("Hello, " + obj.first + " " + obj.last);
// }
// printName({ first: "Bob" });
// printName({ first: "Alice", last: "Alisson" });

function printName(obj: { first: string; last?: string }) {
  if (obj.last !== undefined)
    console.log("Hello, " + obj.first + " " + obj.last);
  else console.log("Hello, " + obj.first);
}
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

////////////////////////////////////////
// Union Types

// example
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;

// myFavoriteNumber = true; // error. it wouldn't be boolean.

// function getLength(something: number | string) {
//   return something.length; // error. 'number' does not have a 'length' property.
// }

function getString(something: number | string) {
  return something.toString(); // 'number' and 'string' both have 'toString'
}

let myFavouriteNumber: string | number;
myFavouriteNumber = "seven";
console.log(myFavouriteNumber.length);
myFavouriteNumber = 7;
// console.log(myFavouriteNumber.length); // error. it's type will be 'number' when 7 is assigned.

////////////////////////////////////////
// 类型推断
// let myFavouriteNumber = "seven";
// myFavouriteNumber = 7; // 不能将类型“number”分配给类型“string”

// it means:
// let myFavouriteNumber: string = "seven";
// myFavouriteNumber = 7;


////////////////////////////////////////
// Type Aliases

type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

// type UserInputSanitizedString = string;

// function sanitizeInput(str: string): UserInputSanitizedString {
//   return sanitize(str);
// }

// // Create a sanitized input
// let userInput = sanitizeInput(getInput());

// // Can still be re-assigned with a string though
// userInput = "new input";


////////////////////////////////////////
// Interfaces
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

// Differences Between Type Aliases and Interfaces
// Extends in interfaces
interface Animal {
  name: string;
  food: string;
}

interface Dog extends Animal {
  averageWeight: number;
}

let dog: Dog = {
  name: "Buddy",
  food: "meat",
  averageWeight: 10,
};

const getDog = (dog: Dog): string => {
  return dog.name;
};
console.log(getDog(dog));


// Extends in type aliases  via intersection
type Animal = {
  name: string;
};
type Dog = Animal & {
  averageWeight: number;
};

let dog: Dog = {
  name: "Buddy",
  averageWeight: 10,
};

const getDog = (dog: Dog): string => {
  return dog.name;
};

console.log(getDog(dog));

// Adding new fields to an existing interface
interface Dog {
  name: string;
}

interface Dog { 
  averageWeight: number;
}


// A type cannot be changed after being created
type Dog = { name: string };
type Dog = { averageWeight: number };
// Error: Duplicate identifier 'Dog'.


////////////////////////////////////////
// Type Assertions

// You can tell TypeScript a more specific type for a variable by using a type assertion.
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// const x = "hello" as number; // Error: Type 'number' is not assignable to type 'string'.

const x = "hello" as any as number; // However, if you need to do some complex coercions, you can use two assertions.


////////////////////////////////////////
//Literal Types

let changingString = "Hello World";
changingString = "Olá Mundo";

console.log(changingString);

// combined with union types

// when functions only accept certain strings or numbers
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre"); // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// with non-literal types
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic"); // Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
*/

// Null and Undefined

// strictNullChecks off : ignore null and undefined; strictNullChecks on : need to test for null and undefined

function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

// Non-null Assertion Operator (Postfix !)
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed()); // you can make sure x isn't null or undefined
}
