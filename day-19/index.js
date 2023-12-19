const { timeFunction, getInput } = require('../common')

function interpretInput(input) {
  let isOnWorkflows = true
  const workflows = {} // Record<name, {name, rules: Record<name, {name, }>} >
  const metals = []

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      isOnWorkflows = false
      continue
    }

    if (isOnWorkflows) {
      const [workflowName, rule] = line.split('{')

      //const regex = /(.)(.)(\d+):(.+))/g.exec(rule)
      const matches = rule.matchAll(/(.)(.)(\d+):([^,]+)/g)

      for (const match of matches) {
        const [_, part, sign, amount, targetWorkflowName] = match

        if (!workflows[workflowName]) {
          workflows[workflowName] = {
            name: workflowName,
            rules: []
          }
        }

        const rule = {
          name: targetWorkflowName,
          part,
          sign,
          amount: parseInt(amount)
        }

        workflows[workflowName].rules.push(rule)

      }

      const elseRegex = /,([^:]+)\}$/g.exec(line)

      workflows[workflowName].else = elseRegex[1]

    } else {
      const regex = /x=(\d+),m=(\d+),a=(\d+),s=(\d+)/g.exec(line)
      const [_, x, m, a, s] = regex

      const metal = {
        currentWorkflow: 'in',
        x: parseInt(x),
        m: parseInt(m),
        a: parseInt(a),
        s: parseInt(s)
      }

      metal.total = metal.x + metal.m + metal.a + metal.s

      metals.push(metal)
    }
  }

  return { workflows, metals }
}

function partOne(numbers) {
  const { workflows, metals } = interpretInput(numbers)

  // // All metals start in the 'in' workflow
  // metals.forEach(metal => workflows['in'].queue.push(metal))

  let changed = true
  while (changed) {
    changed = false
    for (let i = 0; i < metals.length; i++) {
      const metal = metals[i]

      if (metal.currentWorkflow.length === 1) continue

      const workflow = workflows[metal.currentWorkflow]

      let hasMoved = false

      for (let r = 0; r < workflow.rules.length; r++) {
        const rule = workflow.rules[r]

        if (rule.sign === '<' && metal[rule.part] < rule.amount) {
          metal.currentWorkflow = rule.name
          hasMoved = true
          break
        } else if (rule.sign === '>' && metal[rule.part] > rule.amount) {
          metal.currentWorkflow = rule.name
          hasMoved = true
          break
        }
      }

      if (!hasMoved) {
        metal.currentWorkflow = workflow.else
      }

      changed = true
      // console.log(``)
    }
  }

  const scoreA = metals.filter(o => o.currentWorkflow === 'A').reduce((acc, curr) => acc + curr.total, 0)
  const scoreR = metals.filter(o => o.currentWorkflow === 'R').reduce((acc, curr) => acc + curr.total, 0)

  return scoreA
}

function partTwo(numbers) {
  const { workflows } = interpretInput(numbers)
  // console.log(`Start workflows: ${Object.keys(workflows).length}`)

  const possibilitiesPerVariable = 4000;
  const numberOfVariables = 4;
  const totalCombinations = Math.pow(possibilitiesPerVariable, numberOfVariables);

  reduceDeadWorkflows(workflows)
  // console.log(`End workflows: ${Object.keys(workflows).length}`)

  const pathsToA = []
  flow(workflows, 'in', [], [], pathsToA)

  let sum = 0
  for (const path of pathsToA) {
    const valids = calcCombinationsForValidPath(path.constraint)
    const combos = valids.reduce((acc, curr) => acc * curr, 1)
    sum+= combos
    // console.log(`Path: ${path.path.join(' -> ')}\nConstraint: ${path.constraint.join(' && ')}\nValid: ${valids.join(', ')}\nCombos: ${combos}`)
  }

  // console.log(`Total combinations: ${sum} ?`)
  return sum
  /*

  px{a<2006:qkq,m>2090:A,rfg}
  pv{a>1716:R,A}
  lnx{m>1548:A,A}
  rfg{s<537:gd,x>2440:R,A}
  qs{s>3448:A,lnx}
  qkq{x<1416:A,crn}
  crn{x>2662:A,R}
  in{s<1351:px,qqz}
  qqz{s>2770:qs,m<1801:hdj,R}
  gd{a>3333:R,R}
  hdj{m>838:A,pv}

  Considering 'in' and 'px' as a path to get to A
  metals need to have an s < 1351, a > 2005, m > 2090 and x > 0
  s = 1-1350, a = 2006-4000, m = 2090-4000, x = 1-4000
  s = 1350, a = 1995, m = 1911, x = 4000

  Find how many combination of metals there are that fit this criteria

  const limits = [1350, 1995, 1911, 4000];
  const totalCombinations = limits.reduce((total, limit) => total * limit, 1); 

  for 20,587,203,000,000 combinations

  'in' took us to 'px' which took us to 'A', but it can also take us to 'qkq' and 'rfg'

  'qkq' also gets us to 'A' by requiring s < 1351, a < 2006, m > 0 and x < 1416
  s = 1-1350, a = 1-2005, m = 1-4000, x = 1-1415
  s = 1350, a = 2005, m = 4000, x = 1415

  for 15320205000000 combinations

  We can't add these together though because we've already covered a lot of ground with the first one
  oh but we can....

  */

}

