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
