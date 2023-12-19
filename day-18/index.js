const { timeFunction, getInput, getAdjacent4 } = require('../common')

function makeGrid(input) {
  const cur = { x: 0, y: 0 }
  let biggestX = 0
  let smallestX = 0
  let biggestY = 0
  let smallestY = 0
  for (let i = 0; i < input.length; i++) {
    const [_, direction, strNumber, colour] = /(.) (\d+) \((#.+)\)/.exec(input[i])

    const number = parseInt(strNumber)

    if (direction === 'R') {
      cur.x += number
      if (cur.x > biggestX) biggestX = cur.x
    } else if (direction === 'L') {
      cur.x -= number
      if (cur.x < smallestX) smallestX = cur.x
    } else if (direction === 'U') {
      cur.y -= number
      if (cur.y < smallestY) smallestY = cur.y
    } else if (direction === 'D') {
      if (cur.y > biggestY) biggestY = cur.y
      cur.y += number
    }
  }

  const grid = Array(Math.abs(smallestY) + biggestY).fill(0).map(o => Array(Math.abs(smallestX) + biggestX).fill('.'))
  let currentPoint = { x: Math.abs(smallestX), y: Math.abs(smallestY) }
  for (let i = 0; i < input.length; i++) {
    const [_, direction, strNumber, colour] = /(.) (\d+) \((#.+)\)/.exec(input[i])

    const number = parseInt(strNumber)

    // Run instruction

    if (direction === 'R') {
      safePoint(grid, currentPoint.x + number, currentPoint.y)
    } else if (direction === 'L') {
      safePoint(grid, currentPoint.x - number, currentPoint.y)
    } else if (direction === 'U') {
      safePoint(grid, currentPoint.x, currentPoint.y - number)
    } else if (direction === 'D') {
      safePoint(grid, currentPoint.x, currentPoint.y + number)
    }

    currentPoint = dig(grid, currentPoint.x, currentPoint.y, direction, number)
  }

  return grid
}

function partTwo(input) {
  let currentPoint = { x: 0, y: 0 }
  let sum = 0
  const vertices = []
  for (let i = 0; i < input.length; i++) {
    const [_, strNumber, hexDistance, directionNum] = /(.) \d+ \(#(.{5})(.)\)/.exec(input[i])

    const number = parseInt(hexDistance, 16)
    const direction = ['R', 'D', 'L', 'U'][parseInt(directionNum)]

    sum += number

    // Run instruction
    for (let i = 0; i < number; i++) {
      if (direction === 'R') {
        currentPoint.x++
      } else if (direction === 'L') {
        currentPoint.x--
      } else if (direction === 'U') {
        currentPoint.y--
      } else if (direction === 'D') {
        currentPoint.y++
      }
    }
    vertices.push({ x: currentPoint.x, y: currentPoint.y })
  }

  // Shoelace formula

  let sumOne = 0
  for (let i = 0; i < vertices.length; i++) {
    if (i === vertices.length - 1) {
      // Wrap back around
      sumOne += vertices[i].x * vertices[0].y
    } else {
      sumOne += vertices[i].x * vertices[i + 1].y
    }
  }

  let sumTwo = 0
  for (let i = 0; i < vertices.length; i++) {
    if (i === vertices.length - 1) {
      // Wrap back around
      sumTwo += vertices[i].y * vertices[0].x
    } else {
      sumTwo += vertices[i].y * vertices[i + 1].x
    }
  }

  const abs = Math.abs(sumTwo - sumOne)
  const absAns = abs / 2

  return absAns + (sum / 2) + 1
}

function dig(grid, x, y, direction, number) {
  let xNew = x
  let yNew = y

  for (let i = 0; i < number; i++) {
    if (direction === 'R') {
      grid[y][x + i] = '#'
      xNew++
    } else if (direction === 'L') {
      grid[y][x - i] = '#'
      xNew--
    } else if (direction === 'U') {
      grid[y - i][x] = '#'
      yNew--
    } else if (direction === 'D') {
      grid[y + i][x] = '#'
      yNew++
    }
  }

  return { x: xNew, y: yNew }
}

function safePoint(grid, x, y) {
  if (y >= grid.length) {
    const max = Math.max(...grid.map(o => o.length), 0)
    const count = y - grid.length + 1
    for (let i = 0; i < count; i++) {
      grid.push(Array(max).fill('.'))
    }
  }

  if (x >= grid[y].length) {
    grid[y].push('.')
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].length < grid[y].length) {
        grid[i].push('.')
      }
    }
  }
}

function partOne(numbers) {
  const grid = makeGrid(numbers)
  const hashCount = grid.reduce((acc, row) => acc + row.filter(o => o === '#').length, 0)

  // printGrid(grid)

  // Mark all outside dot tiles as O
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[0][x] === '.') grid[0][x] = 'O'
    if (grid[grid.length - 1][x] === '.') grid[grid.length - 1][x] = 'O'
  }

  for (let y = 0; y < grid.length; y++) {
    if (grid[y][0] === '.') grid[y][0] = 'O'
    if (grid[y][grid[0].length - 1] === '.') grid[y][grid[0].length - 1] = 'O'
  }

  // For each tiles does it touch an O? if so, make it also an O, repeat until no more changes

  let isChanged = true
  while (isChanged) {
    isChanged = false
    for (let y = 0; y < grid.length; y++) {
      const row = grid[y]
      for (let x = 0; x < row.length; x++) {
        if (grid[y][x] === '.') {
          const adjacents = getAdjacent4(grid, x, y)
          if (adjacents.find(o => o.char === 'O')) {
            grid[y][x] = 'O'
            isChanged = true
          }
        }
      }
    }
  }

  // printGrid(grid)

  return hashCount + grid.reduce((acc, row) => acc + row.filter(c => c === '.').length, 0)
}

function printGrid(grid) {
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

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start