## TypeScript 高级类型特性笔记

### 一、模板字面量类型 (Template Literal Types)

模板字面量类型允许使用字符串字面量构建新的字符串类型，类似于 JavaScript 的模板字符串。

```typescript
// 基础用法
type World = "world";
type Greet = `Hello ${World}`; // "Hello world"

// 联合类型的展开
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// 结果: "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

type Lang = "en" | "zh" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// 结果: 12种组合，如 "en_welcome_email_id" 等

// 实际应用：监听属性变化事件
type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void,
  ): void;
};

// 使用示例
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
person.on("firstNameChanged", callback); // ✅ 类型安全
```

**要点：**

- 支持联合类型的笛卡尔积展开
- 常用于构建类型安全的事件系统、国际化键名等

---

### 二、条件类型 (Conditional Types)

条件类型根据类型关系选择两种类型之一，语法类似三元运算符。

```typescript
// 基础语法: T extends U ? X : Y
type Example1 = Dogs extends Animal ? string : number; // string
type Example2 = Date extends Animal ? string : number; // number

// 结合泛型使用
type NameOrId<T extends string | number> = T extends string ? Name : Id;

function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
  // 根据传入参数类型返回不同结构
}

let a = createLabel("typescript"); // Name类型
let b = createLabel(32); // Id类型

// 条件类型约束 - 安全地访问属性
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}
interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>; // string
type DogMessage = MessageOf<Dog>; // never
```

**要点：**

- `extends` 用于类型约束检查
- `never` 常用于表示"无此属性"的情况
- 配合泛型实现根据输入类型动态输出类型

---

### 三、索引访问类型 (Indexed Access Types)

通过索引语法访问其他类型的特定属性类型。

```typescript
type Person = { age: number; name: string; alive: boolean };

// 访问单个属性
type Age = Person["age"]; // number

// 访问联合类型属性
type I1 = Person["age" | "name"]; // string | number

// 使用 keyof 访问所有属性
type I2 = Person[keyof Person]; // string | number | boolean

// 使用类型别名
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // string | boolean

// 数组类型索引访问
const SomeArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = (typeof SomeArray)[number]; // {name: string, age: number}
type Age = (typeof SomeArray)[number]["age"]; // number

// ⚠️ 注意：索引必须使用类型，不能是变量
const key = "age"; // ❌ 值，不是类型
type key = "age"; // ✅ 类型别名
```

**要点：**

- `[number]` 用于获取数组元素类型
- `typeof` 获取值的类型后再索引
- 索引位置必须是类型，不能是运行时值

---

### 四、映射类型 (Mapped Types)

基于旧类型创建新类型，通过遍历键名转换属性。

```typescript
// 基础映射：将所有属性转为 boolean
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

// 修饰符操作
// 1. 移除 readonly (-readonly)
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnLockedAccount = CreateMutable<LockedAccount>; // id: string; name: string

// 2. 移除可选标记 (-?)
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: number;
  name?: string;
  intro?: string;
};
type User = Concrete<MaybeUser>; // 所有属性必填

// 键名重映射 (TS 4.1+)
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>; // { radius: number }
```

**要点：**

- `in keyof` 遍历所有键
- `-` 移除修饰符，`+` 添加修饰符（默认）
- `as` 子句用于键名重映射，配合 `Exclude` 等工具类型

---

## 快速对比表

| 特性           | 核心语法              | 主要用途                 |
| :------------- | :-------------------- | :----------------------- |
| **模板字面量** | `` `prefix${Type}` `` | 构建类型安全的字符串键名 |
| **条件类型**   | `T extends U ? X : Y` | 根据类型关系选择类型     |
| **索引访问**   | `Type["key"]`         | 提取已有类型的属性类型   |
| **映射类型**   | `[P in keyof T]: V`   | 批量转换类型结构         |
