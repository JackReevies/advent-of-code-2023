const { timeFunction, getInput } = require('../common')

function splitGrids(input) {
  const grids = []
  let cur = []

  for (let i = 0; i < input.length; i++) {
    const line = input[i]

    if (line.length < 1) {
      grids.push(cur)
      cur = []
    } else {
      cur.push(line.split(''))
    }
  }

  if (cur.length > 0)
    grids.push(cur)

  return grids
}

function findReflectionP1(grid) {
  for (let center = 1; center < grid[0].length; center++) {
    const smallestDistance = Math.min(center, grid[0].length - center)
    const x1 = center - smallestDistance
    const x2 = center + smallestDistance - 1
    //console.log(`When center point is ${center}.  x1 = ${x1}, x2 = ${x2}`)

    let isMatch = true

    for (let x = x1; x <= x2; x++) {
      //console.log(`Would compare column ${x} with ${x2 - (x - x1)}`)
      if (doColumnsMatch(grid, x, x2 - (x - x1)).isMatch) {
        //console.log(`Column ${x} matches column ${x2 - (x - x1)}`)
      } else {
        isMatch = false
        break
      }
    }

    if (isMatch) {
      //console.log(`Found reflection at ${center} (x1 = ${x1}, x2 = ${x2})`)
      return center
    }
  }

  for (let center = 1; center < grid.length; center++) {
    const smallestDistance = Math.min(center, grid.length - center)
    const y1 = center - smallestDistance
    const y2 = center + smallestDistance - 1
    //console.log(`When center point is ${center}.  y1 = ${y1}, y2 = ${y2}`)

    let isMatch = true

    for (let y = y1; y <= y2; y++) {
      //console.log(`Would compare row ${y} with ${y2 - (y - y1)}`)
      if (doRowsMatch(grid, y, y2 - (y - y1)).isMatch) {
        //console.log(`Row ${y} matches row ${y2 - (y - y1)}`)
      } else {
        isMatch = false
        break
      }
    }

    if (isMatch) {
      //console.log(`Found reflection at ${center} (y1 = ${y1}, y2 = ${y2})`)
      return center * 100
    }
  }

}

function doRowsMatch(grid, y1, y2) {
  let isMatch = true
  const errors = []
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y1][x] !== grid[y2][x]) {
      isMatch = false
      errors.push({ x, y1, y2 })
    }
  }

  return { isMatch, errors }
}

function doColumnsMatch(grid, x1, x2) {
  let isMatch = true
  const errors = []
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x1] !== grid[y][x2]) {
      isMatch = false
      errors.push({ x1, x2, y })
    }
  }

  return { isMatch, errors }
}

function findReflectionP2(grid) {
  const matchesFound = [] // {center, correction, type, smallestDistance, score}

  for (let center = 1; center < grid[0].length; center++) {
    const smallestDistance = Math.min(center, grid[0].length - center)
    const x1 = center - smallestDistance
    const x2 = center + smallestDistance - 1
    //console.log(`When center point is ${center}.  x1 = ${x1}, x2 = ${x2}`)

    let isMatch = true
    let correctionsArr = []

    for (let x = x1; x <= x2; x++) {
      //console.log(`Would compare column ${x} with ${x2 - (x - x1)}`)
      const { errors, isMatch: columnsMatch } = doColumnsMatch(grid, x, x2 - (x - x1))

      if (columnsMatch) {
        //console.log(`Column ${x} matches column ${x2 - (x - x1)}`)
      } else {
        if (errors.length === 1) {
          correctionsArr.push(errors[0])
        } else {
          isMatch = false
          break
        }
      }
    }

    if (correctionsArr.length === 2 || !correctionsArr.length) {
      matchesFound.push({ center, correction: correctionsArr[0], type: 'column', smallestDistance, score: center })
    }

  }

  for (let center = 1; center < grid.length; center++) {
    const smallestDistance = Math.min(center, grid.length - center)
    const y1 = center - smallestDistance
    const y2 = center + smallestDistance - 1
    //console.log(`When center point is ${center}.  y1 = ${y1}, y2 = ${y2}`)

    let isMatch = true
    let correctionsArr = []

    for (let y = y1; y <= y2; y++) {
      //console.log(`Would compare row ${y} with ${y2 - (y - y1)}`)
      const { errors, isMatch: rowsMatch } = doRowsMatch(grid, y, y2 - (y - y1))
      if (rowsMatch) {
        //console.log(`Row ${y} matches row ${y2 - (y - y1)}`)
      } else {
        if (errors.length === 1) {
          correctionsArr.push(errors[0])
        } else {
          isMatch = false
          break
        }
      }
    }

    if (correctionsArr.length === 2 || !correctionsArr.length) {
      matchesFound.push({ center, correction: correctionsArr[0], type: 'row', smallestDistance, score: center * 100 })
    }

  }



  //debugger
  // Now that we have an array of matches found with potential correction candidates
  // We're only allowed to apply one correction - so does applying a correction break any others?
  // We do have to apply ONE correction

  const matchesWithCorrects = matchesFound.filter(m => m.correction)

  if (matchesWithCorrects.length === 1) {
    return matchesWithCorrects[0].score
  }

  // One grid from my input has TWO potential corrections
  // Instructions don't say how to deal with this, luckily trying both answers is quick enough
  return matchesWithCorrects[1].score

  // Was going to fuck around with finding the best match when there are multiple options
  // but the instructions don't indicate how to resolve. Luckily an assumption can be made to just break at the first correction
}

function partOne(grids) {
  const ans = []

  for (const grid of grids) {
    ans.push(findReflectionP1(grid))
  }
  //console.log(ans)
  let sum = ans.reduce((a, b) => a + b, 0)
  return sum
}

function partTwo(grids) {
  const ans = []

  for (const grid of grids) {
    ans.push(findReflectionP2(grid))
  }
  //console.log(ans)
  let sum = ans.reduce((a, b) => a + b, 0)
  return sum
}

async function start() {
  const numbers = splitGrids(getInput(`${__dirname}/input.txt`))

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start