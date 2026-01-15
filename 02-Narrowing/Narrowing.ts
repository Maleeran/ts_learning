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
}
