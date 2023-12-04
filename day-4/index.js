const { timeFunction, getInput } = require('../common')

function getScore(input) {
  const regex = /Card\s+(\d+): ([\d ]+) \| ([\d ]+)/g.exec(input)
  const [_, index, winners, numbers] = regex

  const splitWinners = winners.split(/ /g).map(o => parseInt(o)).filter(o => !Number.isNaN(o))
  const splitNumbers = numbers.split(/ /g).map(o => parseInt(o)).filter(o => !Number.isNaN(o))

  // How many winning numbers do we have?

  const winningNumbers = splitNumbers.filter(o => splitWinners.includes(o))
  const score = winningNumbers.reduce((acc, num) => acc === 0 ? 1 : acc * 2, 0)
  //console.log(`Game ${index} has a score of ${score} (${winningNumbers.join(', ')} winning numbers)`)
  return { index: Number(index), score, winningNumbers }
}

function partOne(input) {
  return input.reduce((acc, o) => acc + getScore(o).score, 0)
}

function partTwo(numbers) {
  const cardScores = {} // Record of index -> count of cards
  for (const card of numbers) {
    const { index, score, winningNumbers } = getScore(card)

    if (!cardScores[index]) {
      cardScores[index] = 0
    }
    cardScores[index]++
    // Figure out duplicating cards
    for (let i = 1; i < winningNumbers.length + 1; i++) {

      if (!cardScores[index + i]) {
        cardScores[index + i] = 0
      }
      cardScores[index + i] += cardScores[index]
    }
  }

  //console.log(cardScores)
  return Object.values(cardScores).reduce((acc, o) => acc + o, 0)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start