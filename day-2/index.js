const { timeFunction, getInput } = require('../common')

function isPossible(line) {
  const regex = /Game (\d+): (.+)/g.exec(line)
  const [_, index, data] = regex

  const balls = data.split(/,|;/g)
  const splitBalls = balls.map(o => /(\d+) (.+)/g.exec(o))

  let isValid = true
  for (const ball of splitBalls) {
    const [_, count, color] = ball
    if (color === 'blue' && count > 14) {
      isValid = false
    } else if (color === 'red' && count > 12) {
      isValid = false
    } else if (color === 'green' && count > 13) {
      isValid = false
    }
  }

  if (isValid) {
    // console.log(`Game ${index} with ${data} is possible`)
    return Number(index)
  }

  return 0
}

function getPower(line) {
  const regex = /Game (\d+): (.+)/g.exec(line)
  const [_, index, data] = regex

  const balls = data.split(/,|;/g)
  const splitBalls = balls.map(o => /(\d+) (.+)/g.exec(o))

  const maxBalls = [] // RGB
  let maxRed = 0
  let maxGreen = 0
  let maxBlue = 0

  for (const ball of splitBalls) {
    const count = Number(ball[1])
    const color = ball[2]
    if (color === 'blue' && count > maxBlue) {
      maxBlue = count
    } else if (color === 'red' && count > maxRed) {
      maxRed = count
    } else if (color === 'green' && count > maxGreen) {
      maxGreen = count
    }
  }

  return maxRed * maxGreen * maxBlue
}

function partOne(numbers) {
  return numbers.reduce((acc, line) => acc + isPossible(line), 0)
}

function partTwo(numbers) {
  return numbers.reduce((acc, line) => acc + getPower(line), 0)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start