
# breeze [![NPM version][npm-status-image]][npm] [![Build Status][build-status-image]][travis] [![ESLint Config][eslint-config-image]][eslint-config]

> Git Flow CLI wrapper for NPM based products

Tired of typing long command lines, naming your hotfix and release branches or constantly checking the state of your repository before finishing branches? Breeze is a tool made for you!

Breeze is a wonderful simple CLI wrapper that would help you to deal with common repetitive tasks that must be done in an NPM based product. It also use a configuration file that can be checked-out in your repository to make sure all contributors use the same Git Flow parameters.

## Features

* Shared configuration through `.breezerc` file
* New release or new hotfix automatically bump package version
* Finishing a branch automatically perform the right operation according to the branch prefix

## Installation

With NPM:

```
$ npm install @njakob/breeze
```

With Yarn:

```
$ yarn add @njakob/breeze
```

## Usage

### Initialization

In order to initialize Breeze for your team, use the following command:

```sh
$ breeze init
```

This would create an initial `.breezerc` configuration file that you can checkout in your repository. Besides Git Flow parameters, bump commits for releases and hotfixies can also be configured through this file.

`.breezerc`
```json
{
  "branch": {
    "master": "master",
    "develop": "develop"
  },
  "prefix": {
    "feature": "feature/",
    "release": "release/",
    "hotfix": "hotfix/",
    "version-tag": ""
  },
  "commit": {
    "release": "Bump to %s",
    "hotfix": "Bump to %s"
  }
}
```

### Creating branches

```sh
$ breeze feature
```

```sh
$ breeze release
```

```sh
$ breeze hotfix
```

```sh
$ breeze finish
```

## Licences

`njakob/breeze` is licensed under the [MIT License][licence].

[licence]: LICENSE
[eslint-config]: https://github.com/njakob/eslint-config
[npm]: https://nodei.co/npm/@njakob/breeze
[travis]: https://travis-ci.org/njakob/breeze
[npm-status-image]: https://img.shields.io/npm/v/@njakob/breeze.svg
[build-status-image]: https://travis-ci.org/njakob/breeze.svg?branch=master
[eslint-config-image]: https://img.shields.io/badge/eslint_config-njakob-463fd4.svg
