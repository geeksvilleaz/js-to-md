#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const file = require('file');

const TO_TOP = '**[⬆ back to top](#table-of-contents)**';
const TOC_PLACEHOLDER = 'TOC_PLACEHOLDER';
const FILENAME_REGEX = /src\/(.+)\.js/;

const NO_EDIT_WARNING = `
  <!---#################################################
  #  THIS FILE WAS AUTO-GENERATED. DO NOT EDIT DIRECTLY!
  #  PLEASE EDIT THE CORRESPONDING README.JS FILE.
  #  YOU HAVE BEEN WARNED!
  ###################################################-->
  `;

let sectionNum = 0;
let ruleNum = 0;
let toc = [];

const config = {
  ignore: ['node_modules'],
};

goForAWalk();

/**
 * Grabs the js files in the ./src folder and "walks" through each one.
 */
function goForAWalk() {
  file.walk('./src', (isNull, dirPath, dirs, localFiles) => {
    // we need to reset when working with multiple files
    sectionNum = 0;
    ruleNum = 0;
    toc.length = 0;

    if (/node_modules/.test(dirPath)) {
      return;
    }

    localFiles.forEach((readme) => {
      const filename = (FILENAME_REGEX.exec(readme) || [])[1];
      if (!filename) {
        return;
      }

      if (!fs.existsSync(path.resolve('./' + filename))) {
        fs.mkdirSync(path.resolve('./' + filename));
      }

      if (fs.existsSync(path.resolve('./' + readme))) {
        const rules = require(path.resolve('./' + readme));
        const transpiled = toMD(rules);
        fs.writeFileSync(path.join(path.resolve('./' + filename), 'README.md'), transpiled);
      }
    });
  });
}

/**
 * Transpiles to markdown.
 *
 * @param {Array} data
 * @param {string} localPath
 */
function toMD(data, localPath) {
  let buffer = [];

  buffer.push(NO_EDIT_WARNING);

  Object.keys(data).forEach((key) => {
    buffer.push(transpile(key, data[key]));
  });

  // add TOC
  const renderedTOC = toc.join('\n');
  buffer.forEach((item, index) => {
    if (item === TOC_PLACEHOLDER) {
      buffer[index] = `<a name="table-of-contents"></a>\n## Table of Contents\n\n${renderedTOC}`;
    }
  });

  return buffer.join('\n\n');
};

/**
 * Determines how to transpile each part of the file.
 *
 * @param {string} key
 * @param {Object} data
 */
function transpile(key, data) {
  switch (key) {
    case 'title':
      return `# ${data}`;

    case 'link':
      return `[${data.label}](${data.url})`;

    case 'toc':
      return TOC_PLACEHOLDER;

    case 'name':
      return `<a name="${data}"></a><a name="${sectionNum}.${ruleNum}"></a>\n` +
        `- [${sectionNum}.${ruleNum}](#${data}) `;

    case 'rule':
      return data + '\n\n';

    case 'lint':
      let lintBuffer = [];
      Object.keys(data).forEach((lint) => {
        lintBuffer.push(`\n  - ${lint}: `);

        let itemBuffer = [];
        data[lint].map((item) => {
          itemBuffer.length > 0 && itemBuffer.push(', ');
          itemBuffer.push(`[\`${item}\`](https://eslint.org/docs/rules/${item})`);
        });
        lintBuffer.push(itemBuffer.join(''));
      });
      return lintBuffer.join('');

    case 'why':
      let whyBuffer = [];
      Object.keys(data).forEach((key) => {
        whyBuffer.push(`\n\n  > Why? ${data[key]}`)
      });
      return whyBuffer.join('');

    case 'todo':
      return `\n\n  > TODO: ${data}`;

    case 'list':
      return data.map(item => `  - ${item}`).join('\n');

    case 'examples':
      let exampleBuffer = [
        '\n\n',
        `  \`\`\`${data.lang}\n`,
        data.code.map(c => `  ${c}`).join('\n'),
        '\n',
        '  ```',
        '\n\n'
      ];
      return exampleBuffer.join('');

    case 'sections':
      let buffer = [];
      toc.length = 0;

      Object.keys(data).forEach((section) => {
        sectionNum += 1;
        ruleNum = 0;

        buffer.push(`<a name="${toLink(section)}"></a>\n`);
        buffer.push(`## ${section}\n\n`);
        toc.push(`1. [${section}](#${toLink(section)})`);

        data[section].map((rules) => {
          ruleNum += 1;

          Object.keys(rules).forEach((key) => {
            buffer.push(transpile(key, rules[key]));
          });
        });

        buffer.push(`${TO_TOP}\n\n`);
      });

      return buffer.join('');

    default:
      return '';
  }
}

/**
 * Removes spaces and capitol letters from a string to make it a link.
 *
 * @param {string} str
 */
function toLink(str) {
  return str.toLowerCase().replace(/ /g, '-');
}
