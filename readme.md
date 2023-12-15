## Advent of Code 2023

![](https://img.shields.io/badge/Language-JS-778528?style=for-the-badge) &nbsp; &nbsp; ![](https://img.shields.io/badge/📅%20Day%20-15-118499?style=for-the-badge) &nbsp; &nbsp;  ![](https://img.shields.io/badge/⭐%20Stars%20-29-b5792a?style=for-the-badge)

My solutions to the [advent of code 2023](https://adventofcode.com/2023/)

## Results

Day | Task 1 | ᴍs | Task 2 | ᴍs | Total Execution Time (ᴍs)
-|-|-|-|-|-
1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56465&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.591&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|55902&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5.697&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6.288&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2617&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.378&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|59795&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.318&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.696&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|535351&nbsp;&nbsp;&nbsp;&nbsp;|2.155&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|87287096&nbsp;&nbsp;|0.571&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.726&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25183&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.481&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5667240&nbsp;&nbsp;&nbsp;|1.541&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3.022&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|324724204&nbsp;|1.202&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|104070862&nbsp;|98373.341&nbsp;|98381.379&nbsp;
6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1195150&nbsp;&nbsp;&nbsp;|0.021&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|42550411&nbsp;&nbsp;|55.568&nbsp;&nbsp;&nbsp;&nbsp;|55.589&nbsp;&nbsp;&nbsp;&nbsp;
7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|248559379&nbsp;|5.781&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|249631254&nbsp;|9.007&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|14.788&nbsp;&nbsp;&nbsp;&nbsp;
8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|21389&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|62.407&nbsp;&nbsp;&nbsp;&nbsp;|21083806112641|214889.68&nbsp;|214953.071
9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2098530125|1.258&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1016&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.242&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6867&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|11036.181&nbsp;|595&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|328243.348|339281.249
11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|9550717&nbsp;&nbsp;&nbsp;|3.627&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|648458253817|3.954&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7.581&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7173&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5078.669&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.124&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5079.301&nbsp;&nbsp;
13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|29846&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.29&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25401&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.679&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.968&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108144&nbsp;&nbsp;&nbsp;&nbsp;|2.301&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108404&nbsp;&nbsp;&nbsp;&nbsp;|736.247&nbsp;&nbsp;&nbsp;|738.548&nbsp;&nbsp;&nbsp;
15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|508498&nbsp;&nbsp;&nbsp;&nbsp;|0.669&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|279116&nbsp;&nbsp;&nbsp;&nbsp;|2.806&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3.475&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

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