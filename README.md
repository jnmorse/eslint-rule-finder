# Eslint Rule Finder

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](https://travis-ci.org/jnmorse/eslint-rule-finder.svg?branch=master)](https://travis-ci.org/jnmorse/eslint-rule-finder)

Package to help eslint config maintainers keep there rules up to date.

## Install

```sh
npm i -D eslint-rule-finder
```

## Usage

Check for unused rules and error if found

```sh
eslint-rule-finder --unused .eslint.rc
```

Save Unused Rules to a markdown file as a list

```sh
eslint-rule-finder --unused .eslint.rc --save UNUSED.md
```

## Use in Test Frameworks
Below is some examples of how to use this with testing frameworks

### Mocha & Chai

```javascript
const { LoadConfig, findUnused } = require('eslint-rule-finder')
const { assert } = require('chai')

let config

describe('Rules', () => {
  before(() => {
    config = new LoadConfig()
  })

  it('should have 0 undefined rules', () => {
    const unused = findUnused(config)

    assert.isEmpty(unused)
  })

  it('should have 0 deprecated rules', () => {
    assert.isEmpty(config.deprecated)
  })
})
```
