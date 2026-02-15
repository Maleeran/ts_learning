// Conditional Types

/*
interface Animal {
  live(): void;
}

interface Dogs extends Animal {
  woof(): void;
}

type Example1 = Dogs extends Animal ? string : number;
type Example2 = Date extends Animal ? string : number;

// with generics
interface Name {
  name: string;
}

interface Id {
  id: number;
}

type NameOrId<T extends string | number> = T extends string ? Name : Id;

function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");

let b = createLabel(32);

let c = createLabel(Math.random() ? "hello" : 9);

// Conditional Type Constraints

// type MessageOf<T> = T['message'] // Type '"message"' cannot be used to index type 'T'.

type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;
*/
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}
interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>; // string

type DogMessage = MessageOf<Dog>; // never
