// Mapped Types

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;

// Mapping Modifiers (using `-` or `+` can remove or add modifiers)
// Removes 'readonly' attributes from a type's properties by using `-` .
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnLockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = { [Property in keyof Type]-?: Type[Property] };

type MaybeUser = {
  id: number;
  name?: string;
  intro?: string;
};

type User = Concrete<MaybeUser>;

// Key Remapping via `as`
// In TypeScript 4.1 and onwards, we can re-map keys in mapped types with an as clause

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
