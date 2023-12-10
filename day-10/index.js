// const { writeFileSync } = require('fs');
const { timeFunction, getInput, getAdjacent4 } = require('../common')

// The pipes are arranged in a two-dimensional grid of tiles:

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

function partOne(grid) {
  // Find starting point (the S)
  const start = getStart(grid)
  const current = { ...start }

  const pipeTypes = ['|', '-', 'L', 'J', '7', 'F']

  for (const pipeType of pipeTypes) {
    const currentPath = []
    const paths = []
    grid[start.y][start.x] = pipeType

    try {
      const found = navigate(grid, current.x, current.y, currentPath, paths, false)
      if (found) {
        //console.log(`furthest: ${currentPath.length / 2}`)
        return { S: pipeType, ans: currentPath.length / 2, path: currentPath }
      }
      //console.log(`End when pipe is ${pipeType} (${found})`)
    } catch (e) {
      console.error(e.message)
      console.log(`Got as far as ${currentPath.length} when S is ${pipeType} (plz gib more stack memory)`)
      //console.log(currentPath)
    }
  }
}

function navigate(grid, x, y, currentPath, paths, isFound = false) {
  currentPath.push({ x, y, pipe: grid[y][x] })
  const previous = currentPath[currentPath.length - 2]
  const opts = getValidMovementOptions(grid, x, y, previous?.x, previous?.y)
  if (opts.length === 0) {
    paths.push([...currentPath]) // Path is complete and led to deadend
    currentPath.pop()
    return // Figure out backtracking
  }

  for (let i = 0; i < opts.length; i++) {
    const opt = opts[i]

    const start = currentPath[0]
    if (isFound || (opt.x === start.x && opt.y === start.y)) {
      // Would want to navigate back to start - loop found
      isFound = true
      return true
    }

    if (navigate(grid, opt.x, opt.y, currentPath, paths, isFound)) {
      return true
    }
  }

  paths.push([...currentPath]) // Path is complete and led to deadend
  currentPath.pop()
  return // Figure out backtracking
}

function getValidMovementOptions(grid, x, y, excludeX, excludeY) {
  const tryGet = (x, y) => {
    if (grid[y]?.[x]) {
      return grid[y][x]
    }
  }

  const pipe1 = grid[y][x]

  const opts = []

  const left = x - 1 === excludeX && y === excludeY ? '.' : tryGet(x - 1, y)
  const right = x + 1 === excludeX && y === excludeY ? '.' : tryGet(x + 1, y)
  const up = x === excludeX && y - 1 === excludeY ? '.' : tryGet(x, y - 1)
  const down = x === excludeX && y + 1 === excludeY ? '.' : tryGet(x, y + 1)

  if (pipe1 === '|') {
    if (up === '|' || up === 'F' || up === '7') {
      opts.push({ x, y: y - 1 })
    }
    if (down === '|' || down === 'L' || down === 'J') {
      opts.push({ x, y: y + 1 })
    }
  } else if (pipe1 === '-') {
    if (left === '-' || left === 'L' || left === 'F') {
      opts.push({ x: x - 1, y })
    }
    if (right === '-' || right === '7' || right === 'J') {
      opts.push({ x: x + 1, y })
    }
  } else if (pipe1 === 'L') {
    if (up === '|' || up === 'F' || up === '7') {
      opts.push({ x, y: y - 1 })
    }
    if (right === '-' || right === '7' || right === 'J') {
      opts.push({ x: x + 1, y })
    }
  } else if (pipe1 === 'J') {
    if (up === '|' || up === 'F' || up === '7') {
      opts.push({ x, y: y - 1 })
    }
    if (left === '-' || left === 'L' || left === 'F') {
      opts.push({ x: x - 1, y })
    }
  } else if (pipe1 === '7') {
    if (down === '|' || down === 'L' || down === 'J') {
      opts.push({ x, y: y + 1 })
    }
    if (left === '-' || left === 'L' || left === 'F') {
      opts.push({ x: x - 1, y })
    }
  } else if (pipe1 === 'F') {
    if (down === '|' || down === 'L' || down === 'J') {
      opts.push({ x, y: y + 1 })
    }
    if (right === '-' || right === '7' || right === 'J') {
      opts.push({ x: x + 1, y })
    }
  } else if (pipe1 === '.') {
    // Nothing
  } else {
    throw new Error('Unknown pipe type')
  }

  return opts
}

function getStart(grid) {
  let startX = 0
  let startY = 0

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
      if (row[x] === 'S') {
        startX = x
        startY = y
      }
    }
  }

  return { x: startX, y: startY }
}

