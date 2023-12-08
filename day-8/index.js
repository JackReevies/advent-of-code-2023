const { timeFunction, getInput } = require('../common')

function partOne(numbers) {
  const positions = numbers[0].split('').map(o => o === 'L' ? 1 : 2)
  const paths = numbers.slice(2).map(o => /([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/g.exec(o).slice(1))

  const indexAAA = paths.findIndex(o => o[0] === 'AAA')
  let current = paths[indexAAA]

  let stepsTaken = 0
  let posIndex = 0
  while (true) {
    let opt = positions[posIndex]

    let picked = current[opt]

    current = paths.find(o => o[0] === picked)
    stepsTaken++

    if (current[0] === 'ZZZ') {
      break
    }

    posIndex++
    if (posIndex === positions.length) {
      posIndex = 0
    }
  }

  return stepsTaken
}

function partTwoOld(numbers) {
  const positions = numbers[0].split('').map(o => o === 'L' ? 1 : 2)
  const paths = numbers.slice(2).map(o => /([A-Z0-9]+) = \(([A-Z0-9]+), ([A-Z0-9]+)\)/g.exec(o).slice(1))


  let currents = paths.filter(o => o[0].endsWith('A'))
  const goalLength = currents.length

  let debugHighest = 0


  let stepsTaken = 0
  let posIndex = 0

  while (true) {
    let opt = positions[posIndex]

    let picked = currents.map(o => o[opt])
    currents = picked.map(o => paths.find(p => p[0] === o))

    stepsTaken++

    let endsWithZ = currents.filter(o => o[0].endsWith('Z'))
    if (endsWithZ.length > debugHighest) {
      debugHighest = endsWithZ.length
      console.log(`Hit new highest at ${debugHighest} with ${stepsTaken} steps`)
    }

    if (endsWithZ.length === goalLength) {
      break
    }

    posIndex++
    if (posIndex === positions.length) {
      posIndex = 0
    }
  }

  return stepsTaken
}

function findZ(positions, paths, current) {
  let stepsTaken = 0
  let posIndex = 0
  while (true) {
    let opt = positions[posIndex]

    let picked = current[opt]

    current = paths.find(o => o[0] === picked)
    stepsTaken++

    if (current[0].endsWith('Z')) {
      break
    }

    posIndex++
    if (posIndex === positions.length) {
      posIndex = 0
    }
  }

  return stepsTaken
}

function partTwo(numbers) {
  const positions = numbers[0].split('').map(o => o === 'L' ? 1 : 2)
  const paths = numbers.slice(2).map(o => /([A-Z0-9]+) = \(([A-Z0-9]+), ([A-Z0-9]+)\)/g.exec(o).slice(1))


  let currents = paths.filter(o => o[0].endsWith('A'))

  const map = {}
  for (let i = 0; i < currents.length; i++) {
    map[currents[i][0]] = findZ(positions, paths, currents[i])
  }

  const max = Math.max(...Object.values(map))

  // Answer must be a multiple of the max
  let ans = max
  while (true) {
    if (Object.values(map).every(o => ans % o === 0)) {
      break
    }
    ans += max
  }

  return ans
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start