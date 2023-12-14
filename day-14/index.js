const { timeFunction, getInput } = require('../common')

function tiltForward(grid) {
  for (let y = 1; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const char = grid[y][x]
      if (char !== 'O') continue
      if (y == 0) continue

      // Roll the O up as much as we can, it can only occupy current . spaces

      while (y > 0) {
        if (grid[y - 1][x] === '.') {
          grid[y - 1][x] = 'O'
          grid[y][x] = '.'
          y--
        } else {
          break
        }
      }
    }
  }

}


function p2TiltUp(grid, cache) {
  for (let y = 1; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const char = grid[y][x]
      if (char !== 'O') continue
      if (y == 0) continue

      // Roll the O up as much as we can, it can only occupy current . spaces

      while (y > 0) {
        if (grid[y - 1][x] === '.') {
          grid[y - 1][x] = 'O'
          grid[y][x] = '.'
          y--
        } else {
          break
        }
      }
    }
  }
}

function p2TiltDown(grid, cache) {
  for (let y = grid.length - 2; y >= 0; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      const char = grid[y][x]
      if (char !== 'O') continue

      while (y < grid.length - 1) {
        if (grid[y + 1][x] === '.') {
          grid[y + 1][x] = 'O'
          grid[y][x] = '.'
          y++
        } else {
          break
        }
      }
    }
  }
}

function p2TiltRight(grid, cache) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = grid[y].length - 2; x >= 0; x--) {
      const char = grid[y][x]
      if (char !== 'O') continue

      // Roll the O up as much as we can, it can only occupy current . spaces

      while (x < grid[y].length - 1) {
        if (grid[y][x + 1] === '.') {
          grid[y][x + 1] = 'O'
          grid[y][x] = '.'
          x++
        } else {
          break
        }
      }
    }
  }
}

function p2TiltLeft(grid, cache) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 1; x < grid[y].length; x++) {
      const char = grid[y][x]
      if (char !== 'O') continue

      // Roll the O up as much as we can, it can only occupy current . spaces

      while (x > 0) {
        if (grid[y][x - 1] === '.') {
          grid[y][x - 1] = 'O'
          grid[y][x] = '.'
          x--
        } else {
          break
        }
      }
    }
  }
}

function getBoardState(grid) {
  let boardState = ''
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const char = grid[y][x]
      if (char !== 'O') continue
      boardState += `(${y},${x})`
    }
  }
  return boardState
}

function partOne(grid) {
  tiltForward(grid)
  return getScore(grid)
}

function getScore(grid) {
  let sum = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const char = grid[y][x]
      if (char === 'O') {
        sum += (grid.length - y)
      }
    }
  }

  return sum
}

function partTwo(grid) {
  const cache = {} // Record<boardState, Record<iterations, {i, grid}>>
  const iterations = 1000000000

  const scoresSeen = {}

  const start = Date.now()

  const seenScores = {}

  // Fairly good chance that we won't ever see the initial config again

  // p2TiltUp(grid, cache)
  // p2TiltLeft(grid, cache)
  // p2TiltDown(grid, cache)
  // p2TiltRight(grid, cache)

  let cacheBoardState = ''
  let cacheCount = 0

  const mapCycleToStartBoardState = []

  for (let i = 0; i < iterations; i++) {
    const boardStateBeforeCycle = getBoardState(grid)
    mapCycleToStartBoardState[i] = boardStateBeforeCycle

    if (!cacheBoardState) {
      cacheBoardState = boardStateBeforeCycle
    }

    const cacheHit = cache[boardStateBeforeCycle]
    if (cacheHit) {
      // We've seen this state before
      // We can jump to the state after performing X iterations
      // and incremment i by the X (-1)

      // Whats the biggest jump we can make?
      const cacheHitKeys = Object.keys(cacheHit)
      const biggestJump = cacheHitKeys[cacheHitKeys.length - 1]
      const cacheEntry = cacheHit[biggestJump]

      i += cacheEntry.afterCycle - 1
      if (cacheEntry.grid === JSON.stringify(grid)) {
        console.log(`Found infinite loop at ${i}`)
        // Means we've probably hit a loop and found the answer?

        // This bit is so lazy but after 3.5 hours idc

        for (const key in cacheHit) {
          const item = cacheHit[key]
          item.score = getScore(JSON.parse(item.grid))
        }

        while (i < iterations) {
          i += cacheEntry.afterCycle
        }

        const overshotBy = i - iterations

        const ans = cacheHit[cacheEntry.afterCycle - overshotBy + 1]

        score = getScore(grid)
        return ans.score
      }
      grid = JSON.parse(cacheEntry.grid)
    } else {

      p2TiltUp(grid, cache)
      p2TiltLeft(grid, cache)
      p2TiltDown(grid, cache)
      p2TiltRight(grid, cache)

      const boardStateAfterCycle = getBoardState(grid)

      if (!cache[boardStateBeforeCycle]) {
        cache[boardStateBeforeCycle] = {}
      }

      const stringGrid = JSON.stringify(grid)

      for (let x = 0; x < i; x++) {
        const boardStateBefore = mapCycleToStartBoardState[x]
        const iterations = i - x
        cache[boardStateBefore][iterations] = { afterCycle: iterations, endState: boardStateAfterCycle, grid: stringGrid }
      }
    }
    if (i % 1 === 0) {
      const score = getScore(grid)
      scoresSeen[score] = true
      // console.log(`Done ${i} iterations in ${Date.now() - start}ms (score is ${getScore(grid)}) (${(i / iterations) * 100}%) (seen ${Object.keys(scoresSeen).length} different scores)`)
    }
  }

  return getScore(grid)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)
  const grid = numbers.map(line => line.split(''))
  const task1 = await timeFunction(() => partOne(grid))
  const task2 = await timeFunction(() => partTwo(grid))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start