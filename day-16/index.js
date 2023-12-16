const { timeFunction, getInput } = require('../common')

function progressBeams(beams, grid, energized = {}) {
  let beamsToProgressThisFrame = beams.length
  for (let i = 0; i < beamsToProgressThisFrame; i++) {
    const [y, x, direction] = beams[i]

    let nextPos = [y, x]

    switch (direction) {
      case 'up':
        nextPos = [y - 1, x]
        break
      case 'right':
        nextPos = [y, x + 1]
        break
      case 'down':
        nextPos = [y + 1, x]
        break
      case 'left':
        nextPos = [y, x - 1]
        break
    }

    const nextChar = grid[nextPos[0]]?.[nextPos[1]]

    // If we've already enegerised the cell, check which direction we came from
    // if we already energertised the cell in the same direction we can will the beam
    const alreadyEnergized = energized[nextPos.join(',')]
    if (alreadyEnergized) {
      if (alreadyEnergized.includes(direction)) {
        beams.splice(i, 1)
        beamsToProgressThisFrame--
        i--
        continue
      }
    }

    if (nextChar) {
      if (!energized[nextPos.join(',')]) {
        energized[nextPos.join(',')] = []
      }
      energized[nextPos.join(',')].push(direction)
    } else {
      beams.splice(i, 1)
      beamsToProgressThisFrame--
      i--
      continue
    }

    if (nextChar === '.') {
      beams[i] = [nextPos[0], nextPos[1], direction]
    }

    if (nextChar === '|') {
      if (direction === 'right' || direction === 'left') {
        // Split the beam up and down
        beams.push([nextPos[0], nextPos[1], 'up'])
        beams[i] = [nextPos[0], nextPos[1], 'down']
      }

      if (direction === 'up' || direction === 'down') {
        // Pass through like an empty square
        beams[i] = [nextPos[0], nextPos[1], direction]
      }
    }

    if (nextChar === '-') {
      if (direction === 'up' || direction === 'down') {
        // Split the beam left and right
        beams.push([nextPos[0], nextPos[1], 'left'])
        beams[i] = [nextPos[0], nextPos[1], 'right']
      }

      if (direction === 'right' || direction === 'left') {
        // Pass through like an empty square
        beams[i] = [nextPos[0], nextPos[1], direction]
      }

    }

    if (nextChar === '/') {
      if (direction === 'up') {
        beams[i] = [nextPos[0], nextPos[1], 'right']
      }
      if (direction === 'right') {
        beams[i] = [nextPos[0], nextPos[1], 'up']
      }
      if (direction === 'down') {
        beams[i] = [nextPos[0], nextPos[1], 'left']
      }
      if (direction === 'left') {
        beams[i] = [nextPos[0], nextPos[1], 'down']
      }
    }

    if (nextChar === '\\') {
      if (direction === 'up') {
        beams[i] = [nextPos[0], nextPos[1], 'left']
      }
      if (direction === 'right') {
        beams[i] = [nextPos[0], nextPos[1], 'down']
      }
      if (direction === 'down') {
        beams[i] = [nextPos[0], nextPos[1], 'right']
      }
      if (direction === 'left') {
        beams[i] = [nextPos[0], nextPos[1], 'up']
      }
    }
  }
}

function getArrow(direction) {
  if (direction === 'up') return '^'
  if (direction === 'right') return '>'
  if (direction === 'down') return 'v'
  if (direction === 'left') return '<'
}

function partOne(grid, startY, startX, startDirection) {
  const beams = [[startY, startX, startDirection]] // [y,x, direction]
  const energizedCells = { [`${startY},${startX}`]: [startDirection] } // [y,x
  const iterations = []
  while (beams.length > 0) {
    progressBeams(beams, grid, energizedCells)
    iterations.push(Object.keys(energizedCells).length)

    if (iterations.length > 10 && iterations.slice(iterations.length - 10, iterations.length).every(o => o === iterations[iterations.length - 1])) {
      break
    }

  }

  // // Print out grid state
  // const gridCopy = grid.map(o => [...o])

  // beams.forEach(([y, x, direction]) => gridCopy[y][x] = getArrow(direction))
  // Object.keys(energizedCells).forEach(o => {
  //   const [y, x] = o.split(',').map(o => parseInt(o))
  //   gridCopy[y][x] = 'O'
  // })
  // gridCopy.forEach(o => console.log(o.join('')))
  // console.log('<----------------------->')

  return Object.keys(energizedCells).length
}

function partTwo(grid) {
  let potentials = [] // {x,y, direction, score}

  // Any on the top row
  for (let x = 0; x < grid[0].length; x++) {
    const ans = partOne(grid, 0, x, 'down')
    potentials.push({ x, y: 0, direction: 'down', score: ans })
  }

  // Any on the bottom row
  for (let x = 0; x < grid[grid.length - 1].length; x++) {
    const ans = partOne(grid, grid.length - 1, x, 'up')
    potentials.push({ x, y: grid.length - 1, direction: 'up', score: ans })
  }

  // Any on the left side
  for (let y = 0; y < grid.length; y++) {
    const ans = partOne(grid, y, 0, 'right')
    potentials.push({ x: 0, y, direction: 'right', score: ans })
  }

  // Any on the right side
  for (let y = 0; y < grid.length; y++) {
    const ans = partOne(grid, y, grid[y].length - 1, 'left')
    potentials.push({ x: grid[y].length - 1, y, direction: 'left', score: ans })
  }

  return Math.max(...potentials.map(o => o.score))
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)
  const grid = numbers.map(o => o.split(''))

  const task1 = await timeFunction(() => partOne(grid, 0, 0, 'right'))
  const task2 = await timeFunction(() => partTwo(grid))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start