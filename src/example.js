const JS = 'javascript';

module.exports = {
  title: 'Example JavaScript Style Guide',
  link: {
    label: 'Back to main',
    url: '../README.md'  
  },
  toc: true,
  sections: {
    'Declarations': [
      {
        name: 'declarations--prefer-const',
        rule: 'Use `const` do declare all variables. Avoid using `var`.',
        lint: {
          eslint: [';refer-const', 'no-const-assign']
        },
        why: [
          'This ensures you cannot reassign your references.'
        ],
        examples: {
          lang: JS,
          code: [
            '// bad',
            'var a = 1;',
            'var b = 2;',
            '',
            '// good',
            'const a = 1;',
            'const b = 2;',
          ]
        }
      },
      {
        name: 'declarations--disallow-var',
        rule: 'If the value needs to change, use `let`',
        lint: {
          eslint: ['no-var'],
        },
        why: [
          'let is block-scoped rather than function-scoped like var.',
        ],
        examples: {
          lang: JS,
          code: [
            '// bad',
            'var count = 1;',
            'if (true) {',
            '  count += 1;',
            '}',
            '',
            '// good',
            'let count = 1;',
            'if (true) {',
            '  count += 1;',
            '}'
          ]
        }
      }
    ]
  }
};