# Find the square root of a number

## Solution 1 - Absolute Squares (4, 9, 16...)

### example
4 => 2

9 => 3

16 => 4

```Javascript

function squareRoot(num) {

  let left = 0, right = num;
  
  while(left <= right) {

    const mid = Math.floor((left + right) / 2);
    
    if(mid**2 == num) {
      return mid;
    }
    if(mid**2 > num) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return mid;

}

// Driver code
const result = squareRoot(16);
console.log({ result })
```

## Solution 2 - Square of Any Number
To find the square root of any number we take the precession approach.

Here we just continue to do `right - left` until the precession is met.

Once the precision is met the while loop exists, then we can use the right and left values to get the square root of any number by doing 

$$
  ((right+left)/2).toFixed(2)
$$

```Javascript

function findSquareRootWithPrecision(num, precision = 0.000001) {
  if (num < 0) {
    throw new Error("Number cant be negative.");
  }

  if (num <= 1) return num;

  let left = 0, right = num;

  if (num < 1) right = 1;

  while (right - left > precision) {
    let mid = (left + right) / 2;

    //! don't add the commented line
    // if (mid * mid) return mid;

    if (mid * mid < num) {
      left = mid;
    } else {
      right = mid;
    }
  }

  return +((left + right) / 2).toFixed(2); // can use Math.round
}

// Driver code
const result = findSquareRootWithPrecision(20)
console.info({ result })
module.exports = findSquareRootWithPrecision;
```
