
# batch-then

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Run multiple functions in parallel with concurrency.
Only supports functions that return promises.

```js
var Batch = require('batch-then');

var batch = new Batch();
batch.concurrency(2);

batch.push(function () {
  return Promise.resolve(1);
});

batch.push(function () {
  return Promise.resolve(2);
});

batch.push(function () {
  return Promise.resolve(3);
});

batch.then( => );
```

[gitter-image]: https://badges.gitter.im/thenables/batch-then.png
[gitter-url]: https://gitter.im/thenables/batch-then
[npm-image]: https://img.shields.io/npm/v/batch-then.svg?style=flat-square
[npm-url]: https://npmjs.org/package/batch-then
[github-tag]: http://img.shields.io/github/tag/thenables/batch-then.svg?style=flat-square
[github-url]: https://github.com/thenables/batch-then/tags
[travis-image]: https://img.shields.io/travis/thenables/batch-then.svg?style=flat-square
[travis-url]: https://travis-ci.org/thenables/batch-then
[coveralls-image]: https://img.shields.io/coveralls/thenables/batch-then.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thenables/batch-then
[david-image]: http://img.shields.io/david/thenables/batch-then.svg?style=flat-square
[david-url]: https://david-dm.org/thenables/batch-then
[license-image]: http://img.shields.io/npm/l/batch-then.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/batch-then.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/batch-then
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
