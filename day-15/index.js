const { timeFunction, getInput } = require('../common')

function hash(string) {
  const chars = string.split('').map((char) => char.charCodeAt(0))

  let cur = 0

  for (const char of chars) {
    cur += char
    cur *= 17
    cur = cur % 256
  }

  return cur
}

function partOne(list) {
  const ans = list.reduce((acc, cur) => acc + hash(cur), 0)
  //console.log(ans)
  return ans
}

function partTwo(list) {
  const ans = list.map(obj => {
    const label = /[a-z]+/.exec(obj)?.[0]
    return {
      input: obj,
      focalLength: /\d/.exec(obj)?.[0],
      hash: hash(obj),
      box: hash(label),
      label
    }
  }, 0)
  //console.log(ans)

  const boxes = Array(256).fill([]).map(() => [])

  for (const instruction of ans) {
    const { label, box, hash, input, focalLength } = instruction

    const lensObj = { label, focalLength, str: `[${label} ${focalLength}]` }

    if (input.includes('=')) {
      // Either add or replace a lens in the box

      const existingIndex = boxes[box].findIndex(o => o.label === label)
      if (existingIndex > -1) {
        // Replace
        boxes[box][existingIndex] = lensObj
      } else {
        // Add
        boxes[box].push(lensObj)
      }

    } else if (input.includes('-')) {
      // Remove a lens from a box
      boxes[box] = boxes[box].filter((lens) => lens.label !== label)
    } else {
      throw new Error(`Unknown instruction type ${input}`)
    }

    // Print state
    // console.log(`After "${input}":`)
    // boxes.forEach((box, index) => {
    //   if (box.length === 0) return
    //   console.log(`Box ${index}: ${box.map(o => o.str).join(' ')}`)
    // })
    // console.log('')
  }


  let sum = 0
  boxes.forEach((box, index) => {
    box.forEach((lens, lensIndex) => {
      const boxMultiplier = 1 + index
      const lensMultiplier = 1 + lensIndex
      const power = boxMultiplier * lensMultiplier * lens.focalLength
      lens.boxMultiplier = boxMultiplier
      lens.lensMultiplier = lensMultiplier
      lens.power = power
      sum += power
    })
  })

  return sum
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)
  const list = numbers.join('\n').split(',')

  const task1 = await timeFunction(() => partOne(list))
  const task2 = await timeFunction(() => partTwo(list))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start