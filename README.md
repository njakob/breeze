
# breeze [![Build Status][build-status-image]][travis] [![ESLint Config][eslint-config-image]][eslint-config]

> Git Flow tool built for NPM based packages.

:rotating_light: WIP

## Features

* Shared configuration through `.breezerc` file
* Create a new release automatically bump package version
* Finish a feature, release or hotfix automatically use the current branch

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

```sh
$ breeze init
```

```sh
$ breeze status
```

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

```sh
$ breeze version
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
