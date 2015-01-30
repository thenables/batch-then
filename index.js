
var Promise = require('native-or-bluebird')

module.exports = Batch

function Batch(options) {
  if (!(this instanceof Batch)) return new Batch(options)

  options = options || {}
  this.concurrency(options.concurrency || 5)

  this._progress = []
  this._fns = []
  this._promises = []
}

Batch.prototype.concurrency = function (num) {
  if (typeof num !== 'number') throw new TypeError('Concurrency must be an integer.')
  this._concurrency = num
}

Batch.prototype.push = function (fns) {
  if (!Array.isArray(fns)) fns = [].slice.call(arguments)

  for (var i = 0; i < fns.length; i++) {
    var fn = fns[i]
    if (typeof fn !== 'function') throw new TypeError('Arguments must be a function: ' + String(fn))
    this._fns.push(fn)
  }

  return this._fns.length
}

Batch.prototype.then = function (resolve, reject) {
  this._start()
  if (!this._progress.length && !this._fns.length) return Promise.resolve().then(resolve, reject);

  var self = this
  return new Promise(function (resolve, reject) {
    self._promises.push([resolve, reject])
  }).then(resolve, reject)
}

Batch.prototype.catch = function (reject) {
  return this.then(null, reject)
}

Batch.prototype._start = function () {
  while (this._fns.length && this._progress.length < this._concurrency)
    this._next()
}

Batch.prototype._next = function () {
  var fn = this._fns.shift()
  this._progress.push(fn)

  var self = this

  new Promise(function (resolve) {
    resolve(fn())
  }).then(function () {
    self._progress.splice(self._progress.indexOf(fn), 1)
    if (!self._progress.length && !self._fns.length)
      while (self._promises.length)
        self._promises.shift()[0]()
    else
      self._start()
  }, function (err) {
    self._progress.splice(self._progress.indexOf(fn), 1)
    if (!self._progress.length && !self._fns.length)
      while (self._promises.length)
        self._promises.shift()[1](err)
    else
      self._start()
  })
}
