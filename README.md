# pipe-promised

Allow easy piping of promise-returning and synchronous functions, inspired by Ramda's `pipe` and lodash's `flow`.

```js
// previously
const result = await fun1(arg)
  .then(fun2)
  .then(fun3)

// or if the first function was maybe not returning a function
const result = await Promise.resolve(fun1(arg))
  .then(fun2)
  .then(fun3)
```

With `pipe-promised` this becomes

```js
const result = await pipe(
  fun1,
  fun2,
  fun3
)(arg)
```

Or if you prefer right-to-left composition

```js
const {compose} = require('pipe-promised')

const result = await compose(fun3, fun2, fun1)(arg)
```

## Structure of pipe-promised

Sometimes you want to pass in multiple arguments to your first function and you can do that with the default export of `pipe-promised` as well as with `compose`

```js
const pipe = require('pipe-promised')
const {compose} = require('pipe-promised')

const result = await pipe(fn1, fn2)(arg1, arg2)
const result2 = await compose(fn2, fn1)(arg1, arg2)
```

But there are cases where arity matters and for those the unary methods `o` and `pipeUnary` exist

```js
const {pipeUnary, o} = require('pipe-prpomised')

const result = await pipeUnary(fn1, fn2)(arg, ignored)
const result2 = await o(fn2, fn1)(arg, ignored)
```
