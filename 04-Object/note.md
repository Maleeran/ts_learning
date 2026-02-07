# TypeScript Object Types 笔记

## 一、对象类型的三种定义方式

### 1. 匿名对象类型（Anonymous）

直接在参数中定义对象结构：

```typescript
function greet(person: { name: string; age: number }) {
  return "Hello" + person.name;
}
```

### 2. Interface 接口

使用 `interface` 关键字定义可复用的对象类型：

```typescript
interface Person {
  name: string;
  age: number;
}
function greet1(person: Person) {
  return "Hello" + person.name;
}
```

### 3. Type Alias 类型别名

使用 `type` 关键字定义对象类型：

```typescript
type Person1 = {
  name: string;
  age: number;
};
function greet2(person: Person1) {
  return "Hello" + person.name;
}
```

---

## 二、属性修饰符（Property Modifiers）

### 1. 可选属性（Optional Properties）

使用 `?` 标记可选属性：

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number; // 可选
  yPos?: number; // 可选
}
```

**处理方式：**

- 方式一：默认值处理

```typescript
let xPots = opts.xPos === undefined ? 0 : opts.xPos;
```

- 方式二：解构时赋默认值（推荐）

```typescript
function paintShape1({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos); // xPos: number
}
```

---

## 三、只读属性（readonly Properties）

### 基本用法

```typescript
interface SomeType {
  readonly prop: string; // 属性本身不可重新赋值
}
```

### 重要概念

> `readonly` 不代表值不可变，而是**属性不能被重新赋值**

```typescript
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  home.resident.age++; // ✅ 可以修改内部属性
}

function evict(home: Home) {
  // home.resident = { ... }; // ❌ 错误：不能重新赋值 resident 属性
}
```

---

## 四、索引签名（Index Signatures）

### 1. 数字索引

```typescript
interface StringArray {
  [index: number]: string; // 数字索引返回 string
}
const myArray: StringArray = ["John", "Alex"];
```

### 2. 字符串索引

```typescript
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // 必须兼容索引签名类型
  name: string;
}
```

### 3. 只读索引签名

```typescript
interface ReadonlyStringArray {
  readonly [index: number]: string; // 禁止通过索引修改
}
// myArrayList[2] = "Lily"; // ❌ 错误
```

---

## 五、类型扩展与组合

### 1. Interface 扩展（extends）

单继承：

```typescript
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

多继承：

```typescript
interface ColorfulCircle extends Circle, Colorful {}
```

### 2. 交叉类型（Intersection Types）

使用 `&` 运算符组合类型：

```typescript
type ColorfulCircle = Circle & Colorful;

const colorfulCircle1: ColorfulCircle = {
  name: "colorfulCircle1",
  radius: 2,
  color: "#fff",
};
```

### 3. Interface 声明合并（Declaration Merging）

同名 Interface 会自动合并：

```typescript
interface Person {
  name: string;
}
interface Person {
  // name: number;  // ❌ 冲突：name 类型必须一致
}
// 结果：Person 包含 name: string
```

---

## 六、泛型对象类型（Generic Object Types）

### 1. 基本泛型接口

```typescript
interface Box<Type> {
  content: Type;
}

const boxString: Box<string> = { content: "Hello" };
const boxNum: Box<number> = { content: 12 };
```

### 2. 类型别名组合

```typescript
type OrNull<Type> = null | Type;
type OneOrMany<Type> = Type | Type[];
type NullOrOneOrMany<Type> = OrNull<OneOrMany<Type>>;
```

---

## 七、数组类型（Array Types）

### 1. 两种写法等价

```typescript
const printArray = (a: Array<string>) => { ... };
// 等价于
const printArray = (a: string[]) => { ... };
```

### 2. 只读数组（ReadonlyArray）

```typescript
function doStuff(values: readonly string[]) {
  const copy = values.slice(); // ✅ 可以读取
  console.log(values[0]); // ✅ 可以访问
  // values.push("hello!");         // ❌ 没有 push 方法
}
```

> 注意：`ReadonlyArray` 是类型，不能用 `new` 创建实例

---

## 八、元组类型（Tuple Types）

固定长度、固定类型的数组：

```typescript
type StringNumberPair = [string, number];

const doSomething = (pair: StringNumberPair) => {
  console.log(pair[0], pair[1]); // 已知类型：string, number
};

doSomething(["string", 12]); // ✅
// doSomething([12, "string"]);  // ❌ 类型顺序不匹配
```

---

## 九、关键对比总结

| 特性     | Interface    | Type Alias   | 说明                    |
| -------- | ------------ | ------------ | ----------------------- |
| 扩展方式 | `extends`    | `&` 交叉类型 | Interface 支持多继承    |
| 声明合并 | ✅ 支持      | ❌ 不支持    | 同名 Interface 自动合并 |
| 适合场景 | 对象形状定义 | 复杂类型运算 | 两者功能大部分重叠      |
| 泛型支持 | ✅ 支持      | ✅ 支持      | 都可定义泛型版本        |

---

## 十、最佳实践

1. **优先使用 Interface** 定义对象形状，便于扩展和声明合并
2. **使用 Type Alias** 处理联合类型、交叉类型等复杂类型运算
3. **可选属性** 配合解构默认值，简化空值处理
4. **readonly** 用于保护引用不变，但注意内部属性仍可修改
5. **泛型** 提高代码复用性，如 `Box<T>`、`Array<T>`

```

```
