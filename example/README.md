
  <!---#################################################
  #  THIS FILE WAS AUTO-GENERATED. DO NOT EDIT DIRECTLY!
  #  PLEASE EDIT THE CORRESPONDING README.JS FILE.
  #  YOU HAVE BEEN WARNED!
  ###################################################-->
  

# Example JavaScript Style Guide

[Back to main](../README.md)

<a name="table-of-contents"></a>
## Table of Contents

1. [Declarations](#declarations)

<a name="declarations"></a>
## Declarations

<a name="declarations--prefer-const"></a><a name="1.1"></a>
- [1.1](#declarations--prefer-const) Use `const` do declare all variables. Avoid using `var`.


  - eslint: [`;refer-const`](https://eslint.org/docs/rules/;refer-const), [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign)

  > Why? This ensures you cannot reassign your references.

  ```javascript
  // bad
  var a = 1;
  var b = 2;
  
  // good
  const a = 1;
  const b = 2;
  ```

<a name="declarations--disallow-var"></a><a name="1.2"></a>
- [1.2](#declarations--disallow-var) If the value needs to change, use `let`


  - eslint: [`no-var`](https://eslint.org/docs/rules/no-var)

  > Why? let is block-scoped rather than function-scoped like var.

  ```javascript
  // bad
  var count = 1;
  if (true) {
    count += 1;
  }
  
  // good
  let count = 1;
  if (true) {
    count += 1;
  }
  ```

**[⬆ back to top](#table-of-contents)**

