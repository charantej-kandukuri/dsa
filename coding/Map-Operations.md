# [Map Operations](https://www.geeksforgeeks.org/problems/map-operations/1?page=1&category=Map&difficulty=Basic&sortBy=submissions)

You are given an array arr. You need to insert the elements of arr into a map(element as key and index as value). Also, you need to erase a given element x from the map and print "erased x" if successfully erased, else print "not found".
Complete print() function to print the map.

## Example :
```
Input: arr[] = [9, 8, 7, 4, 4, 2, 1, 1, 9, 8], x = 1
Output: 
1 7
2 5
4 4
7 2
8 9
9 8
erased 1
2 5
4 4
7 2
8 9
9 8
```

### Solution
```JavaScript
const input = [9, 8, 7, 4, 4, 2, 1, 1, 9, 8], x = 1



function printI(input) {
  const sortedInput = [...input].sort(); // use slice to copy.

  return  sortedInput.reduce((acc, curr) => {
    acc[curr] = input.findLastIndex(item => curr === item)
    return acc;
  }, {})

}

const result = printI(input);
console.log({ result })
```