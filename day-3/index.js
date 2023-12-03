const { timeFunction, getInput } = require('../common')

function partOne(numbers) {
  // Pad grid
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = '.' + numbers[i] + '.'
  }

  const maxX = numbers[0].length
  const maxY = numbers.length

  let numBuilder = ''
  let sum = 0

  for (let y = 0; y < maxY; y++) {
    const line = numbers[y]
    for (let x = 0; x < maxX; x++) {
      const char = line[x]
      if (!Number.isNaN(parseInt(char))) {
        numBuilder += char
        continue
      }

      if (numBuilder.length === 0) continue

      const num = parseInt(numBuilder)

      if (Number.isNaN(num)) {
        throw new Error(`Shits fucked`)
      }

      numBuilder = ''

      const result = surroundedByASymbol(numbers, num, x - 1, y)
      if (result.symbol) {
        //console.log(`${num} at ${x}, ${y} has a symbol near it`)
        sum += num
        continue
      }

      //console.log(`NO SYMBOL NEXT TO ${num} AT ${x}, ${y} (${JSON.stringify(result.adjacents)})`)
    }
  }

  return sum
}

function surroundedByASymbol(grid, number, endX, endY) {
  const numStr = number.toString()
  const length = numStr.length

  const adjacents = []
  let symbol = false
  for (let y = endY - 1; y <= endY + 1; y++) {
    //if (y < 0 || y === grid.length) continue
    for (let x = endX - length; x <= endX + 1; x++) {
      if (x < 0) continue
      const char = grid[y]?.[x]
      adjacents.push({ x, y, char, coord: `${x}, ${y}` })
      if (isSymbol(char)) {
        symbol = true
      }
    }
  }

  if (adjacents.length !== (length + 2) * 3) {
    console.log(`Adjacents unexpected length (${adjacents.length})`)
  }
  return { symbol, adjacents }
}

function isSymbol(char) {
  return Number.isNaN(parseInt(char)) && char !== '.' && !!char
}

function partTwo(numbers) {
  // Pad grid
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = '.' + numbers[i] + '.'
  }

  const maxX = numbers[0].length
  const maxY = numbers.length

  let numBuilder = ''
  let sum = 0

  let gears = {} // Record<coord, number[]>

  for (let y = 0; y < maxY; y++) {
    const line = numbers[y]
    for (let x = 0; x < maxX; x++) {
      const char = line[x]
      if (!Number.isNaN(parseInt(char))) {
        numBuilder += char
        continue
      }

      if (numBuilder.length === 0) continue

      const num = parseInt(numBuilder)

      if (Number.isNaN(num)) {
        throw new Error(`Shits fucked`)
      }

      numBuilder = ''

      const result = surroundedByASymbol(numbers, num, x - 1, y)
      if (result.symbol) {
        //console.log(`${num} at ${x}, ${y} has a symbol near it`)
        const gear = result.adjacents.find(o => o.char === '*')
        if (gear) {
          // Number has a gear next to it
          if (!gears[gear.coord]) {
            gears[gear.coord] = []
          }
          gears[gear.coord].push(num)
        }
        continue
      }
    }
  }

  const gearsWithTwoNumbers = Object.values(gears).filter(o => o.length === 2)
  const ratios = gearsWithTwoNumbers.map(o => o[0] * o[1])
  return ratios.reduce((acc, obj) => acc + obj, 0)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start