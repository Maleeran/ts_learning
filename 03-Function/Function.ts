/*
// Function Type Expressions
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

// Call Signatures
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default";

doSomething(myFunc);

// Construct Signatures
interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}

function fn(ctor: CallOrConstruct) {
  console.log(ctor(10));

  console.log(new ctor("10"));
}

fn(Date);

// console.log(new Date("10"));
// console.log(Date());

// Generic Functions
// without generics
// function firstElement(arr: any[]) {
//   return arr[0];
// }

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

// Generic Inference
function map<input, output>(
  arr: input[],
  func: (arg: input) => output,
): output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// Generics Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// const notOk = longest(10, 100); // Numbers don't have a 'length' property

// function minimumLength<Type extends { length: number }>(
//   obj: Type,
//   minimum: number,
// ): Type {
//   if (obj.length >= minimum) {
//     return obj;
//   } else {
//     return { length: minimum };
//   }
// }

// Specifying Type Arguments

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// const arr1 = combine([1, 2, 3], ["hello"]); // Type 'string' is not assignable to type 'number'.

const arr = combine<string | number>([1, 2, 3], ["hello"]); // using union type can specify type arguments

// Guidelines for Writing Good Generic Functions
*/
/* 1. Push Type Parameters Down. 
   2. Use Fewer Type Parameters
   3. Type Parameters Should Appear Twice
*/
/*
// Optional Parameters

function f(x?: number) {
  // same as x: number|undefined
  // ...
}
f(); // OK
f(10); // OK

// Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

// Function Overloads
function makeFullName(firstName: string, lastName: string): string;
function makeFullName(a: string, b: string, c: string): string;
function makeFullName(firstNameOrA: string, b?: string, c?: string) {
  if (c !== undefined) {
    return `${firstNameOrA}·${b}·${c}`;
  } else {
    return `${firstNameOrA}·${b}`;
  }
}

const name1 = makeFullName("Tom", "Asher");
console.log(name1);
const name2 = makeFullName("Tom", "Asher", "JR");
console.log(name2);

// Always prefer parameters with union types instead of overloads when possible

// Declaring this in a Function

const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

// Other Types to Know About

// 1.void
// The inferred return type is void
function noop() {
  return;
} // void !== undefined

// 2.object

// 3.unknown
// safer than `any` type

// 4.never

// 5.Function

// Rest Parameters and Arguments
// Rest Parameters
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
console.log(a);

// Rest Arguments
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// Parameter Destructuring
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

sum({ a: 10, b: 10, c: 20 });


// Assignability of Functions
// Return type `void`: not force functions to not return something
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};

const v1 = f1(); //type: void

const v2 = f2();

const v3 = f3();

console.log(v1);
console.log(v2);
console.log(v3);

// a function has a void return type
// must not return anything
function f2():void {
  return true // 不能将类型“boolean”分配给类“void”。
}
*/
