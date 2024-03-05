# eslint-plugin-explicit-generics

A TypeScript ESLint plugin to enforce generics input on specific functions

## Installation

```
npm install eslint-plugin-explicit-generics @typescript-eslint/parser
```

## Update ESLint Configuration

Add the plugin and provide the names of the functions you wish to enforce explicit setting of TypeScript generics on

```
  // .eslintrc.json
  ...
  "parser": "@typescript-eslint/parser",
  "plugins": ["explicit-generics"],
  "rules": {
    "explicit-generics/explicit-generics": ["error", { functionNames: ["functionName1", "functionName2"] }]
  }
  ...
```

## Example

Let's assume we made this function that accepts generics

```
function foo<T,K>(arg1: T): K {
    ...
}
```

Now we want ESLint to force us to input the generics on each function call

```
// .eslintrc.json

  ...
  "parser": "@typescript-eslint/parser",
  "plugins": ["explicit-generics"],
  "rules": {
    "explicit-generics/explicit-generics": ["error", {functionNames: ["foo"]}]
  }
...
```

This will give these linting results

```
// Invalid:

foo(arg) // error  'foo' should include generics in function call


// Valid:

foo<string, number>(arg)
```
