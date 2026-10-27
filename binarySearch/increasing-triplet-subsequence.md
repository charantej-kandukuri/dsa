
# [Increasing Triplet Subsequence](https://leetcode.com/problems/increasing-triplet-subsequence/description/)


You are given an integer array nums.

Return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

## Example 1:

Input: nums = [1,2,3,4,5] \
Output: true \
Explanation: Any triplet where i < j < k is valid.

## Example 2:

Input: nums = [5,4,3,2,1] \
Output: false \
Explanation: No triplet exists.


## Example 3:

Input: nums = [2,1,5,0,4,6] \
Output: true \
Explanation: One of the valid triplet is (1, 4, 5), because nums[1] == 1 < nums[4] == 4 < nums[5] == 6.


## Solution
```javascript
function increasingTriplet(nums) {
    let left = Infinity
    let right = Infinity

    for(let num of nums) {
        if(num < left) {
            left = num
        } else if (num > right) {
            right = num
        } else if(num > left && num < right) {
            return true
        }
    }

    return false;
};

// Drive Code
// const nums =  [1,2,3,4,5]; // true
// const nums =  [2,1,5,0,4,6]; // true
const nums = [2,2,2,2,2,2]; // false
// const nums = [5,4,3,2,1]; // false;
const result = increasingTriplet(nums);
console.log(result);

```