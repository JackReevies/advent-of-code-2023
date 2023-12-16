## Advent of Code 2023

![](https://img.shields.io/badge/Language-JS-778528?style=for-the-badge) &nbsp; &nbsp; ![](https://img.shields.io/badge/📅%20Day%20-16-118499?style=for-the-badge) &nbsp; &nbsp;  ![](https://img.shields.io/badge/⭐%20Stars%20-30-b5792a?style=for-the-badge)

My solutions to the [advent of code 2023](https://adventofcode.com/2023/)

## Results

Day | Task 1 | ᴍs | Task 2 | ᴍs | Total Execution Time (ᴍs)
-|-|-|-|-|-
1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56465&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.639&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|55902&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5.838&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6.476&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2617&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.363&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|59795&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.312&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.675&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|535351&nbsp;&nbsp;&nbsp;&nbsp;|2.164&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|87287096&nbsp;&nbsp;|0.555&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.719&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25183&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.565&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5667240&nbsp;&nbsp;&nbsp;|1.592&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3.157&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|324724204&nbsp;|1.414&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|104070862&nbsp;|97564.655&nbsp;|97566.645&nbsp;
6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1195150&nbsp;&nbsp;&nbsp;|0.022&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|42550411&nbsp;&nbsp;|54.552&nbsp;&nbsp;&nbsp;&nbsp;|54.574&nbsp;&nbsp;&nbsp;&nbsp;
7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|248559379&nbsp;|5.769&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|249631254&nbsp;|9.108&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|14.877&nbsp;&nbsp;&nbsp;&nbsp;
8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|21389&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|64.377&nbsp;&nbsp;&nbsp;&nbsp;|21083806112641|217559.71&nbsp;|217624.607
9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2098530125|1.381&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1016&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.244&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.624&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6867&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|12762.313&nbsp;|595&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|335794.821|348557.699
11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|9550717&nbsp;&nbsp;&nbsp;|12.531&nbsp;&nbsp;&nbsp;&nbsp;|648458253817|11.102&nbsp;&nbsp;&nbsp;&nbsp;|23.632&nbsp;&nbsp;&nbsp;&nbsp;
12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|16384&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|624421.714|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.143&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|624422.328
13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|29846&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.226&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25401&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.502&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.727&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108144&nbsp;&nbsp;&nbsp;&nbsp;|2.147&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108404&nbsp;&nbsp;&nbsp;&nbsp;|739.845&nbsp;&nbsp;&nbsp;|741.993&nbsp;&nbsp;&nbsp;
15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|508498&nbsp;&nbsp;&nbsp;&nbsp;|0.705&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|279116&nbsp;&nbsp;&nbsp;&nbsp;|3.088&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3.792&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
16&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7046&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|341.867&nbsp;&nbsp;&nbsp;|7313&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|75740.525&nbsp;|76082.949&nbsp;

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