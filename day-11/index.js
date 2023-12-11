const { writeFileSync } = require('fs')
const { timeFunction, getInput } = require('../common')

function calcDistancesP1(grid, insertions) {
  // Find columns and rows without any #s
  for (let y = 0; y < grid.length; y++) {
    if (!rowHasGalaxy(grid[y])) {

      for (let i = 0; i < insertions; i++) {
        grid.splice(y, 0, Array(grid[0].length).fill('.'))
        y++
      }
    }
  }

  for (let x = 0; x < grid[0].length; x++) {
    if (!columnHasGalaxy(grid, x)) {

      for (let i = 0; i < insertions; i++) {
        grid.forEach(row => row.splice(x, 0, '.'))
        x++
      }
    }
  }

  // Get locations of #
  const galaxyLocations = []
  grid.forEach((row, y) => {
    row.forEach((column, x) => {
      if (column === '#') {
        galaxyLocations.push({ x, y })
      }
    })
  })

    // Find the shortest path between each pair of #s
    const galaxyPaths = []
    for (let i = 0; i < galaxyLocations.length; i++) {
      for (let j = i + 1; j < galaxyLocations.length; j++) {
        const dist = findShortestPath(grid, galaxyLocations[i], galaxyLocations[j])
        galaxyPaths.push({ from: galaxyLocations[i], to: galaxyLocations[j], dist })
      }
    }
  
    const sum = galaxyPaths.reduce((acc, path) => acc + path.dist, 0)
  
    return { sum, galaxyPaths, galaxyLocations }
}

function calcDistances(grid, insertions) {
  // Get locations of #
  const galaxyLocations = []
  grid.forEach((row, y) => {
    row.forEach((column, x) => {
      if (column === '#') {
        galaxyLocations.push({ x, y, driftX: 0, driftY: 0 })
      }
    })
  })

  // Find columns and rows without any #s
  for (let y = 0; y < grid.length; y++) {
    if (!rowHasGalaxy(grid[y])) {

      const galaxiesPushed = galaxyLocations.filter(galaxy => galaxy.y > y)
      galaxiesPushed.forEach(galaxy => galaxy.driftY += insertions)
    }
  }

  for (let x = 0; x < grid[0].length; x++) {
    if (!columnHasGalaxy(grid, x)) {

      const galaxiesPushed = galaxyLocations.filter(galaxy => galaxy.x > x)
      galaxiesPushed.forEach(galaxy => galaxy.driftX += insertions)
    }
  }

  // Resolve the drifts
  galaxyLocations.forEach(galaxy => {
    galaxy.x += galaxy.driftX
    galaxy.y += galaxy.driftY
  })

  // Find the shortest path between each pair of #s
  const galaxyPaths = []
  for (let i = 0; i < galaxyLocations.length; i++) {
    for (let j = i + 1; j < galaxyLocations.length; j++) {
      const dist = findShortestPath(grid, galaxyLocations[i], galaxyLocations[j])
      galaxyPaths.push({ from: galaxyLocations[i], to: galaxyLocations[j], dist })
    }
  }

  const sum = galaxyPaths.reduce((acc, path) => acc + path.dist, 0)

  return { sum, galaxyPaths, galaxyLocations }
}

const coord = ({ x, y }) => `[${x}, ${y}]`

function partOne(grid) {
  const newGrid = grid
  const result = calcDistances(newGrid, 1)

  return result.sum
}

function findShortestPath(grid, start, end) {
  // Only moving in 4 directions
  const xDiff = Math.abs(start.x - end.x)
  const yDiff = Math.abs(start.y - end.y)

  return xDiff + yDiff
}

function rowHasGalaxy(row) {
  return row.includes('#')
}

function columnHasGalaxy(grid, column) {
  return grid.some(row => row[column] === '#')
}

function partTwo(grid) {
  const result = calcDistances(grid, 999_999)
  return result.sum
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)
  const grid = numbers.map(row => row.split(''))

  const task1 = await timeFunction(() => partOne(grid))
  const task2 = await timeFunction(() => partTwo(grid))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start