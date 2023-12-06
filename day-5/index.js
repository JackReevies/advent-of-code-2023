const { timeFunction, getInput } = require('../common')

function buildData(input, p2 = false) {
  const data = { seeds: [] }

  if (p2) {
    const obj = input[0].substring(7).matchAll(/(\d+ \d+)/g)
    for (const match of obj) {
      const [start, length] = match[0].split(' ')
      data.seeds.push([parseInt(start), parseInt(length)])
    }
  } else {
    data.seeds = input[0].substring(7).split(' ').map(o => parseInt(o))
  }

  const headers = ['seed-to-soil map:', 'soil-to-fertilizer map:', 'fertilizer-to-water map:', 'water-to-light map:', 'light-to-temperature map:', 'temperature-to-humidity map:', 'humidity-to-location map:']
  let section = undefined
  for (let i = 2; i < input.length; i++) {

    if (headers.includes(input[i])) {
      section = input[i].substring(0, input[i].indexOf(' '))
      continue
    }

    if (input[i] === '') continue

    const regex = /(\d+) (\d+) (\d+)/g.exec(input[i])
    const [_, startDestination, startSource, length] = regex

    if (!data[section]) {
      data[section] = []
    }

    data[section].push({ startDestination: parseInt(startDestination), startSource: parseInt(startSource), length: parseInt(length) })

    // for (let i = 0; i < lengthInt; i++) {
    //   data[section][startSourceInt + i] = startDestinationInt + i
    // }
  }

  return data
}

function partOne(numbers) {
  const data = buildData(numbers)
  const flow = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location']
  let lowest = Number.MAX_SAFE_INTEGER
  for (const seed of data.seeds) {
    let target = seed
    for (const section of flow) {
      //target = data[section][target] || target
      target = getMapDestinationThing(target, data[section])
      //console.log(`${seed} -> ${target} (${section})`)
    }
    if (target < lowest) lowest = target
    //console.log(`${seed} -> ${target}`)
  }

  return lowest
}

function getMapDestinationThing(source, arr) {
  for (const item of arr) {
    if (source >= item.startSource && source < item.startSource + item.length) {
      return item.startDestination + (source - item.startSource)
    }
  }

  return source
}

function partTwo(numbers) {
  const data = buildData(numbers, true)
  const flow = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location']
  let lowest = Number.MAX_SAFE_INTEGER
  let c = 0

  const totalStart = Date.now()
  for (const seedRange of data.seeds) {
    c++
    const start = Date.now()
    for (let i = seedRange[0]; i < seedRange[0] + seedRange[1]; i++) {
      let target = i
      for (const section of flow) {
        //target = data[section][target] || target
        target = getMapDestinationThing(target, data[section])
        //console.log(`${seedRange} -> ${target} (${section})`)
      }
      if (target < lowest) lowest = target
      //console.log(`${seedRange} -> ${target}`)

    }
    //console.log(`Completed ${c} of ${data.seeds.length} (lowest so far is ${lowest}) in ${Math.floor((Date.now() - start) / 1000)}s (total time: ${Math.floor((Date.now() - totalStart) / 1000)}s)`)

    // if (c === 2) return lowest
  }

  //console.log(`lowest is ${lowest}`)
  return lowest
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start