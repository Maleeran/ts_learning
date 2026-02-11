// Conditional Types

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
