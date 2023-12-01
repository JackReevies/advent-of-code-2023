const { timeFunction, getInput } = require('../common')

function partOne(input) {
  const obj = input.map(line => line.split('').filter(char => !isNaN(Number(char))))
  const obj2 = obj.map(arr => { return [arr[0], arr[arr.length - 1] || arr[0]] })
  const obj3 = obj2.map(arr => Number(`${arr[0]}${arr[1]}`))
  const sum = obj3.reduce((acc, curr) => acc + curr, 0)

  return sum
}

function replacer(str) {
  const nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

  const original = str
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (!isNaN(Number(char))) continue

    const foundNumber = nums.findIndex(o => str.substring(i, i + o.length) === o)
    if (foundNumber > -1) {
      str = str.substring(0, i) + foundNumber + str.substring(i + nums[foundNumber].length - 1)
      i -= nums[foundNumber].length
    }
  }

  const onlyNums = str.split('').filter(char => !isNaN(Number(char)))
  const firstLast = [onlyNums[0], onlyNums[onlyNums.length - 1] || onlyNums[0]]
  const number = Number(firstLast.join(''))

  //console.log(`${original} -> ${str} -> ${onlyNums.join('')} -> ${firstLast.join('')} -> ${number}`)
  return number
}

function partTwo(input) {
  return input.reduce((acc, obj) => acc + replacer(obj), 0)
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

start()

module.exports = start