## Advent of Code 2023

![](https://img.shields.io/badge/Language-JS-778528?style=for-the-badge) &nbsp; &nbsp; ![](https://img.shields.io/badge/📅%20Day%20-21-118499?style=for-the-badge) &nbsp; &nbsp;  ![](https://img.shields.io/badge/⭐%20Stars%20-38-b5792a?style=for-the-badge)

My solutions to the [advent of code 2023](https://adventofcode.com/2023/)

## Results

Day | Task 1 | ᴍs | Task 2 | ᴍs | Total Execution Time (ᴍs)
-|-|-|-|-|-
1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56465&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.534&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|55902&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5.001&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5.535&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2617&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.294&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|59795&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.248&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.542&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|535351&nbsp;&nbsp;&nbsp;&nbsp;|1.962&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|87287096&nbsp;&nbsp;|0.348&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.31&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25183&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.223&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|5667240&nbsp;&nbsp;&nbsp;|1.261&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.484&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|324724204&nbsp;|0.908&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|104070862&nbsp;|81013.363&nbsp;|81014.704&nbsp;
6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1195150&nbsp;&nbsp;&nbsp;|0.017&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|42550411&nbsp;&nbsp;|44.144&nbsp;&nbsp;&nbsp;&nbsp;|44.162&nbsp;&nbsp;&nbsp;&nbsp;
7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|248559379&nbsp;|4.938&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|249631254&nbsp;|7.643&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|12.581&nbsp;&nbsp;&nbsp;&nbsp;
8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|21389&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56.578&nbsp;&nbsp;&nbsp;&nbsp;|21083806112641|187427.929|187484.859
9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2098530125|1.068&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1016&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.95&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.017&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6867&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2199.595&nbsp;&nbsp;|595&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|276687.885|278887.919
11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|9550717&nbsp;&nbsp;&nbsp;|3.763&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|648458253817|3.236&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6.999&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7173&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|4337.034&nbsp;&nbsp;|❌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|4337.034&nbsp;&nbsp;
13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|29846&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.262&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|25401&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.648&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.91&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108144&nbsp;&nbsp;&nbsp;&nbsp;|1.719&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|108404&nbsp;&nbsp;&nbsp;&nbsp;|628.327&nbsp;&nbsp;&nbsp;|630.045&nbsp;&nbsp;&nbsp;
15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|508498&nbsp;&nbsp;&nbsp;&nbsp;|0.582&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|279116&nbsp;&nbsp;&nbsp;&nbsp;|2.384&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.967&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
16&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7046&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|275.595&nbsp;&nbsp;&nbsp;|7313&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|63377.75&nbsp;&nbsp;|63653.765&nbsp;
17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|❌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|❌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
18&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|56678&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1242.349&nbsp;&nbsp;|79088855654037|406.834&nbsp;&nbsp;&nbsp;|1649.481&nbsp;&nbsp;
19&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|362930&nbsp;&nbsp;&nbsp;&nbsp;|3.148&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|116365820987729|48593.081&nbsp;|48596.67&nbsp;&nbsp;
20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|670984704&nbsp;|11.504&nbsp;&nbsp;&nbsp;&nbsp;|❌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|11.504&nbsp;&nbsp;&nbsp;&nbsp;
21&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3574&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|269.225&nbsp;&nbsp;&nbsp;|-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.002&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|269.227&nbsp;&nbsp;&nbsp;

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