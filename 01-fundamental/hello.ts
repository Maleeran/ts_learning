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
*/

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
