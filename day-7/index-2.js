const { timeFunction, getInput } = require('../common')

const Jis = 1

function scoreHand(hand) {
  // ie 32T3K
  const originalHand = hand
  // Turn T, J, Q, K, A into 10, 11, 12, 13, 14
  hand = hand.split('').map(o => {
    if (o === 'T') return 10
    if (o === 'J') return 1
    if (o === 'Q') return 12
    if (o === 'K') return 13
    if (o === 'A') return 14
    return parseInt(o)
  })

  const isFiveOfAKind = hand.filter(o => o === Jis).length >= 4 || isFiveOfKind(hand)
  const isFourOfAKind = hand.filter(o => o === Jis).length >= 3 || isFourOfKind(hand)
  const isAFullHouse = isFourOfAKind || isFullHouse(hand)
  const isAThreeOfAKind = hand.filter(o => o === Jis).length >= 2 || isAFullHouse || isThreeOfKind(hand)
  const isATwoPair = isAThreeOfAKind || isTwoPair(hand)
  const isAOnePair = hand.filter(o => o === Jis).length >= 1 || isATwoPair || isOnePair(hand)
  const highestCard = Math.max(...hand)

  const binScore = `${isFiveOfAKind ? '1' : '0'}${isFourOfAKind ? '1' : '0'}${isAFullHouse ? '1' : '0'}${isAThreeOfAKind ? '1' : '0'}${isATwoPair ? '1' : '0'}${isAOnePair ? '1' : '0'}`
  const scoreStr = `${parseInt(binScore, 2)}.${hand.map(o => o.toString().padStart(2, '0')).join('')}`

  return { hand: originalHand, score: Number(scoreStr), isFiveOfAKind, isFourOfAKind, isAFullHouse, isAThreeOfAKind, isATwoPair, isAOnePair, highestCard }
}

function isFiveOfKind(hand) {
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const modHand = hand.map(o => o === Jis ? card : o)
    const matches = modHand.filter(o => o === card)
    if (matches.length === 5) {
      return true
    }
  }
  return false
}

function isFourOfKind(hand) {
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const modHand = hand.map(o => o === Jis ? card : o)
    const matches = modHand.filter(o => o === card)
    if (matches.length >= 4) {
      return true
    }
  }
  return false
}

function isFullHouse(hand) {
  const pairs = []

  let a = 0
  let exclude = 0
  let excludeJ = false
  for (let i = 5; i > 0; i--) {
    const card = hand[i]
    const modHand = hand.map(o => o === Jis ? card : o)
    const matches = modHand.filter(o => o === card)
    if (matches.length >= 3) {
      pairs.push({ card, length: matches.length })
      a = i
      exclude = card
      excludeJ = hand.filter(o => o === card).length < i
      break
    }
  }

  for (let i = 5; i > 0; i--) {
    const card = hand[i]
    if (card === exclude || (excludeJ && card === Jis)) continue
    const matches = hand.filter(o => o === card)
    if (matches.length >= 2) {
      pairs.push({ card, length: matches.length })
      break
    }
  }

  return pairs.filter(o => o.length >= 3).length >= 1 && pairs.filter(o => o.length >= 2).length >= 2
}

function isThreeOfKind(hand) {
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const modHand = hand.map(o => o === Jis ? card : o)
    const matches = modHand.filter(o => o === card)
    if (matches.length >= 3) {
      return true
    }
  }
  return false
}

function isTwoPair(hand) {
  const pairs = []

  if (isOnePair(hand, false) && hand.includes(Jis)) return true

  let exclude = 0
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const modHand = hand.map(o => o === Jis ? card : o)
    const matches = modHand.filter(o => o === card)
    if (matches.length >= 2) {
      pairs.push(card)
      exclude = card
      break
    }
  }

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    if (card === exclude) continue
    const matches = hand.filter(o => o === card)
    if (matches.length >= 2) {
      pairs.push(card)
      break
    }
  }

  return pairs.length >= 2
}

function isOnePair(hand, considerJokers = true) {
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const modHand = hand.map(o => o === Jis ? card : o)
    const matches = (considerJokers ? modHand : hand).filter(o => o === card)
    if (matches.length === 2) {
      return true
    }
  }
  return false
}

function start(numbers) {
  const hands = []
  for (let i = 0; i < numbers.length; i++) {
    const hand = numbers[i].split(' ')
    const score = scoreHand(hand[0])
    const bid = parseInt(numbers[i].split(' ')[1])
    score.bid = bid
    hands.push(score)

  }

  hands.sort((a, b) => b.score - a.score).reverse()
  //console.log()
  //hands.map(o => o.hand.includes('J') ? console.log(JSON.stringify(o)) : null)

  let sum = 0
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i]


    hand.winAmount = (i + 1) * hand.bid
    sum += hand.winAmount
  }

  return sum
}

module.exports = start