/*
// Object Types
// 1. anonymous
function greet(person: { name: string; age: number }) {
  return "Hello" + person.name;
}
// 2.interface
interface Person {
  name: string;
  age: number;
}
function greet1(person: Person) {
  return "Hello" + person.name;
}
// 3. Type alias
type Person1 = {
  name: string;
  age: number;
};
function greet2(person: Person1) {
  return "Hello" + person.name;
}

// Property Modifiers
// Optional Properties
type Shape = {
  kind: string;
};

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

const paintShape = (opts: PaintOptions) => {
  console.log(opts);
  // let xPots = opts.xPos; //let xPots: number | undefined
  // let yPots = opts.yPos; // let yPots: number | undefined

  let xPots = opts.xPos === undefined ? 0 : opts.xPos; // let xPots: number
  let yPots = opts.yPos === undefined ? 0 : opts.yPos; // let yPots: number
};

const shape = { kind: "circle" };
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// destructuring pattern
function paintShape1({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos); // (parameter) xPos: number
  console.log("y coordinate at", yPos); // (parameter) yPos: number
  // ...
}
// readonly Properties
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  // obj.prop = "hello";  // Cannot assign to 'prop' because it is a read-only property.
}

// `readonly` doesn’t mean the value is immutable, but means that the property can't be re-written to.
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++; // update successfully
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  // home.resident = {
  //   name: "Victor the Evictor",
  //   age: 42,
  // };
  // Cannot assign to 'resident' because it is a read-only property.
}

//Index Signatures
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["John", "Alex"];
const secondItem = myArray[1];
// console.log(secondItem);

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number;
  name: string;
}
const someDictionary: NumberOrStringDictionary = {
  length: 17,
  name: "alex",
};
// console.log(someDictionary.length);

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArrayList: ReadonlyStringArray = ["John", "Alex", "Tom"];
// myArrayList[2] = "Lily"; // Index signature in type 'ReadonlyStringArray' only permits reading.

// Extending Types
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
// interfaces can also extend from multiple types.
interface Circle {
  name: string;
  radius: number;
}
interface Colorful {
  color: string;
}

interface ColorfulCircle extends Circle, Colorful {}

const colorfulCircle1 = {
  name: "colorfulCircle1",
  radius: 2,
  color: "#fff",
};

// Intersection Types
// using the & operator
interface Circle {
  name: string;
  radius: number;
}
interface Colorful {
  color: string;
}
type ColorfulCircle = Circle & Colorful;

const draw = (circle: ColorfulCircle) => {
  console.log(`the color: ${circle.color}`);
  console.log(`the radius: ${circle.radius}`);
};
const colorfulCircle1: ColorfulCircle = {
  name: "colorfulCircle1",
  radius: 2,
  color: "#fff",
};

draw(colorfulCircle1);
*/
// Interface Extension vs. Intersection

// Interface Extension
interface Person {
  name: string;
}
interface Person {
  // name: number;  // (property) Person.name: string
}

// Generic Object Types
interface Box<Type> {
  content: Type;
}

const boxString: Box<string> = {
  content: "Hello",
};
console.log(boxString);

const boxNum: Box<number> = {
  content: 12,
};
console.log(boxNum);
type OrNull<Type> = null | Type;

type OneOrMany<Type> = Type | Type[];

type NullOrOneOrMany<Type> = OrNull<OneOrMany<Type>>;

type NullOrOneOrManyString = OrNull<OneOrMany<string>>;

// The Array Type
const printArray = (a: Array<string>) => {
  console.log(a);
};
// string[] is short shorthand for Array<string>

// const a = new Array("Amy");
interface Array<Type> {
  length: number;
}

// The ReadonlyArray Type
// const b = new ReadonlyArray("red", "green", "blue"); //'ReadonlyArray' only refers to a type, but is being used as a value here.

function doStuff(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  // values.push("hello!"); // Property 'push' does not exist on type 'readonly string[]'.
}

// Tuple Types
type StringNumberPair = [string, number];
const doSomething = (pair: StringNumberPair) => {
  console.log(pair[0], pair[1]);
};

doSomething(["string", 12]);
