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
