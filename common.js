const fs = require('fs')
const { hrtime } = require('process')

/**
 * Times how long a function takes to execute.
 * Supports promises
 * @param {*} fn A function (a/sync) to time
 * @returns {{result: object, ms: number}} An object representing the return/resolve value from the function and execution time in ms
 */
module.exports.timeFunction = function timeFunction(fn) {
  return new Promise((resolve, reject) => {
    const start = Number(hrtime.bigint())
    const result = fn()
    if (result instanceof Promise) {
      result.then(result => {
        resolve({ result, ms: (Number(hrtime.bigint()) - start) / 1000000 })
      }).catch(e => {
        reject(e)
      })
    } else {
      resolve({ result, ms: (Number(hrtime.bigint()) - start) / 1000000 })
    }
  })
}

/**
 * Times how long a function takes to execute.
 * Supports promises
 * @param {*} fn A function (a/sync) to time
 * @returns {{result: object, ms: number}} An object representing the return/resolve value from the function and execution time in ms
 */
module.exports.timeFn = function timeFn(fn) {
  const start = Number(hrtime.bigint())
  const result = fn()
  return { result, ms: (Number(hrtime.bigint()) - start) / 1000000 }
}

/**
 * Read in file and return an array representing content split by new line
 */
module.exports.getInput = function getInput(location) {
  const expenses = fs.readFileSync(location).toString()
  const split = expenses.split('\r\n')
  if (split.length === 1) {
    // We must be on a Unix OS
    return expenses.split('\n')
  }
  return split
}

/**
 * Read in file and return as a string
 */
module.exports.getInputAsString = function getInputAsString(location) {
  return fs.readFileSync(location).toString()
}