function partTwo(grid, loop) {
  // Convert all cells that are not on the main loop to .
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
      // Check if it's on the loop
      if (loop.some(l => l.x === x && l.y === y)) {
        // It's on the loop
      } else if (grid[y][x] !== 'x') {
        grid[y][x] = '.'
      }
    }
  }

  // Modify the grid to "break open" squeezable pipes
  // Scan cell by cell until we find a squeezable pair (NOT F-, L-, -7, -J)
  // On each discovery, insert an x between them and pad out the other columns with either (- or .)
  // Use - if the cell pair create a right angle (F-, L-, -7, -J, --)
  // Else use x

  const enclosedPairsHorizontal = ['F-', 'L-', '-7', '-J', 'LJ', 'L7', 'F7', 'FJ', '--']
  const nonPipe = ['.', 'x']

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 1; x < row.length; x++) {
      const char = grid[y][x]
      const previousChar = grid[y][x - 1]
      const pair = `${previousChar}${char}`
      if (!nonPipe.includes(char) && !nonPipe.includes(previousChar) && !enclosedPairsHorizontal.includes(pair)) {
        // Needs breaking up
        for (let i = 0; i < grid.length; i++) {
          const row = grid[i]
          if (enclosedPairsHorizontal.includes(`${row[x - 1]}${row[x]}`)) {
            row.splice(x, 0, '-')
          } else {
            row.splice(x, 0, 'x')
          }
        }
      }
    }
  }

  const enclosedPairsVertical1 = ['|', 'F', '7', 'F', 'F', '7', '7', '|', '|']
  const enclosedPairsVertical2 = ['|', '|', '|', 'J', 'L', 'L', 'J', 'L', 'J']
  const enclosedPairsVertical = enclosedPairsVertical1.map((p, i) => `${p}${enclosedPairsVertical2[i]}`)

  for (let y = 1; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
      const char = grid[y][x]
      const previousChar = grid[y - 1][x]
      if (!nonPipe.includes(char) && !nonPipe.includes(previousChar) && !enclosedPairsVertical.includes(`${previousChar}${char}`)) {
        // Needs breaking up
        grid.splice(y, 0, grid[0].map(() => 'x'))
        // On that row we just inserted, we need to correct any that should be vertical bars
        for (let z = 0; z < grid[y].length; z++) {
          const char = grid[y + 1][z]
          const previousChar = grid[y - 1][z]
          if (enclosedPairsVertical.includes(`${previousChar}${char}`)) {
            grid[y][z] = '|'
          }
        }
      }
    }
  }

  const startDotsLeft = grid.reduce((acc, row) => acc + row.filter(c => c === '.').length, 0)

  // Count up how may tiles (.) have a route leading to outside
  let count = 0
  let cosyTiles = []
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
      //const dotsLeft = grid.reduce((acc, row) => acc + row.filter(c => c === '.').length, 0)
      //console.log(`(${y}, ${x}) Dots left: ${dotsLeft}. Cosy tiles: ${cosyTiles.length} (max: ${startDotsLeft})`)
      if (row[x] === '.') {
        if (navigateTile(grid, x, y, [], [], false)) {

        } else {
          cosyTiles.push({ x, y })
          count++
        }
      }
    }
  }

  // Delete columns that start with an x
  for (let i = 0; i < grid.length; i++) {
    if (grid[0][i] === 'x') {
      for (let y = 0; y < grid.length; y++) {
        grid[y].splice(i, 1)
      }
      i = 0
    }
  }

  return count
}

function getValidMovementOptionsTile(grid, x, y, visitedTiles) {
  const adjacents = getAdjacent4(grid, x, y)
  return adjacents.filter(o => (o.char === '.' || o.char === 'x' || o.char === 'O') && !visitedTiles.some(v => v.x === o.x && v.y === o.y))
}

function navigateTile(grid, x, y, currentPath, visited, isFound = false) {
  currentPath.push({ x, y, pipe: grid[y][x] })
  visited.push({ x, y })

  if (x === grid[0].length - 1 || x === 0 || y === grid.length - 1 || y === 0) {
    // Tile is on the edge, must be a route to outside
    isFound = true
    markAllVisitedAsO(grid, visited)
    return true
  }

  const previous = currentPath[currentPath.length - 2]
  const opts = getValidMovementOptionsTile(grid, x, y, visited)
  if (opts.length === 0) {
    currentPath.pop()
    return // Figure out backtracking
  }

  for (let i = 0; i < opts.length; i++) {
    const opt = opts[i]
    const char = grid[opt.y][opt.x]

    if (char === 'O' || (opt.x === grid[0].length - 1 || opt.x === 0 || opt.y === grid.length - 1 || opt.y === 0)) {
      // Tile is on the edge, must be a route to outside
      isFound = true
      markAllVisitedAsO(grid, visited)
      return true
    }

    if (navigateTile(grid, opt.x, opt.y, currentPath, visited, isFound)) {
      return true
    }
  }

  currentPath.pop()
  return // Figure out backtracking
}

function markAllVisitedAsO(grid, visited) {
  for (let i = 0; i < visited.length; i++) {
    const v = visited[i]
    grid[v.y][v.x] = 'O'
  }
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)
  const grid = numbers.map(row => row.split(''))

  const task1 = await timeFunction(() => partOne(grid))
  const { path } = task1.result
  const task2 = await timeFunction(() => partTwo(grid, path))
  return [{ ans: task1.result.ans, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start