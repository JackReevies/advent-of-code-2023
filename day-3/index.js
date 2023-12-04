const { timeFunction, getInput } = require('../common')

function partOne(numbers) {
  // Pad grid
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = '.' + numbers[i] + '.'
  }

  const maxX = numbers[0].length
  const maxY = numbers.length

  let results = []
  let numBuilder = ''
  let sum = 0

  for (let y = 0; y < maxY; y++) {
    const line = numbers[y]
    for (let x = 1; x < maxX; x++) {
      const char = line[x]
      if (char.match(/[0-9]/g)) {
        numBuilder += char
        continue
      }

      if (numBuilder.length === 0) continue

      const num = parseInt(numBuilder)

      numBuilder = ''

      const result = surroundedByASymbol(numbers, num, x - 1, y)
      if (result?.symbol) {
        results.push(result)
        //console.log(`${num} at ${x}, ${y} has a symbol near it`)
        sum += num
        continue
      }

      //console.log(`NO SYMBOL NEXT TO ${num} AT ${x}, ${y} (${JSON.stringify(result.adjacents)})`)
    }
  }

  return { sum, results }
}

function surroundedByASymbol(grid, number, numX, numY) {
  const numStr = number.toString()
  const length = numStr.length

  const adjacents = []
  const minY = Math.max(0, numY - 1)
  const maxY = Math.min(numY + 1, grid.length - 1)

  const minX = Math.max(0, numX - length)
  const maxX = Math.min(numX + 2, grid[0].length)

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const char = grid[y][x]
      adjacents.push({ char, coord: `${x}, ${y}` })
      if (isSymbol(char)) {
        return { symbol: true, num: number, adjacents }
      }
    }
  }
}

function isSymbol(char) {
  return char?.match(/[^0-9.]/g)
}

function partTwo(results) {
  const gears = {}

  for (const result of results) {
    const gear = result.adjacents.find(o => o.char === '*')
    if (gear) {
      // Number has a gear next to it
      if (!gears[gear.coord]) {
        gears[gear.coord] = []
      }
      gears[gear.coord].push(result.num)
    }
  }


  const gearsWithTwoNumbers = Object.values(gears).filter(o => o.length === 2)
  const ratios = gearsWithTwoNumbers.map(o => o[0] * o[1])
  return ratios.reduce((acc, obj) => acc + obj, 0)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(task1.result.results))
  return [{ ans: task1.result.sum, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start