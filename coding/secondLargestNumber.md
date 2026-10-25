# Second Largest Number

```JavaScript
const arr = [4, 200, 200, 20, 100];

function secondLargest(arr) {
    let largest = -1, secondLargest = -1;

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];

        if(element > largest) {
            lergest = element;
            secondLargest = lergest
        } 
        else if (element < largest && element > secondLargest) {
            secondLargest = element;
        }
    }

    return secondLargest;
}

const r = secondLargest(arr);
console.log(r);
```