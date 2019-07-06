# Eslint Rule Finder

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](https://travis-ci.org/jnmorse/eslint-rule-finder.svg?branch=master)](https://travis-ci.org/jnmorse/eslint-rule-finder)

<a href='https://ko-fi.com/Q5Q7XEIM' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

Package to help eslint config maintainers keep there rules up to date.

## Install

```sh
npm i -D eslint-rule-finder
```

## CLI Usage

Check for undefined rules in your config

```sh
rule-finder undefined .eslint.rc
```

## Global CLI Options

```sh
rule-finder -i, --include # Include Deprecated rules
rule-finder -n, --no-errors # no emit errors
```

## Use in Test Frameworks

Below is some examples of how to use this with testing frameworks

### Mocha & Chai

```javascript
const { RuleFinder } = require('eslint-rule-finder');
const { assert } = require('chai');

let ruleFinder;

describe('Rules', () => {
  before(() => {
    ruleFinder = new RuleFinder();
  });

  it('should have 0 undefined rules', () => {
    const undefined = ruleFinder.getUndefinedRules();

    assert.equal(undfined.size, 0);
  });

  it('should have 0 deprecated rules', () => {
    const { deprecated } = ruleFinder;

    assert.equal(deprecated.size, 0);
  });
});
```

### Jest Example

```javascript
const { RuleFinder } = require('eslint-rule-finder');

let ruleFinder;

describe('Rules', () => {
  beforeAll(() => {
    ruleFinder = new RuleFinder();
  });

  it('should have 0 undefined rules', () => {
    const undefined = ruleFinder.getUndefinedRules();

    expect(undefined.size).toBe(0);
  });

  it('should have 0 deprecated rules', () => {
    const { deprecated } = ruleFinder;

    expect(deprecated).toEqual(new Map());
  });
});
```
