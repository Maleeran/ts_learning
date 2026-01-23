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

function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      // Object is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

printAll(["Dog", "Cat"]);
printAll(null);

// Truthiness narrowing
// in js, it always return the type of the value to boolean.
console.log(Boolean("hello"));
console.log(Boolean(0));

function printAll2(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
