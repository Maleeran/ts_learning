// Template Literal Types
type World = "world";
type Greet = `Hello ${World}`;

// union in Template Literal Types
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; //"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

type Lang = "en" | "zh" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`; // "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "zh_welcome_email_id" | "zh_email_heading_id" | "zh_footer_title_id" | "zh_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"

// String Unions in Types

type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void,
  ): void;
};

/// Create a "watched object" with an `on` method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type,
): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// makeWatchedObject has added `on` to the anonymous Object

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

// Intrinsic String Manipulation Types
// `Uppercase<StringType>`

type Greeting = "hello world";
type ShoutyGreeting = Uppercase<Greeting>;

// `Lowercase<StringType>`
type App = "My_App";
type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`;

type MyIdApp = ASCIICacheKey<App>;

// `Capitalize<StringType>`
type CapitalizeGreeting = Capitalize<Greeting>;

// `Uncapitalize<StringType>`
type UncapitalizeGreeting = Uncapitalize<ShoutyGreeting>;
