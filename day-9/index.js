const { timeFunction, getInput } = require('../common')

function findHistory(line) {
  const numbers = line.split(' ').map(o => parseInt(o))
  const grid = [numbers]

  let lvl = 0

  while (true) {
    if (grid[lvl].every(o => o === 0)) {
      break
    }

    for (let i = 1; i < grid[lvl].length; i++) {
      const prev = grid[lvl][i - 1]
      const current = grid[lvl][i]

      if (!grid[lvl + 1]) {
        grid[lvl + 1] = []
      }

      grid[lvl + 1].push(current - prev)
    }

    lvl++
  }

  // Now calc the next history value for each line

  grid[grid.length - 1].push(0)

  for (let i = grid.length - 2; i >= 0; i--) {
    const row = grid[i]
    const last = row[row.length - 1]

    const value = last + grid[i + 1][grid[i + 1].length - 1]
    grid[i].push(value)
  }

  return grid[0][grid[0].length - 1]
}

function findHistoryBackwards(line) {
  const numbers = line.split(' ').map(o => parseInt(o))
  const grid = [[0, ...numbers]]

  let lvl = 0

  while (true) {
    if (grid[lvl].every(o => o === 0)) {
      break
    }

    for (let i = 2; i < grid[lvl].length; i++) {
      const prev = grid[lvl][i - 1]
      const current = grid[lvl][i]

      if (!grid[lvl + 1]) {
        grid[lvl + 1] = [0]
      }

      grid[lvl + 1].push(current - prev)
    }

    lvl++
  }

  // Now calc the next history value for each line

  //grid[grid.length - 1].push(0)

  for (let i = grid.length - 2; i >= 0; i--) {
    const row = grid[i]
    //const last = row[row.length - 1]
    const firstReal = row[1] // Not zero because we padded at the start

    //const value = last + grid[i + 1][grid[i + 1].length - 1]
    const firstValue = firstReal - grid[i + 1][0]
    //grid[i].push(value)
    grid[i][0] = firstValue
  }

  return grid[0][0]
}

function partOne(numbers) {
 return  numbers.reduce((acc, o) => acc + findHistory(o), 0)
}

function partTwo(numbers) {
  return  numbers.reduce((acc, o) => acc + findHistoryBackwards(o), 0)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start