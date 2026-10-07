# Find Index

Find the **index of a given number** in an array using **Binary Search**.

```JavaScript
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// indexOf 5 is 4
// indexOf 7 is 6
```

### Solution:

``` JavaScript
function findIndex(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let middle;

  while (left <= right) {

    middle = Math.floor((left + right) / 2); // <-- ** very imp first add then devide

    if (arr[middle] === toFind) {
      return middle;
    }

    if (arr[middle] > toFind) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }

  }
}

// Driver code
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const result = findIndexOfGivenNumber(arr, 5);
console.log({ result });

```
