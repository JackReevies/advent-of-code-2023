const { timeFunction, getInput, getAdjacent4, printGrid } = require('../common')

function makeGrid(number) {
  return number.map(line => line.split(''))
}

function partOne(numbers) {
  const grid = makeGrid(numbers)
  const paths = []
  const stepLimit = 7
  const validEndCells = {}

  const x = grid.reduce((acc, obj, y) => {
    const index = obj.indexOf('S')
    if (index > -1) {
      acc = { x: index, y: y }
    }
    return acc
  }, { x: 0, y: 0 })

  shortenGrid(grid, stepLimit, x)

  printGrid(grid)

  navigate(grid, x.x, x.y, [], stepLimit, validEndCells)

  // Mark those cells on the original grid as O
  Object.values(validEndCells).forEach(obj => {
    grid[obj.y][obj.x] = 'O'
  })

  const unique = Object.keys(validEndCells).length

  printGrid(grid)
  console.log(unique)
  debugger
}

function shortenGrid(grid, maxSteps, start) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const distance = getDistance(x, y, start.x, start.y)
      if (distance > maxSteps) {
        grid[y][x] = '#'
      }
    }
  }
}

function alternatePartOne(numbers) {
  const grid = makeGrid(numbers)
  const stepLimit = 64

  const start = grid.reduce((acc, obj, y) => {
    const index = obj.indexOf('S')
    if (index > -1) {
      acc = { x: index, y: y }
    }
    return acc
  }, { x: 0, y: 0 })

  shortenGrid(grid, stepLimit, start)

  const possibleCells = []

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const paths = []
      if (grid[y][x] !== '.') continue
      navigateBackToStart(grid, x, y, [], paths, start, stepLimit + 1)

      if (paths.length === 0) {
        grid[y][x] = '#' // Might as well be a wall - no route back to start
        continue
      }

      possibleCells.push({ x, y, route: paths[0] })
    }
  }

  const valids = { [`${start.x},${start.y}`]: { x: start.x, y: start.y, char: grid[start.y][start.x] } }

  possibleCells.filter(o => o.route.length % 2 === 1).forEach(obj => {
    obj.route.reverse()
    const last = obj.route[obj.route.length - 1]
    valids[`${obj.x},${obj.y}`] = obj
  })

  const validsLength = Object.keys(valids).length

  return validsLength
}

function navigateBackToStart(grid, x, y, currentPath, paths = [], start, stepLimit = Number.MAX_SAFE_INTEGER) {
  currentPath.push({ x, y, char: grid[y][x] })

  if (paths.length > 0) {
    return true
  }

  if (currentPath.length >= stepLimit) {
    // Max steps taken
    currentPath.pop()
    return // Figure out backtracking
  }

  const dist = getDistance(x, y, start.x, start.y)
  if (currentPath.length + dist > stepLimit) {
    // We've already taken too many steps - go back
    currentPath.pop()
    return
  }

  const opts = getUnvisitedMovementOptions(grid, x, y, currentPath)

  // Sort by cells that have the closest distance to the start cell
  opts.sort((a, b) => {
    const aDist = getDistance(a.x, a.y, start.x, start.y)
    const bDist = getDistance(b.x, b.y, start.x, start.y)
    return aDist - bDist
  })

  if (opts.length === 0) {
    currentPath.pop()
    return // Figure out backtracking
  }

  for (let i = 0; i < opts.length; i++) {
    const opt = opts[i]

    if (opt.x === start.x && opt.y === start.y) {
      paths.push([...currentPath, { x: opt.x, y: opt.y, char: grid[opt.y][opt.x] }])
      return true
    }

    if (navigateBackToStart(grid, opt.x, opt.y, currentPath, paths, start, stepLimit)) {
      return true
    }
  }

  // Path is complete and led to deadend
  currentPath.pop()
}

function getUnvisitedMovementOptions(grid, x, y, currentPth = []) {
  const adjacents = getAdjacent4(grid, x, y)

  const unvisited = adjacents.filter(obj => obj.char !== '#' && !currentPth.find(p => p.x === obj.x && p.y === obj.y))

  return unvisited
}

function getDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function getValidMovementOptions(grid, x, y, currentPth = []) {
  const adjacents = getAdjacent4(grid, x, y)

  const unvisited = adjacents //.filter(obj => !currentPth.find(p => p.x === obj.x && p.y === obj.y))

  return unvisited
}

function navigate(grid, x, y, currentPath, stepLimit, validEndCells = {}) {
  currentPath.push({ x, y, char: grid[y][x] })

  if (currentPath.length >= stepLimit) {
    // Max steps taken

    validEndCells[`${x},${y}`] = { x, y, char: grid[y][x] }
    // Also every other cell from the end will be a valid end space
    for (let i = currentPath.length - 1; i >= 1; i -= 2) {
      const obj = currentPath[i]
      validEndCells[`${obj.x},${obj.y}`] = { x: obj.x, y: obj.y, char: grid[obj.y][obj.x] }
    }
    console.log(`Found a path: valid end steps is now ${Object.keys(validEndCells).length}`)
    currentPath.pop()
    return // Figure out backtracking
  }

  const previous = currentPath[currentPath.length - 2]
  const opts = getValidMovementOptions(grid, x, y, currentPath)
  if (opts.length === 0) {
    currentPath.pop()
    return // Figure out backtracking
  }

  for (let i = 0; i < opts.length; i++) {
    const opt = opts[i]

    if (previous?.x === opt.x && previous?.y === opt.y) continue
    if (opt.char === '#') continue

    if (navigate(grid, opt.x, opt.y, currentPath, stepLimit, validEndCells)) {

    }
  }

  // Path is complete and led to deadend
  currentPath.pop()
}

function partTwo(numbers) {
  // For the sake of my sanity. no thanks
  return -1
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => alternatePartOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start