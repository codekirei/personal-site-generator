---
template: post
title: Currying and ES6 Arrow Functions
description: Combine ES6's arrow functions with currying for concise, composable, testable JavaScript.
slug: /posts/currying-with-arrow-functions
posted: 2016-01-11T12:00-08:00
tags:
- functional programming
- ES6
---

Combine ES6's arrow functions with currying, a concept used often in functional programming, for concise, composable, testable JavaScript.

--MORE--

[Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are a concise way to create functions in ES6 JavaScript. [Currying](https://en.wikipedia.org/wiki/Currying) is a technique often used in functional programming languages like [Haskell](https://wiki.haskell.org/Currying). Put them together, and you get beautiful, concise function declarations that are both easy to read and easy to test.

## Functions in JavaScript

First, let's talk about functions in JavaScript. There are two ways to define JS functions: [declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Function_declarations) and [expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Function_expressions).

```js
// declaration
function addOne(foo) {
  return foo + 1
}

// expression
var addOne = function(foo) {
  return foo + 1
}
```

Function declarations are named functions invoked with the `function` keyword, while function expressions are anonymous functions that are assigned to a `var`. One of the key differences between function declarations and function expressions is [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting). In JavaScript, `var` and `function` statements are hoisted to the top of their scope, which means they can be interacted with before being declared. However, there are some intricacies to be aware of.

```js
foo = 1
var foo
```

In this case, `foo` has the value `1` assigned to it before it is declared. This works because of hoisting &mdash; what's really happening is the variable declaration `var foo` is being raised to the top of its scope (and thus before `foo = 1`), and `foo` is given the value `undefined` until further notice. A few well-placed `console.log` statements illustrate this nicely.

```js
console.log(foo)
  // prints undefined

foo = 1

console.log(foo)
  // prints 1

var foo
```

The fact that hoisted variables are given a value of `undefined` can be detrimental in the context of function expressions &mdash; ordering becomes very important.

```js
addOne(1)
  // throws TypeError: addOne is not a function

var addOne = function(foo) {
  return foo + 1
}
```

At the point `addOne(1)` is called here, `addOne` still has the value `undefined`, not the function assigned later in the code, so JavaScript sees `undefined` where it expects a `function` and throws a TypeError. In order for this code to work as intended, the function expression has to come before `addOne(1)`. Function declarations avoid this issue, because function declarations are not `undefined` when hoisted.

```js
addOne(1)
  // returns 2

function addOne(foo) {
  return foo + 1
}
```

## Introducing Arrow Functions

Arrow functions are a shorthand syntax for creating function expressions. Note that I'll mostly use `const` &mdash; another new ES6 feature &mdash; in place of `var` from here out. A `const` is a `var` with a read-only reference, meaning it cannot be assigned to a different value once assigned. This isn't absolutely necessary, but in general using `const` with function expressions that you don't intend to reassign is a good practice in ES6.

```js
// function expression
var addOne = function(foo) {
  return foo + 1
}

// equivalent arrow function
const addOne = foo => foo + 1
```

Arrow functions do a number of things automatically behind the scenes, like lexically binding `this` (which is very important, but not relevant to this blog post). Additionally, under certain conditions, arrow functions allow syntax to be omitted:

- If there is only one parameter, parens are optional
- If the function body is a single expression, braces are optional and the expression is automatically returned

```js
// arrow function with optional syntax added back in
const foo = (bar) => {
  return bar + 1
}
```

An arrow function with all the syntax added back in doesn't look all that different from a traditional function expression, so optimal arrow functions (from a readability standpoint) consist of a single expression that takes a single parameter. At first, this seems very limiting. Hopefully, I'll be able to change your mind on that, at least a little.

# Dealing With Complexity

A function that simply increases a number by one is quite simple, so I think something a bit more complex is in order. First, let's say we want to increase each number in an array by one.

```js
const addOneToEach = ar => ar.map(num => num + 1)

addOneToEach([1, 2, 3])
  // returns [2, 3, 4]
```

What's happening here? We've declared an arrow function that takes array `ar` as its sole parameter. This function iterates over `ar` with `Array.prototype.map()`. `.map()` takes a callback function with the arguments `(currentValue, index, array)`. We only care about `currentValue`, so we use the anonymous arrow function `num => num + 1` as the callback. All together, `addOneToEach` returns an array constructed by the results of applying the anonymous arrow function to each value in `ar`.

That's a good start! But wait, we've just discovered that sometimes the arrays of numbers that we need to increment by one come from an API that stringifies numbers, and there's nothing we can do about it (*grumble grumble*). It's not consistent, either &mdash; sometimes some of the numbers are stringified and some aren't. Guess we'll just have to add some logic to detect strings and un-stringify them.

```js
const addOneToEach = ar =>
  ar.map(entity => {
    if (typeof entity === 'string') {
      return parseInt(entity) + 1
    }
    return entity + 1
  })

addOneToEach([1, 2, 3])
  // still returns [2, 3, 4]

addOneToEach([1, '2', 3])
  // returns [2, 3, 4] as well, awesome!
```

That works, but look how fast things got kind of ugly. Our old friends `{`, `}`, and `return` are back, and we're already nesting logic three levels deep.

One trick for writing clean arrow functions when you have an `if...else` logic block is to use a [ternary expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) instead, so let's try that.

```js
const addOneToEach = ar =>
  ar.map(entity => typeof entity === 'string'
    ? parseInt(entity) + 1
    : entity + 1
  )
```

Much better! We still have a lot of logic wrapped up in an anonymous callback, though. We can't reuse that logic anywhere, and we can't export it or test it in isolation. Let's split up the `+ 1` and `parseInt` into separate named functions and use those as separate callbacks inside chained `ar.map()` calls.

```js
const ensureNum = entity =>
  typeof entity === 'string' ? parseInt(entity) : entity

const addOne = num => num + 1

const addOneToEach = ar =>
  ar.map(ensureNum)
    .map(addOne)
```

Sorcery! There's a lot to digest here. We've confined the mutative bits of logic in their own named arrow functions, `ensureNum` and `addOne`, which makes them easily reusable, exportable, and testable. We use these functions as callbacks in chained `.map()` calls in our `addOneToEach` function. We also take advantage of a little syntax trick with applying the callbacks &mdash; because the entire callback expression consists of a named function, we can skip creating an anonymous function that just passes parameters to the named function and use the named function itself. To illustrate:

```js
// anonymous function callback
function addOneToEach(ar) {
  return ar.map(function(num) {
    return num + 1
  })
}

// anonymous callback with arrow functions
const addOneToEach = ar => ar.map(num => num + 1)

// named function applied by anonymous callback arrow function
const addOne = num => num + 1
const addOneToEach = ar => ar.map(num => addOne(num))

// named function callback
const addOne = num => num + 1
const addOneToEach = ar => ar.map(addOne)
```

Awesome! We just got word, though, that management wants to introduce some new features that will require incrementing by two and three sometimes, not just one. How do we implement that? Well, we could brute force it...

```js
const ensureNum = entity =>
  typeof entity === 'string' ? parseInt(entity) : entity

const addOne = num => num + 1
const addTwo = num => num + 2
const addThree = num => num + 3

const addOneToEach = ar =>
  ar.map(ensureNum)
    .map(addOne)

const addTwoToEach = ar =>
  ar.map(ensureNum)
    .map(addTwo)

const addThreeToEach = ar =>
  ar.map(ensureNum)
    .map(addThree)
```

Obviously, that approach doesn't scale. Let's [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) things up by adding a new param, `by`, to hold the number we are incrementing by.

```js
const ensureNum = entity =>
  typeof entity === 'string' ? parseInt(entity) : entity

const incrementEach = (ar, by) =>
  ar.map(ensureNum)
    .map(num => num + by)
```

That's much better, but we've lost our named `addOne` callback. Let's make a new `addNums` arrow function that we can pass both the current `num` in `.map()` and the new `by` param from `incrementEach` to.

```js
const ensureNum = entity =>
  typeof entity === 'string' ? parseInt(entity) : entity

const addNums = (a, b) => a + b

const incrementEach = (ar, by) =>
  ar.map(ensureNum)
    .map(num => addNums(num, by))
```

That wasn't so hard, right? Now we have a flexible `incrementEach` function that can increment an `ar` of numbers or stringified numbers by any number `by`. So are we done? Not quite!

## Adding the Curry

[Currying](https://en.wikipedia.org/wiki/Currying) is a mathematical concept that involves splitting up a function that takes multiple arguments (params) into a sequence of functions that each take an individual argument. It is most commonly used in Functional programming languages like [Haskell](https://www.haskell.org/), but JavaScript gets to join in on the fun too since it supports [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function).

Let's start simple:

```js
const sum = function(a, b) {
  return a + b
}

sum(3, 4)
  // returns 7
```

Here we have a function expression that adds together two parameters. Let's curry this function by splitting it into smaller functions that take a single param at a time. This is possible because JavaScript functions can return other functions.

```js
const sum = function(a) {
  return function(b) {
    return a + b
  }
}

sum(3)(4)
  // returns 7
```

That may seem stupid, but stick with me and it will all be worth it. Notice the difference in how the curried version of `sum` is called. In the normal function call, we pass two params: `sum(3, 4)`. In the curried function, we pass the first param &mdash; `sum(3)` &mdash; then pass the next param in a new set of params to the anonymous function returned by `sum(3)`. So by calling `sum(3)(4)`, we are making two distinct function calls with two distinct groups of parameters that each contain on parameter, as opposed to `sum(3, 4)` which calls one function with one group of two parameters.

Now, let's mix in some arrow functions.

```js
// no curry
const sum = (a, b) => a + b

// curry
const sum = a => b => a + b
```

Woah! Double arrow function! What does this mean? When you break it down, this curried double arrow function is functionally equivalent to the curried function expression from before. You have a named arrow function returning an anonymous arrow function, and both functions accept a single parameter. Isn't it beautiful?

Let's go back to our `incrementEach` function. Here is where we left things:

```js
const ensureNum = entity =>
  typeof entity === 'string' ? parseInt(entity) : entity

const addNums = (a, b) => a + b

const incrementEach = (ar, by) =>
  ar.map(ensureNum)
    .map(num => addNums(num, by))
```

Let's rewrite `addNums` with our newfound currying skills.

```js
const ensureNum = entity =>
  typeof entity === 'string' ? parseInt(entity) : entity

const addNums = a => b => a + b

const incrementEach = (ar, by) =>
  ar.map(ensureNum)
    .map(addNums(by))
```

`addNums` is now a function that takes a parameter that returns a function that takes *another* parameter. So first we call `addNums(by)`, which returns the anonymous function `b => by + b`. `.map()` then calls this anonymous function as its callback and returns `by` + `currentValue` &mdash; the current value in the array incremented by the value of `by`.

With currying and (double) arrow functions, we get to keep our named calledbacks that are exportable, reusable, and testable in isolation. We get the handy callback shorthand syntax so we don't have to write extra anonymous callback functions just to pass variables, yet our named callback functions are still flexible enough to receive params passed down from a higher-order function when they are called.

Do you recall how earlier it seemed that writing functions that take a single parameter and return a single expression in order to optimize readability with arrow functions would be limiting? With currying, it doesn't have to be! I've been experimenting with this technique a lot in my own projects and I really like it so far. For some more examples, check out the code in my [hari](https://github.com/codekirei/hari/tree/master/lib) and [smg](https://github.com/codekirei/smg/blob/master/index.js) projects on GitHub.

That's all for now! If you made it all the way here, give yourself a pat on the back. I hope you enjoyed the read and maybe even learned a thing or two. Now go forth and make cool things!
