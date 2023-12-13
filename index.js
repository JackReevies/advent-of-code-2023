const fs = require('fs')
const { sep } = require('path')
const { timeFunction } = require('./common')
const { convert } = require('./html2md')

const fns = []
// Add the answers to each day as an array of two values (ie, for 3 days, [[p1,p2], [p1,p2], [p1,p2]])
const answers = [[56465, 55902], [2617, 59795], [535351, 87287096], [25183, 5667240], [324724204, 104070862], [1195150, 42550411], [248559379, 249631254], [21389, 21083806112641], [2098530125, 1016], [6867, 595], [9550717, 648458253817], [7173, -1], [29846, 25401]]
const excludeDays = []
const runOnce = [5, 8, 10, 12]

function discoverDays() {
  for (let i = 1; i < 26; i++) {
    if (fs.existsSync(`./day-${i}/index.js`)) {
      fns.push(require(`./day-${i}/index.js`))
    }
  }
}

async function run(fn) {
  const times = []
  let ans = []
  for (let i = 0; i < 100; i++) {
    const result = await fn()
    times.push(result.map(o => o.ms))
    if (i == 0) {
      ans = result.map(o => o.ans)
    }
  }
  // Return avg of both
  const avg = [0, 1].map(_ => times.reduce((acc, curr) => acc + curr[_], 0) / times.length)
  const min = [0, 1].map(_ => Math.min(...times.map(o => o[_])))
  const max = [0, 1].map(_ => Math.max(...times.map(o => o[_])))
  return { result: [{ ans: ans[0], ms: avg[0] }, { ans: ans[1], ms: avg[1] }], ms: avg[0] + avg[1], min, max }
}

async function benchmark() {
  discoverDays()

  /** @type [{day, oneResult, oneTime, twoResult, twoTime, totalTime}] */
  const rows = []
  let maxDay = 0
  let stars = 0

  for (let i = 0; i < fns.length; i++) {
    if (excludeDays.includes(i + 1)) continue
    const fn = fns[i]
    const expected = answers[i]
    const actual = runOnce.includes(i + 1) ? await timeFunction(fn) : await run(fn)

    const dayBlurb = `Day ${i + 1} (${Math.round(actual.ms * 100) / 100} ms)`

    console.log(''.padStart(dayBlurb.length, '='))
    console.log(dayBlurb)
    console.log(''.padStart(dayBlurb.length, '-'))

    expected.forEach((val, i) => {
      const actualResult = actual.result[i]
      if (val === actualResult.ans) {
        console.log(`Task ${i + 1} is Correct (${val}) (took ${actualResult.ms}ms)`)
        stars++
      } else {
        console.error(`Task ${i + 1} is Wrong (expected ${val} but got ${actualResult.ans}) (took ${actualResult.ms}ms)`)
      }
    })
    console.log('\n'.padStart(dayBlurb.length, '='))
    maxDay = i + 1
    rows.push({
      day: (i + 1).toString().padEnd(8, ' '),
      oneResult: actual.result[0].ans.toString().padEnd(10, ' '),
      oneTime: (Math.round(actual.result[0].ms * 1000) / 1000).toString().padEnd(10, ' '),
      twoResult: actual.result[1].ans.toString().padEnd(10, ' '),
      twoTime: (Math.round(actual.result[1].ms * 1000) / 1000).toString().padEnd(10, ' '),
      totalTime: (Math.round(actual.ms * 1000) / 1000).toString().padEnd(10, ' ')
    })
  }

  const tableBody = rows.map(o => Object.values(o).map(o => o.toString().replace(/ /g, '&nbsp;')).join('|')).join(`\n`)

  const template = fs.readFileSync('readme.template.md').toString()
  fs.writeFileSync('readme.md', template
    .replace('%ROWS%', tableBody)
    .replace('%DAY%', maxDay)
    .replace('%STARS%', stars)
    .replace('%BADGE_POS%', '') //`https://img.shields.io/badge/🏆%20Position%20-${maxDay}-69aa22?style=for-the-badge`)
  )
}

async function setupDay(day) {
  const dotEnv = fs.readFileSync('.env').toString().split(/\r\n|\n/).reduce((acc, o) => {
    const regex = /^([a-zA-Z0-9-]+)=(.+?)$/.exec(o).slice(1)
    acc[regex[0]] = regex[1]
    return acc
  }, {})

  console.log(`Setting up project for day ${day}`)
  const dayDir = `day-${day}`

  const input = await fetch(`https://adventofcode.com/2023/day/${day}/input`, { headers: { 'Cookie': `session=${dotEnv.session}` } })
  const text = await input.text()

  if (text.includes("Please don't repeatedly request this endpoint before it unlocks!")) {
    throw new Error(`Looks like this day is not available yet`)
  }

  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir)
  }

  if (!fs.existsSync(`${dayDir}${sep}readme.md`)) {
    const desc = await fetch(`https://adventofcode.com/2023/day/${day}`, { headers: { 'Cookie': `session=${dotEnv.session}` } })
    const descText = await desc.text()
    const markdown = convert(descText)

    fs.writeFileSync(`${dayDir}${sep}readme.md`, markdown)
  }

  if (!fs.existsSync(`${dayDir}${sep}index.js`)) {
    fs.copyFileSync(`day-x/index.js`, `${dayDir}${sep}index.js`)
  }

  if (!fs.existsSync(`day-${day}${sep}input.txt`)) {
    fs.writeFileSync(`day-${day}${sep}input.txt`, text.endsWith("\n") ? text.substring(0, text.length - 1) : text)
  }

  console.log(`Finished setup for day ${day}`)
}

async function start() {
  if (process.argv[2]?.toLowerCase() === 'download') {
    return await setupDay(process.argv[3])
  }

  benchmark()
}

start()
