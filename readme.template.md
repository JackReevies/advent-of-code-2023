## Advent of Code 2023

![](https://img.shields.io/badge/Language-JS-778528?style=for-the-badge) &nbsp; &nbsp; ![](https://img.shields.io/badge/📅%20Day%20-%DAY%-118499?style=for-the-badge) &nbsp; &nbsp;  ![](https://img.shields.io/badge/⭐%20Stars%20-%STARS%-b5792a?style=for-the-badge)

My solutions to the [advent of code 2023](https://adventofcode.com/2023/)

## Results

Day | Task 1 | ᴍs | Task 2 | ᴍs | Total Execution Time (ᴍs)
-|-|-|-|-|-
%ROWS%

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