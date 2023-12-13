## Advent of Code 2023

![](https://img.shields.io/badge/Language-JS-778528?style=for-the-badge) &nbsp; &nbsp; ![](https://img.shields.io/badge/📅%20Day%20-13-118499?style=for-the-badge) &nbsp; &nbsp;  ![](https://img.shields.io/badge/⭐%20Stars%20-25-b5792a?style=for-the-badge)

My solutions to the [advent of code 2023](https://adventofcode.com/2023/)

## Results

Day | Task 1 | ᴍs | Task 2 | ᴍs | Total Execution Time (ᴍs)
-|-|-|-|-|-
1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56465&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.593&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|55902&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5.548&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6.141&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2617&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.35&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|59795&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.305&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.656&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|535351&nbsp;&nbsp;&nbsp;&nbsp;|2.195&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|87287096&nbsp;&nbsp;|0.545&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.74&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25183&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.475&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5667240&nbsp;&nbsp;&nbsp;|1.528&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3.003&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|324724204&nbsp;|0.982&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|104070862&nbsp;|96167.116&nbsp;|96168.6&nbsp;&nbsp;&nbsp;
6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1195150&nbsp;&nbsp;&nbsp;|0.03&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|42550411&nbsp;&nbsp;|68.771&nbsp;&nbsp;&nbsp;&nbsp;|68.801&nbsp;&nbsp;&nbsp;&nbsp;
7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|248559379&nbsp;|8.41&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|249631254&nbsp;|13.358&nbsp;&nbsp;&nbsp;&nbsp;|21.768&nbsp;&nbsp;&nbsp;&nbsp;
8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|21389&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|90.894&nbsp;&nbsp;&nbsp;&nbsp;|21083806112641|219051.172|219142.814
9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2098530125|1.363&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1016&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.225&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.587&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6867&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5538.593&nbsp;&nbsp;|595&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|334022.995|339562.128
11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|9550717&nbsp;&nbsp;&nbsp;|4.033&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|648458253817|3.361&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7.395&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7173&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|4919.167&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.137&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|4919.757&nbsp;&nbsp;
13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|29846&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25401&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.759&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.059&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

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