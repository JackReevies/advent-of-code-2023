## Advent of Code 2023

![](https://img.shields.io/badge/Language-JS-778528?style=for-the-badge) &nbsp; &nbsp; ![](https://img.shields.io/badge/📅%20Day%20-19-118499?style=for-the-badge) &nbsp; &nbsp;  ![](https://img.shields.io/badge/⭐%20Stars%20-35-b5792a?style=for-the-badge)

My solutions to the [advent of code 2023](https://adventofcode.com/2023/)

## Results

Day | Task 1 | ᴍs | Task 2 | ᴍs | Total Execution Time (ᴍs)
-|-|-|-|-|-
1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56465&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.516&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|55902&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|4.999&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5.515&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2617&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.302&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|59795&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.253&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.555&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|535351&nbsp;&nbsp;&nbsp;&nbsp;|1.81&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|87287096&nbsp;&nbsp;|0.35&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.16&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25183&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.24&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5667240&nbsp;&nbsp;&nbsp;|1.273&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.513&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|324724204&nbsp;|0.99&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|104070862&nbsp;|81141.937&nbsp;|81143.903&nbsp;
6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1195150&nbsp;&nbsp;&nbsp;|0.018&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|42550411&nbsp;&nbsp;|44.509&nbsp;&nbsp;&nbsp;&nbsp;|44.527&nbsp;&nbsp;&nbsp;&nbsp;
7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|248559379&nbsp;|5.028&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|249631254&nbsp;|7.671&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|12.699&nbsp;&nbsp;&nbsp;&nbsp;
8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|21389&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|54.801&nbsp;&nbsp;&nbsp;&nbsp;|21083806112641|186843.552|186899.337
9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2098530125|1.127&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1016&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.011&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.138&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6867&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2391.191&nbsp;&nbsp;|595&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|273731.193|276123.211
11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|9550717&nbsp;&nbsp;&nbsp;|17.023&nbsp;&nbsp;&nbsp;&nbsp;|648458253817|18.015&nbsp;&nbsp;&nbsp;&nbsp;|35.038&nbsp;&nbsp;&nbsp;&nbsp;
12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7173&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3821.85&nbsp;&nbsp;&nbsp;|❌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3821.85&nbsp;&nbsp;&nbsp;
13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|29846&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.185&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25401&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.447&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.633&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108144&nbsp;&nbsp;&nbsp;&nbsp;|1.698&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108404&nbsp;&nbsp;&nbsp;&nbsp;|616.982&nbsp;&nbsp;&nbsp;|618.68&nbsp;&nbsp;&nbsp;&nbsp;
15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|508498&nbsp;&nbsp;&nbsp;&nbsp;|0.592&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|279116&nbsp;&nbsp;&nbsp;&nbsp;|2.628&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3.22&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
16&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7046&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|284.125&nbsp;&nbsp;&nbsp;|7313&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|62281.415&nbsp;|62566.637&nbsp;
17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|❌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|❌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
18&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56678&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1177.401&nbsp;&nbsp;|79088855654037|402.941&nbsp;&nbsp;&nbsp;|1581.185&nbsp;&nbsp;
19&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|362930&nbsp;&nbsp;&nbsp;&nbsp;|3.165&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|116365820987729|43553.53&nbsp;&nbsp;|43557.119&nbsp;

<br />

## How to Run

Create a `.env` file containing `session=COOKIE` (where `COOKIE` is your AoC cookie). This is used for downloading the puzzle input.

The goal is to not use any external modules, only those built in to the [node runtime](https://nodejs.org/en/) (this means no package.json). Node v12 and above should work for the puzzles (`node index`), but v18 is required for `node index download day` for the newly supported fetch API

`index.js` in the root directory contains a basic test runner to run each day's tasks and compare answers. This file will be updated with new days as they come.

* `node index` to run the benchmark.
* `node index download day` to setup a day's files

### Example

```
node index
```

Returns output in the format of

```
Day X
------
Task A is Correct (ANSWER) (took Zms)
Task B is Wrong (expected EXPECTED but got ACTUAL) (took Zms)
```

## How the Test Runner works

Each day will output an array of objects ([{ms: number, ans: object}]) representing the result of each task within that day.

The test runner knows what the answers *should* be, these are stored in an array of arrays with each array representing the answers for each day.

For example 

```
[[DAY 1 TASK 1 ANSWER, DAY 1 TASK 2 ANSWER], [DAY 2 TASK 1 ANSWER], ...]
```

We iterate through all the days we have loaded and compare their answers. We ouput whether the answer was right or wrong (and what we got if it was wrong). `console.log` is used for correct answers and `console.error` is used for wrong answers to give colour (if using a command line environment that allows for colour)