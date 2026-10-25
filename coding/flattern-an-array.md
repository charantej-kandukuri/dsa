# [Flatten an Array](https://www.greatfrontend.com/questions/javascript/flatten?language=js&tab=coding)


## Problem
```text
Input = const inputArr = [1, 6, [2, [3, 7, [4, [5]]]]];
Output = [1, 6, 2, 3, 7, 4, 5]
```

## Recusive function
```JavaScript
const inputArr = [1, 6, [2, [3, 7, [4, [5]]]]];
const output = [];

function flatten(arr) {
  for(let i = 0; i <= arr.length - 1; i++) {
    const item = arr[i]
    if(Array.isArray(item)) {
      flatten(item)
    } else {
      output.push(item)
    }
  }
}

flatten(inputArr);
console.log(output)
```

## Using FlatMap
```Javascript
function flatten(value) {
  return value.flatMap((item) =>
    Array.isArray(item) ? flatten(item) : item,
  );
}

// Some more examples on flatMap for reference
const sentences = ["Hello world", "JavaScript is fun"];

// Using map() results in nested arrays:
const mapped = sentences.map(str => str.split(" "));
// Output: [["Hello", "world"], ["JavaScript", "is", "fun"]]

// Using flatMap() flattens the result by one level:
const flatMapped = sentences.flatMap(str => str.split(" "));
// Output: ["Hello", "world", "JavaScript", "is", "fun"]

```

## Using Reduce
```JavaScript
export default function flatten(value) {
  return value.reduce((acc, curr) => acc = acc.concat(Array.isArray(curr) ? flatten(curr) : curr), [])
}
```