/*
// Indexed Access Types
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];

type I1 = Person["age" | "name"]; // string | number

type I2 = Person[keyof Person]; // string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // string | boolean
*/
// example
const SomeArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = (typeof SomeArray)[number]; // {name: string, age:number}

// type Age = Person["age"];

// // Or
// type Age2 = (typeof SomeArray)[number]["age"];

// only use types when indexing
// const key = "age";  // not a `const`

// type Age = Person[key]; // Type 'key' cannot be used as an index type.
type key = "age";
