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

module.exports.getAdjacent8 = function getAdjacent8(grid, inX, inY, pointSize = 1) {
  const adjacents = []
  const minY = Math.max(0, inY - 1) // Either first row in grid or one above cell (inX, inY)
  const maxY = Math.min(inY + 1, grid.length - 1) // Either one below cell (inX, inY) or last row in grid

  const minX = Math.max(0, inX - pointSize) // Either first column in grid or (pointSize) left of cell (inX, inY)
  const maxX = Math.min(inX + 2, grid[0].length) // Either one right of cell (inX, inY) or last column in grid

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const char = grid[y][x]
      adjacents.push({ char, coord: `${x}, ${y}`, x, y })
    }
  }

  return adjacents
}

module.exports.getAdjacent4 = function getAdjacent4(grid, inX, inY) {
  const adjacents = []
  const tryGet = (x, y) => {
    if (grid[y]?.[x]) {
      adjacents.push({ char: grid[y][x], coord: `${x}, ${y}`, x, y })
    }
  }
  tryGet(inX - 1, inY) // Left
  tryGet(inX + 1, inY) // Right
  tryGet(inX, inY - 1) // Up
  tryGet(inX, inY + 1) // Down
  return adjacents
}

module.exports.printGrid = function printGrid(grid) {
  // Print grid

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    let str = ''
    for (let x = 0; x < row.length; x++) {
      str += row[x]
    }
    console.log(str)
  }
}