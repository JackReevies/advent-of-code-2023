const { timeFunction, getInput } = require('../common')

function updateState(module, value, from, counts) {
  if (module.type === 'broadcaster' || module.type === 'output') {
    module.current = value
  }

  if (module.type === '%') {
    if (value === -1) {
      module.current *= -1
    }
  }

  if (module.type === '&') {
    module.memory[from] = value
  }

  if (value === -1) {
    counts.low++
  }

  if (value === 1) {
    counts.high++
  }

  counts.total++
  if (module.name === 'rx' && value === -1) {
    counts.found = true
    process.exit(69)
  }
  //console.log(`${from} -${value === -1 ? 'low' : 'high'}-> ${module.name}`)
}

function partOne(lines) {
  const modules = {}

  for (let i = 0; i < lines.length; i++) {
    let [_, type, name, dests] = /(broadcaster|%|&)([A-Za-z]*) -> (.+)/g.exec(lines[i])
    const desinations = dests.split(', ')
    name ||= type

    if (i === 0) {
      modules['button'] = { type: 'button', name: 'button', desinations: ['broadcaster'], current: -1, memory: {} }
      modules['output'] = { type: 'output', name: 'output', desinations: [], current: -1, memory: {} }
      modules['rx'] = { type: 'output', name: 'output', desinations: [], current: -1, memory: {} }
    }

    modules[name || type] = { type, name: name || type, desinations, current: -1, state: -1, from: null, memory: {} }
  }

  // Find all inputs for each & type module
  for (const key in modules) {
    const module = modules[key]
    if (module.type === '&') {
      const inputs = Object.values(modules).filter(o => o.desinations.includes(module.name))

      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        module.memory[input.name] = -1
      }
    }
  }

  const counts = { low: 0, high: 0, total: 0 }

  const start = Date.now()
  for (let i = 0; i < 1000; i++) {
    const queue = ['button']

    while (queue.length > 0) {
      const current = queue.shift()
      const module = modules[current]

      send(modules, module, queue, counts)
    }

    // if (counts.found) {
    //   console.log(`Found it in ${i + 1} iterations`)
    //   break
    // } else if (i % 10000 === 0) {
    //   console.log(`--------End of iteration ${i + 1}--------`)
    //   const took = Date.now() - start
    //   const perIteration = took / (i + 1)

    //   const estimatedTimeTotal = perIteration * Number.MAX_SAFE_INTEGER
    //   const eta = estimatedTimeTotal - took
    //   const maxIterationsInAnHour = 1000 * 60 * 60 / perIteration
    //   console.log(`Took ${took}ms so far. Estimated time to complete: ${estimatedTimeTotal}ms (${eta / (1000 * 60 * 60 * 24 * 365)} years left) (${maxIterationsInAnHour * 24 * 28} iterations in an hour)`)

    // }
  }



  const ans = counts.low * counts.high
  return ans
}

function send(modules, module, queue, counts) {
  if (module.type === 'button') {
    for (let i = 0; i < module.desinations.length; i++) {
      const destination = modules[module.desinations[i]]
      updateState(destination, module.current, module.name, counts)
    }
  }

  if (module.type === 'broadcaster') {
    for (let i = 0; i < module.desinations.length; i++) {
      const destination = modules[module.desinations[i]]
      updateState(destination, module.current, module.name, counts)
    }
  }

  if (module.type === '%') {
    for (let i = 0; i < module.desinations.length; i++) {
      const destination = modules[module.desinations[i]]
      updateState(destination, module.current, module.name, counts)
      module.nextSend = null
    }
  }

  if (module.type === '&') {
    module.current = Object.values(module.memory).filter(o => o === 1).length === Object.values(module.memory).length ? -1 : 1

    for (let i = 0; i < module.desinations.length; i++) {
      const destination = modules[module.desinations[i]]
      updateState(destination, module.current, module.name, counts)
    }
  }

  for (let i = 0; i < module.desinations.length; i++) {
    const destination = modules[module.desinations[i]]
    if (destination.type === '%' && module.current === 1) continue
    if (destination.type !== 'output') {
      queue.push(destination.name)
    }
  }
}

function partTwo(numbers) {

}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => 0) //partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start