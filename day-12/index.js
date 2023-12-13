const { writeFileSync } = require('fs')
const { timeFunction, getInput } = require('../common')

function thing(line) {
  const row = line.split(' ')[0].split('')
  const groups = line.split(' ')[1].split(',').map(o => parseInt(o))

  const indexesOfUnknown = row.reduce((acc, cur, i) => {
    if (cur === '?') {
      acc.push(i)
    }
    return acc
  }, [])

  // Start with all unknows as working springs
  indexesOfUnknown.forEach(i => row[i] = '.')

  // Get every possible row combination with unknowns being either broken or working
  const possibleRows = []
  for (let i = 0; i < Math.pow(2, indexesOfUnknown.length); i++) {
    const binary = i.toString(2).padStart(indexesOfUnknown.length, '0')
    const row = binary.split('').map(o => o === '0' ? '.' : '#')
    possibleRows.push(row)
  }

  const foundRows = []
  for (const possibleRow of possibleRows) {
    for (let i = 0; i < possibleRow.length; i++) {
      const cur = possibleRow[i]
      const indexToReplace = indexesOfUnknown[i]
      row[indexToReplace] = cur
    }

    if (doesMatch(row, groups)) {
      //console.log(row, groups)
      foundRows.push(row)
    }
  }

  //console.log(foundRows.length)
  return foundRows
}

function thing2(line, instances = 1, num = 0, total = 0) {
  // Copy the row 4 times each with ? preceeding it
  // Copy the groups 4 times

  const row = Array(instances).fill(line.split(' ')[0]).join('?').split('')
  const groups = Array(instances).fill(line.split(' ')[1]).join().split(',').map(o => parseInt(o))

  const indexesOfUnknown = row.reduce((acc, cur, i) => {
    if (cur === '?') {
      acc.push(i)
    }
    return acc
  }, [])

  // Start with all unknows as working springs
  indexesOfUnknown.forEach(i => row[i] = '.')

  // Get every possible row combination with unknowns being either broken or working
  const possibleRows = []
  const foundRows = []
  let possibleRowsCount = 0
  for (let i = 0; i < Math.pow(2, indexesOfUnknown.length); i++) {
    try {
      const binary = i.toString(2).padStart(indexesOfUnknown.length, '0')
      const possibleRow = binary.split('').map(o => o === '0' ? '.' : '#')

      for (let i = 0; i < possibleRow.length; i++) {
        const cur = possibleRow[i]
        const indexToReplace = indexesOfUnknown[i]
        row[indexToReplace] = cur
      }

      if (doesMatch(row, groups)) {
        ////console.log(row, groups)
        foundRows.push(row)
        if (foundRows.length % 8 === 0) {
          //console.log(`Currently ${foundRows.length} found rows for ${line} (out of ${possibleRowsCount} possible rows) (${num} / ${total})`)
        }
      }

      //possibleRows.push(row)
      possibleRowsCount++
    } catch (e) {
      console.error(`Tapped out at ${possibleRows.length} possible rows for ${line}`)
    }
  }

  ////console.log(`Computed ${possibleRows.length} possible rows for ${line}`)


  for (const possibleRow of possibleRows) {

  }

  ////console.log(foundRows.length)
  //console.log(`${instances}x Computed ${possibleRowsCount} possible gives ${foundRows.length} for ${line} (${num} / ${total})`)
  return { foundRows: foundRows.length, possibleRowsCount }
}

function getActualGroups(row) {
  // Find blocks of broken springs (#)
  let actualGroups = []
  let curBrokenCount = 0
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '#') {
      curBrokenCount++
      continue
    }

    if (row[i] === '.' && curBrokenCount > 0) {
      actualGroups.push(curBrokenCount)
      curBrokenCount = 0
    }
  }

  if (curBrokenCount > 0) {
    actualGroups.push(curBrokenCount)
  }

  return actualGroups
}

function doesMatch(row, groups) {
  // Find blocks of broken springs (#)
  let actualGroups = getActualGroups(row)

  if (actualGroups.length !== groups.length) {
    return false
  }

  for (let i = 0; i < groups.length; i++) {
    if (actualGroups[i] !== groups[i]) {
      return false
    }
  }

  return true
}

function partOne(numbers) {
  return numbers.reduce((acc, cur) => acc + thing2(cur, 1).foundRows, 0)
}

function partTwo(numbers, part = 'NaN') {
  return 0
  // We want to run the simulation with just 1 instance first, then 2.
  // Using the difference between the found matches, we can work out the equation for 5 instances
  const singleInstances = numbers.map(o => thing2(o, 1))
  const twoInstances = numbers.map((o, i) => thing2(o, 2, i, numbers.length))

  const ans = twoInstances.map((o, i) => {
    const line = numbers[i]
    const single = singleInstances[i]
    const double = twoInstances[i]
    const pow = double.foundRows / single.foundRows

    return { line, single: `Computed ${single.possibleRowsCount} possible gives ${single.foundRows}`, double: `Computed ${double.possibleRowsCount} possible gives ${double.foundRows}`, equation: `${single.foundRows} * (${pow} ^ 4)`, ans: single.foundRows * (Math.pow(pow, 4)) }
  })

  writeFileSync(`${__dirname}/split-${part}-ans.json`, JSON.stringify({ workings: ans, sum: ans.reduce((acc, cur) => acc + cur.ans, 0) }, null, 2))
}

function splitter(numbers) {
  // Sort numbers by the number of ? in the row
  numbers.sort((a, b) => {
    const aCount = a.split(' ')[0].split('').filter(o => o === '?').length
    const bCount = b.split(' ')[0].split('').filter(o => o === '?').length

    if (aCount < bCount) {
      return -1
    }

    if (aCount > bCount) {
      return 1
    }

    return 0
  })

  const split = []
  let curArr = []

  for (let i = 0; i < numbers.length; i++) {
    const cur = numbers[i]
    curArr.push(cur)

    if (curArr.length === 10) {
      split.push(curArr)
      curArr = []
    }
  }

  split.push(curArr)

  for (let x = 0; x < split.length; x++) {
    writeFileSync(`${__dirname}/split-${x + 1}.txt`, split[x].join('\n'))
  }

}

function startChild(count = 1) {
  const numbers = getInput(`${__dirname}/split-${count}.txt`)
  const task1 = partTwo(numbers, count)
}

function partTest(numbers) {
  let sum1 = 0
  let sum2 = 0
  let sum3 = 0
  let sum4 = 0
  let sum5 = 0

  for (const row of numbers) {
    sum1 += thing2(row, 1)
    sum2 += thing2(row, 2)
    sum3 += thing2(row, 3)
    sum4 += thing2(row, 4)
    sum5 += thing2(row, 5)
  }

  //console.log(sum1, sum2, sum3, sum4, sum5)
}

async function startChildren(startFrom = 0) {
  const { spawn } = require('child_process');

  for (let x = 1; x <= 10; x++) {
    const child = spawn('start', ['cmd', '/c', 'node', `${__dirname}/index`, x + startFrom], { shell: true });
  }
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

// //console.log(process.argv)

// if (process.argv[2] === 'parent') {
//   const numbers = getInput(`${__dirname}/input.txt`)
//   // return splitter(numbers)
//   //return startChildren(0)
//   return partTest(numbers)
// } else if (process.argv[2]) {
//   return startChild(process.argv[2])
// }

module.exports = start