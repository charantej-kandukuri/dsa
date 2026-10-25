# [String Duplicates Removal](https://www.geeksforgeeks.org/problems/remove-all-duplicates-from-a-given-string4321/1?page=1&category=Map&difficulty=Basic&sortBy=submissions)


Given a string s which may contain lowercase and uppercase characters. The task is to remove all duplicate characters from the string and find the resultant string. The order of remaining characters in the output should be same as in the original string.

## Examples:
```
Input: s = "geEksforGEeks"
Output: "geEksforG"
Explanation: After removing duplicate characters such as E, e, k, s, we have string as "geEksforG".
```

### Solution:
```JavaScript
const input = "geEksforGEeks";

function removeDuplicates(str) {
  const obj = {};
  str.split("").map(item => {
    obj[item] = obj[item] ? obj[item] + 1 : 1
  });
  return Object.keys(obj).join('');
}

const result = removeDuplicates(input);
console.log({ result });

```

