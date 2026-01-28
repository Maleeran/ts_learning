/*
/////////////////////////
// Narrowing

// function padLeft(padding: number | string, input: string) {
//   return new Array(padding + 1).join(" ") + input;
//   // Operator '+' cannot be applied to types 'string | number' and 'number'.
// }

// TS would like us to check the type before using it.
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    // check type : type guard in TS
    return new Array(padding + 1).join(" ") + input;
  }

  return padding + input;
}

// typeof: type guard

// function printAll(strs: string | string[] | null) {
//   if (typeof strs === "object") {
//     for (const s of strs) {
//       // Object is possibly 'null'.
//       console.log(s);
//     }
//   } else if (typeof strs === "string") {
//     console.log(strs);
//   } else {
//     // do nothing
//   }
// }

// printAll(["Dog", "Cat"]);
// printAll(null);

// Truthiness narrowing
// in js, it always return the type of the value to boolean.
// console.log(Boolean("hello"));
// console.log(Boolean(0));

function printAll2(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
printAll2(["Dog", "Cat", "Sheep"]);
printAll2("maleeran");

function mutiplyAll(
  values: number[] | undefined,
  factor: number,
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((v) => v * factor);
  }
}
console.log(mutiplyAll([1, 3, 5], 5));


// Equality narrowing
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.

    x.toUpperCase();
    // (method) String.toUpperCase(): string

    y.toLowerCase();
    // (method) String.toLowerCase(): string
  } else {
    console.log(x);
    // (parameter) x: string | number

    console.log(y);
    // (parameter) y: string | boolean
  }
}

function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const str of strs) {
        console.log(str);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

printAll([]);


// The `in` operator Narrowing

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
// optional properties will exist for narrowing

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  } // "in" operator can determine if an object or its prototype chain has a property with a name

  return animal.fly();
}

const someAnimal1: Fish = {
  swim: () => console.log("Swimming in the pool."),
};

const someAnimal2: Bird = {
  fly: () => console.log("Flying in the sky"),
};
move(someAnimal1);
move(someAnimal2);

// `instanceof` Narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    //  (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
    //  (parameter) x: string
  }
}

// Assignments Narrowing

let x = Math.random() < 0.5 ? 10 : "hello world!"; //let x: string | number;

x = 1;
console.log(x);
// let x: number

x = "goodbye!";
console.log(x);
// let x: string

// Control flow analysis
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input; // padding: string unreachable
}

console.log(padLeft(2, "Big"));

//  .e.g
function example() {
  let x: string | number | boolean;
  x = Math.random() < 0.5;

  console.log(x); // let x : boolean

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x); // let x : string
  } else {
    x = 100;
    console.log(x); // let x : number
  }

  return x; // let x : string | number
}

// Using type predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
*/

// Discriminated unions
// interface Shape {
//   kind: "circle" | "square";
//   radius?: number;
//   sideLength?: number;
// }

// function getArea(shape: Shape) {
//   if (shape.kind === "circle") {
//     // return Math.PI * shape.radius ** 2; // error because '?:' operator
//     // return Math.PI * shape!.radius ** 2 // '!.' assertion will be done, but we shouldn't use assertion too much.
//   }
// }

// construct discriminated unions

interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

    // (parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2;

    // (parameter) shape: Square
    default:
      return shape; // never
  }
}

// The never type

// Exhaustiveness checking

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape1 = Circle | Square | Triangle;
function getArea1(shape: Shape1) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

    // (parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2;

    // (parameter) shape: Square
    // default:
    //   const _exhaustiveCheck: never = shape; // error, because it is not exhaustive at all.
    //   return _exhaustiveCheck;

    default:
      return shape; // Triangle
  }
}
