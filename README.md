# Eslint Rule Finder

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
