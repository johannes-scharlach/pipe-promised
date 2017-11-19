'use strict'

const Promise = require('bluebird')

const reducer = (total, current) => current(total)

const pipe = (...fns) => arg => Promise.reduce(fns, reducer, arg)
const o = (...fns) => arg => Promise.reduce(fns.reverse(), reducer, arg)

const pipeNAry = (...fns) => (...args) => {
  if (fns.length === 0) return Promise.resolve(args[0])

  return pipe(...fns.slice(0, -1), fns[0](...args))
}

const composeNAry = (...fns) => pipeNAry(...fns.reverse())
const compose = composeNAry

module.exports = pipeNAry

Object.assign(module.exports, {
  pipe,
  compose,
  o,
})
