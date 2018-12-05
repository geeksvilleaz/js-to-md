# JS-TO-MD

> A Node.js transpiler to convert a JavaScript object to Markdown to create dynamic Style Guides.

## Install

> TODO: Add to NPM.

You can install this one of two ways:

1. Clone and link

    ```shell
    git clone https://github.com/geeksvilleaz/js-to-md.git
    cd style-guide-md
    npm i
    npm link
    cd ../../your-project
    npm link style-guide-md
    ```

1. Manually install from repo. You will need to note the correct version number.

    ```shell
    npm i git+https://github.com/geeksvilleaz/js-to-md.git#v1.0.0
    ```

## Overview

Add the following entry to your `package.json` scripts object:

```javascript
"scripts": {
  // ...
  "jstomd": "jsToMD"
  // ...
}
```

You can now run the command from your CLI to transpile your README files:

```shell
npm run jstomd
```

> STYLE-GUIDE-MD will ignore the `node_modules` folder; Only `./src` folder will be traversed.

Inside the `./src` folder, create a file for each README file you want. The source file should be named representing the folder it will be contained within. Ex. `./src/javascript.js` will transpile into `./javascript/README.md`. The folder does not need to exist before running the script.

> See below for a sample README.js file.

## Example `README.js`

**title**: *(String)* The H1 for your document.

**link**: *({label, url}, Optional)* Use this to link to another document. The fields should be self-explanitory.

**toc** *(Boolean, Optional)* Whether or not to show the Table of Contents.

**sections** The main list of rules and definitions.

**sections.name** *(String)* This should be a unique name in the following format: `section--rule-description`. For example, the `Short Circuit` rule in the `Operators` sections would be: `operators--short-circuit`.

**sections.rule** *(String)* The main description of the rule.

**sections.lint** *({eslint}, Optional)* A list of linting rules that apply to this definition.

**sections.list** *(String[], Optional)* Displays a list of items.

**sections.todo** *(String, Optional)* A way to tag a TODO on the definition.

**sections.why** *(String[], Optional)* Adds a `Why?` section

**sections.examples** *({lang, code}, Optional)* This adds code examples. `lang` is the language for syntax highlighting. `code` is an array of strings; each item is a line in the code. For example:

```javascript
examples: {
  lang: 'javascript',
  code: [
    'if (x === y) {',
    '  doSomethingCool();',
    '}'
  ]
}
```
