//            0  1  2   3   4   5
const arr = [10, 4, 3, 50, 23, 90];
// output = [90, 50, 23]

function getThreeLargest(arr) {
  let first = 0,
    second = 0,
    third = 0;


  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element > first) {
      third = second;
      second = first;
      first = element;
    }

    if (element > second && element !== first) {
      third = second;
      second = element;
    }

    if (element > third && element !== second && element !== first) {
      third = element;
    }
  }

  return [first, second, third];
}

const r = getThreeLargest(arr);

console.log(r);
