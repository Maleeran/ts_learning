# Typescript 函数类型

## 1.函数类型表达式

描述函数的参数和返回值的类型。

```typescript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

> **语法**: `(参数: 类型) => 返回类型`

## 2.调用签名

为函数添加属性，描述“可调用的对象”。

``` typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;  // 调用签名
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default";

doSomething(myFunc);
```

## 3. 构造签名 (Construct Signatures)

描述可以用 `new` 调用的构造函数。

```typescript
interface CallOrConstruct {
  (n?: number): string;        // 普通调用
  new (s: string): Date;       // 构造签名
}

function fn(ctor: CallOrConstruct) {
  console.log(ctor(10));        // 普通调用
  console.log(new ctor("10"));  // 构造函数调用
}

fn(Date);
```

## 4. 泛型函数 (Generic Functions)

### 4.1 基础泛型

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

const s = firstElement(["a", "b", "c"]);  // Type: string
const n = firstElement([1, 2, 3]);        // Type: number
const u = firstElement([]);               // Type: undefined
```

### 4.2 多类型参数

```typescript
function map<input, output>(
  arr: input[],
  func: (arg: input) => output,
): output[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
// n 被推断为 string, parsed 被推断为 number[]
```

### 4.3 泛型约束 (Constraints)

使用 `extends` 限制类型参数必须具有某些属性。

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// ❌ const notOk = longest(10, 100); // Error: 数字没有 length 属性
```

### 4.4 显式指定类型参数

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// ❌ const arr1 = combine([1, 2, 3], ["hello"]); // Error: 类型不兼容
const arr = combine<string | number>([1, 2, 3], ["hello"]); // ✅ 使用联合类型
```

### 4.5 泛型函数编写准则

1. **类型参数下移**: 将类型参数放在使用它们的位置
2. **使用更少的类型参数**: 避免不必要的泛型
3. **类型参数应出现两次**: 如果只在返回值出现，可能不需要泛型

------

## 5. 可选参数 (Optional Parameters)

```typescript
function f(x?: number) {
  // 等同于 x: number | undefined
}
f();      // OK
f(10);    // OK
```

**注意**: 回调函数中的可选参数要谨慎使用，可能导致类型推断问题。

------

## 6. 函数重载 (Function Overloads)

为同一函数提供多个调用签名。

```typescript
function makeFullName(firstName: string, lastName: string): string;
function makeFullName(a: string, b: string, c: string): string;
function makeFullName(firstNameOrA: string, b?: string, c?: string) {
  if (c !== undefined) {
    return `${firstNameOrA}·${b}·${c}`;
  } else {
    return `${firstNameOrA}·${b}`;
  }
}

const name1 = makeFullName("Tom", "Asher");       // "Tom·Asher"
const name2 = makeFullName("Tom", "Asher", "JR"); // "Tom·Asher·JR"
```

> 💡 **建议**: 尽可能使用联合类型参数替代重载

------

## 7. this 声明

在函数中明确 `this` 的类型。

```typescript
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;  // TypeScript 能正确推断 this 类型
  },
};
```

------

## 8. 其他重要类型

表格

复制

| 类型       | 说明                             | 示例                                |
| :--------- | :------------------------------- | :---------------------------------- |
| `void`     | 无返回值                         | `function noop(): void { return; }` |
| `object`   | 非原始类型的任何类型             | -                                   |
| `unknown`  | 安全的 `any`，使用前需类型检查   | 比 `any` 更安全                     |
| `never`    | 永不返回（如抛出异常或无限循环） | -                                   |
| `Function` | 全局函数类型，可调用的任意函数   | 尽量少用                            |

**注意**: `void !== undefined`，`void` 表示不关注返回值。

------

## 9. 剩余参数与展开 (Rest Parameters & Arguments)

### 9.1 剩余参数

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
const a = multiply(10, 1, 2, 3, 4);  // [10, 20, 30, 40]
```

### 9.2 展开参数

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);  // 展开数组作为参数
```

------

## 10. 参数解构 (Parameter Destructuring)



```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

sum({ a: 10, b: 10, c: 20 });  // 40
```

------

## 11. 函数可赋值性 (Assignability)

### 11.1 void 返回类型的特殊规则

`void` 返回类型**不强制**函数不能返回内容，只是忽略返回值。

```typescript
type voidFunc = () => void;

const f1: voidFunc = () => { return true; };  // ✅ 允许
const f2: voidFunc = () => true;              // ✅ 允许
const f3: voidFunc = function () { return true; };  // ✅ 允许

const v1 = f1();  // 类型: void (返回值被忽略)
```

**但是**，显式声明 `void` 返回类型的函数体**不能**返回具体值：

```typescript
function f2(): void {
  return true;  // ❌ Error: 不能将类型"boolean"分配给类型"void"
}
```

------

## 总结速查

| 概念     | 语法/关键字                    | 用途                |
| -------- | ------------------------------ | ------------------- |
| 函数类型 | `(x: T) => U`                  | 描述函数签名        |
| 调用签名 | `{ (x: T): U }`                | 给函数添加属性      |
| 构造签名 | `new (x: T) => U`              | 描述构造函数        |
| 泛型     | `<T>(x: T) => T`               | 代码复用 + 类型安全 |
| 泛型约束 | `T extends { length: number }` | 限制类型参数        |
| 可选参数 | `x?: number`                   | 参数可省略          |
| 函数重载 | 多个声明 + 一个实现            | 多态调用            |
| 剩余参数 | `...args: T[]`                 | 处理不定参数        |
| 参数解构 | `{ a, b }: { a: T, b: T }`     | 直接解构对象参数    |
