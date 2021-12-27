# srs-pages

[![Build Status][actions-img]][actions-url]
[![Coverage Status][codecov-img]][codecov-url]
[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> static web app workflow

## Installation

```shell
$ npm install srs-pages

# or yarn
$ yarn add srs-pages
```

## Usage

<!-- TODO: Introduction of Usage -->

```javascript
const srsPages = require('srs-pages')
const result = srsPages('w')
// result => 'w@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### srsPages(input, options?)

#### input

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [Jerry](https://github.com/srs888001/)



[actions-img]: https://img.shields.io/github/workflow/status/srs/srs-pages/CI
[actions-url]: https://github.com/srs/srs-pages/actions
[codecov-img]: https://img.shields.io/codecov/c/github/srs/srs-pages
[codecov-url]: https://codecov.io/gh/srs/srs-pages
[license-img]: https://img.shields.io/github/license/srs/srs-pages
[license-url]: https://github.com/srs/srs-pages/blob/master/LICENSE
[downloads-img]: https://img.shields.io/npm/dm/srs-pages
[downloads-url]: https://npm.im/srs-pages
[version-img]: https://img.shields.io/npm/v/srs-pages
[version-url]: https://npm.im/srs-pages
[dependency-img]: https://img.shields.io/david/srs/srs-pages
[dependency-url]: https://david-dm.org/srs/srs-pages
[devdependency-img]: https://img.shields.io/david/dev/srs/srs-pages
[devdependency-url]: https://david-dm.org/srs/srs-pages?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
