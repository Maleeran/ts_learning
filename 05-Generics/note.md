## TypeScript 泛型 (Generics) 笔记

### 一、为什么需要泛型？

| 方式                           | 问题                      |
| :----------------------------- | :------------------------ |
| 具体类型 `(a: number): number` | 只能处理 number，复用性差 |
| `any` 类型 `(a: any): any`     | 丢失类型信息，无类型安全  |

**泛型 = 类型参数化**：保持类型安全的同时实现代码复用

```typescript
// 泛型函数：Type 是占位符，使用时才确定具体类型
function doSomethingGenerics<Type>(a: Type): Type {
  return a;
}

// 使用时会自动推断类型
doSomethingGenerics("hello"); // Type = string
doSomethingGenerics(123); // Type = number
```

---

### 二、泛型函数的不同写法

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

// 1. 函数类型表达式
let myIdentity: <Type>(arg: Type) => Type = identity;

// 2. 类型别名可不同名
let myIdentityInput: <Input>(arg: Input) => Input = identity;

// 3. 对象字面量写法
let myIdentityObject: { <Type>(arg: Type): Type } = identity;
```

---

### 三、泛型接口

```typescript
interface GenericIdentityFn<Type> {
  (arg: Type): Type; // 描述函数签名
}

function identity<Type>(arg: Type): Type {
  return arg;
}

// 使用时指定具体类型
let myIdentity: GenericIdentityFn<number> = identity;
// myIdentity 现在只能接收 number 参数
```

---

### 四、泛型类

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;

  constructor(zeroValue: NumType, add: (x: NumType, y: NumType) => NumType) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

// 使用：NumType = number
const myNum = new GenericNumber<number>(0, (x, y) => x + y);

// 使用：NumType = string
const myStr = new GenericNumber<string>("", (x, y) => x + y);
```

**注意**：泛型类只作用于实例属性和方法，静态成员不能使用。

---

### 五、泛型约束 (Generic Constraints)

#### 1. 基础约束：`extends`

```typescript
interface Lengthwise {
  length: number;
}

// Type 必须包含 length 属性
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // ✅ 安全访问
  return arg;
}

loggingIdentity("hello"); // ✅ string 有 length
loggingIdentity([1, 2, 3]); // ✅ 数组有 length
loggingIdentity(123); // ❌ number 没有 length
```

#### 2. 多类型参数约束：`keyof`

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]; // 安全访问属性
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // ✅ 合法
getProperty(x, "m"); // ❌ 报错：'"m"' 不是 x 的键
```

**类型推断过程**：

```
Type = { a: 1, b: 2, c: 3, d: 4 }
keyof Type = "a" | "b" | "c" | "d"
Key extends "a" | "b" | "c" | "d"  →  只能是这四个之一
```

---

### 六、在泛型中使用类类型

```typescript
class DogKeeper {
  behavior = "playing plate";
}
class CatKeeper {
  behavior = "playing hairball";
}

class Pets {
  legs = 4;
}

class Dogs extends Pets {
  keeper = new DogKeeper();
}

class Cats extends Pets {
  keeper = new CatKeeper();
}

// 约束：A 必须是 Pets 的子类，且 c 是可构造的（有构造函数）
function createInstance<A extends Pets>(c: new () => A): A {
  return new c(); // 创建实例
}

const dog = createInstance(Dogs); // A = Dogs
console.log(dog.keeper.behavior); // "playing plate"

const cat = createInstance(Cats); // A = Cats
```

**`new () => A` 含义**：表示一个**构造函数**，返回类型为 A。

---

## 知识图谱

```
泛型基础
├── 泛型函数 <Type>(arg: Type): Type
│   ├── 箭头函数写法
│   ├── 函数类型表达式
│   └── 对象字面量写法
├── 泛型接口 interface Fn<T> { (arg: T): T }
├── 泛型类 class Box<T> { item: T }
└── 泛型约束（重点）
    ├── extends 接口：约束属性存在
    ├── extends keyof：约束键名范围
    └── extends Class + new ()：约束可构造
```

## 核心口诀

> **泛型是类型的参数**：像函数参数一样传递类型，保持灵活且类型安全。

| 场景               | 解决方案                       |
| :----------------- | :----------------------------- |
| 需要访问 `.length` | `T extends { length: number }` |
| 需要访问对象属性   | `K extends keyof T`            |
| 需要创建类实例     | `C extends new () => T`        |
