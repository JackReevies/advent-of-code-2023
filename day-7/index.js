const { timeFunction, getInput } = require('../common')

function scoreHand(hand) {
  // ie 32T3K
  const originalHand = hand
  // Turn T, J, Q, K, A into 10, 11, 12, 13, 14
  hand = hand.split('').map(o => {
    if (o === 'T') return 10
    if (o === 'J') return 11
    if (o === 'Q') return 12
    if (o === 'K') return 13
    if (o === 'A') return 14
    return parseInt(o)
  })

  const isFiveOfAKind = hand.every(o => o === hand[0])
  const isFourOfAKind = isFourOfKind(hand)
  const isAFullHouse = isFullHouse(hand)
  const isAThreeOfAKind = isThreeOfKind(hand)
  const isATwoPair = isTwoPair(hand)
  const isAOnePair = isOnePair(hand)
  const highestCard = Math.max(...hand)

  const binScore = `${isFiveOfAKind ? '1' : '0'}${isFourOfAKind ? '1' : '0'}${isAFullHouse ? '1' : '0'}${isAThreeOfAKind ? '1' : '0'}${isATwoPair ? '1' : '0'}${isAOnePair ? '1' : '0'}`
  const scoreStr = `${parseInt(binScore, 2)}.${hand.map(o => o.toString().padStart(2, '0')).join('')}`

  return { hand: originalHand, score: Number(scoreStr), isFiveOfAKind, isFourOfAKind, isAFullHouse, isAThreeOfAKind, isATwoPair, isAOnePair, highestCard }
}

function isFourOfKind(hand) {
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const matches = hand.filter(o => o === card)
    if (matches.length === 4) {
      return true
    }
  }
  return false
}

function isFullHouse(hand) {
  return isThreeOfKind(hand) && isOnePair(hand)
}

function isThreeOfKind(hand) {
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const matches = hand.filter(o => o === card)
    if (matches.length === 3) {
      return true
    }
  }
  return false
}

function isTwoPair(hand) {
  const pairs = []

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const matches = hand.filter(o => o === card)
    if (matches.length === 2) {
      pairs.push(card)
    }
  }

  return pairs.length === 4
}

function isOnePair(hand) {
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const matches = hand.filter(o => o === card)
    if (matches.length === 2) {
      return true
    }
  }
  return false
}

function partOne(numbers) {
  const hands = []
  for (let i = 0; i < numbers.length; i++) {
    const hand = numbers[i].split(' ')
    const score = scoreHand(hand[0])
    const bid = parseInt(numbers[i].split(' ')[1])
    score.bid = bid
    hands.push(score)

  }

  hands.sort((a, b) => b.score - a.score).reverse()
  console.log()
  hands.map(o => console.log(JSON.stringify(o)))

  let sum = 0
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i]


    hand.winAmount = (i + 1) * hand.bid
    sum += hand.winAmount
  }

  return sum
}

function partTwo(numbers) {

}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  console.log(JSON.stringify({ task1, task2 }))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

start()
module.exports = start