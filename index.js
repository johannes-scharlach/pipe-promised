'use strict'

const Promise = require('bluebird')

const reducer = (total, current) => current(total)

const pipeUnary = (...fns) => arg => Promise.reduce(fns, reducer, arg)
const o = (...fns) => arg => Promise.reduce(fns.reverse(), reducer, arg)

const pipe = (...fns) => (...args) => {
  if (fns.length === 0) return Promise.resolve(args[0])

  return pipeUnary(...fns.slice(0, -1), fns[0](...args))
}

const composeNAry = (...fns) => pipe(...fns.reverse())
const compose = composeNAry

module.exports = pipe

Object.assign(module.exports, {
  pipeUnary,
  compose,
  o,
})