function calcCombinationsForValidPath(constraints) {
  const parts = ['x', 'm', 'a', 's']
  const valids = [4000, 4000, 4000, 4000]

  for (let i = 0; i < parts.length; i++) {
    const constraintsOnPart = constraints.filter(o => o.includes(parts[i])).join(' && ').replace(/[a-z]/g, 'x')

    if (constraintsOnPart.length === 0) continue

    valids[i] = calcForPart(constraintsOnPart)
  }

  return valids
}

function calcForPart(constaintOnPart) {
  let valid = 4000

  for (let x = 1; x < 4001; x++) {
    const res = eval(constaintOnPart.replace(/x/g, x.toString()))
    valid -= res ? 0 : 1
  }

  return valid
}

function flow(workflows, currentWorkflowName = 'in', currentPath = [], currentConstraint = [], pathsToA = []) {
  const workflow = workflows[currentWorkflowName]

  currentPath.push(currentWorkflowName)

  if (currentWorkflowName === 'A') {
    // console.log(`Found path: ${currentPath.join(' -> ')}`)
    // console.log(`Constraint: ${currentConstraint.join(' && ')}`)
    pathsToA.push({ path: currentPath, constraint: currentConstraint })
    return
  }

  if (currentWorkflowName === 'R') {
    currentPath.pop()
    currentConstraint.pop()
    return // Backtrack
  }

  const opts = [...workflow.rules]

  for (let i = 0; i < opts.length; i++) {
    const rule = opts[i]

    // For the first rule we just want to take it verbatim
    // but for subsequent rules we need to negate all those that came before it (because theyre else ifs)

    const newConstraint = [...currentConstraint]

    if (i > 0) {
      for (let x = i - 1; x >= 0; x--) {
        const prevRule = opts[x]
        const oppositeSign = prevRule.sign === '<' ? '>' : '<'
        const modifier = prevRule.sign === '<' ? -1 : 1
        newConstraint.push(`${prevRule.part}${oppositeSign}${prevRule.amount + modifier}`)
      }
    }

    newConstraint.push(`${rule.part}${rule.sign}${rule.amount}`)
    flow(workflows, rule.name, [...currentPath], newConstraint, pathsToA)
  }

  // Consider the else
  // Negate ALL rules

  const newConstraint = [...currentConstraint]

  for (let x = workflow.rules.length - 1; x >= 0; x--) {
    const prevRule = opts[x]
    const oppositeSign = prevRule.sign === '<' ? '>' : '<'
    const modifier = prevRule.sign === '<' ? -1 : 1
    newConstraint.push(`${prevRule.part}${oppositeSign}${prevRule.amount + modifier}`)
  }

  flow(workflows, workflow.else, [...currentPath], newConstraint, pathsToA)
}

function calc(workflows, currentPath = []) {
  // Get the constraint so far

  for (let i = 0; i < currentPath.length; i++) {
    const workflow = workflows[currentPath[i]]

  }
}

function reduceDeadWorkflows(workflows) {
  let changes = true
  while (changes) {
    changes = false
    for (const workflow of Object.values(workflows)) {
      if (!workflow.rules.some(o => o.name !== workflow.else)) {
        // Basically no requirement - all routes lead to the same place
        // So we can find every workflow that references this one and replace it with the else
        // Then delete this workflow
        for (const otherWorkflow of Object.values(workflows)) {
          for (const rule of otherWorkflow.rules) {
            if (rule.name === workflow.name) {
              rule.name = workflow.else
              // console.log(`Replacing ${rule.name} to ${workflow.else}`)
              changes = true
            }
          }
          if (otherWorkflow.else === workflow.name) {
            otherWorkflow.else = workflow.else
            // console.log(`Replacing ${otherWorkflow.else} to ${workflow.else}`)
            changes = true
          }
        }
        delete workflows[workflow.name]
      }
    }
  }
}

async function start() {
  const numbers = getInput(`${__dirname}/input.txt`)

  const task1 = await timeFunction(() => partOne(numbers))
  const task2 = await timeFunction(() => partTwo(numbers))
  return [{ ans: task1.result, ms: task1.ms }, { ans: task2.result, ms: task2.ms }]
}

module.exports = start