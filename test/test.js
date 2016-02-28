
var Promise = require('any-promise')
var assert = require('assert')

var Batch = require('..')

it('should run all the functions', function () {
  var batch = new Batch()

  var arr1 = []
  var arr2 = []

  var i = 100;
  while (i--) {
    arr1.push(i)
    batch.push(function (i) {
      arr2.push(i)
    }.bind(null, i))
  }

  return batch.then(function () {
    assert.deepEqual(arr1, arr2)
  })
})

it('should do concurrency', function () {
  var fns = 0
  var batch = new Batch()
  batch.concurrency(2)

  var arr1 = []
  var arr2 = []

  var i = 100;
  while (i--) {
    arr1.push(i)
    batch.push(function (i) {
      assert(++fns <= 2)
      arr2.push(i)
      assert(--fns <= 2)
    }.bind(null, i))
  }

  return batch.then(function () {
    assert.deepEqual(arr1, arr2)
  })
})

it('should handle errors', function () {
  var batch = new Batch()
  batch.push(function () {
    throw new Error('boom')
  })
  batch.push(function () {
    throw new Error('boom')
  })
  batch.push(function () {
    throw new Error('boom')
  })
  return batch.then(function () {
    throw new Error('klajsdfkljaksjdf')
  }).catch(function (err) {
    assert.equal(err.message, 'boom')
  })
})

it('should support .catch', function () {
  var batch = new Batch()

  var i = 0;
  while (i++ < 100) {
    batch.push(function () {
      new Promise(function (resolve) {
        setImmediate(resolve)
      })
    })
  }

  return batch.catch(function () {

  })
})
