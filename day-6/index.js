const { timeFunction, getInput } = require('../common')

function partOne(numbers) {
  const timesRegex = numbers[0].split(' ').map(o => parseInt(o)).filter(o => !isNaN(o))
  const distances = numbers[1].split(' ').map(o => parseInt(o)).filter(o => !isNaN(o))

  let total = 1

  for (let i = 0; i < timesRegex.length; i++) {
    const time = timesRegex[i]
    const distance = distances[i]

    const ways = waysToBeatRecord(time, distance)
    total *= ways
  }

  return total
}

function waysToBeatRecord(time, distance) {
  let ways = 0
  //console.log(`Time: ${time}, Distance: ${distance}`)
  for (let i = 0; i < time; i++) {
    const travelTime = time - i
    const distanceTravelled = travelTime * i

    // console.log(`Holding for ${i} seconds, travelled ${distanceTravelled}`)
    if (distanceTravelled > distance) {
      ways++
    }
  }

  return ways
}

function partTwo(numbers) {
  const timesRegex = parseInt(numbers[0].substring(9).replace(/ /g, ''))
  const distances = parseInt(numbers[1].substring(9).replace(/ /g, ''))

  return waysToBeatRecord(timesRegex, distances)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

start()
module.exports = start