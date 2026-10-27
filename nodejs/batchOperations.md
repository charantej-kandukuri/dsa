## Batch Operation
Should fetch all products with IDs from 1 to totalProducts sequentially
and return them in a single array

``` JavaScript
const fetchProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
  return response.json();
};

// Should fetch all products with IDs from 1 to totalProducts sequentially
// and return them in a single array
const productsList = [];
let count = 0;

const fetchAllProducts = async (totalProducts) => {
  // solution here...
};

fetchAllProducts(20)
  .then((products) => {
    console.log(`Fetched ${products.length} products`);
  })
  .catch((err) => {
    console.error('Failed to fetch products', err);
  });

```


## Idea to solve
Here is the idea to loop through the items in batchs without the need of any recursive function.

```JavaScript
// if you have a list of user ids
let userIds = [1,2,3,....n]

// we can loop though the item with a predifined batch size say 3.
let batchSize = 3

for(let i = 0; i < userIds.length; i += batchSize) {
   const batchIds = userIds.slice(i, i + batchSize);

  // Fire a batch of requests concurrently
  const batchPromises = batchIds.map(id => fetchProduct(id));
  const batchResults = await Promise.all(batchPromises);
  products.push(...batchResults);

}

```


## Solution 1

To solve this efficiently and cleanly in Node.js, you can use a standard for loop combined with async/await.

Since the requirement specifies that the products must be fetched sequentially (one after the other), a for...of or traditional for loop is ideal because it correctly pauses execution until each fetchProduct promise resolves. (Note: If you wanted them concurrently, you would use Promise.all(), but that violates the sequential requirement).

Here is the best way to implement fetchAllProducts:

```Javascript
const fetchProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) 
    throw new Error(`Failed to fetch product ${id}`);
  return response.json();
};

// Implemented with sequential execution
const fetchAllProducts = async (totalProducts, count) => {
  const products = [];
  
  for (let i = 1; i <= totalProducts; i++) {
    const product = await fetchProduct(i);
    products.push(product);
  }
  
  return products;
};

fetchAllProducts(20, 0)
  .then((products) => {
    console.log(`Fetched ${products.length} products`);
  })
  .catch((err) => {
    console.error('Failed to fetch products', err);
  });
```

Key Details
- Sequential Loop: Using for (let i = 1; i <= totalProducts; i++) with await fetchProduct(i) guarantees that request i+1 is only sent after request i has completed successfully.

- Error Handling: If any individual request fails, the throw new Error inside fetchProduct will immediately reject the promise and trigger the .catch() block in the execution chain.

- Modern Node.js Compatibility: Modern versions of Node.js (v18 and above) include a global fetch API out of the box, meaning this code runs natively without requiring external packages like node-fetch.

## Solution 2

For 1000 ids it will not be performant at all if totalProducts is 1,000 or 10,000.

Why Sequential Fails at ScaleBecause the code uses a strict sequential loop (await fetchProduct(i)), Node.js must wait for each individual HTTP request to completely finish, return, and parse before starting the next one.
- If a single request takes 100ms:
  - 1,000 products $\rightarrow$ $\approx$ 100 seconds (over 1.5 minutes)
  - 10,000 products $\rightarrow$ $\approx$ 1,000 seconds (over 16 minutes)
During all this time, your network bandwidth and CPU are mostly sitting idle, waiting for the server response.

### The Better Alternative: Batched Concurrency

To handle large numbers efficiently without overwhelming the target server (which might block you for hitting it with thousands of requests simultaneously), you should use **batched concurrency**.

Instead of fetching 1-by-1 or all 10,000 at once, you fetch them in chunks (e.g., 10 or 20 requests at a time).

``` JavaScript
const fetchProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) 
    throw new Error(`Failed to fetch product ${id}`);
  return response.json();
};

// Implemented with batched concurrency
const fetchAllProductsBatched = async (totalProducts, batchSize = 10) => {
  const products = [];
  const ids = Array.from({ length: totalProducts }, (_, i) => i + 1);

  for (let i = 0; i < ids.length; i += batchSize) {
    const batchIds = ids.slice(i, i + batchSize);
    
    // Fire a batch of requests concurrently
    const batchPromises = batchIds.map(id => fetchProduct(id));
    const batchResults = await Promise.all(batchPromises);
    
    products.push(...batchResults);
  }

  return products;
};

fetchAllProductsBatched(1000, 20)
  .then((products) => {
    console.log(`Fetched ${products.length} products`);
  })
  .catch((err) => {
    console.error('Failed to fetch products', err);
  });

```

Key Improvements
- **Massive Speedup**: By running 20 requests concurrently per batch, you cut execution time down by roughly a factor of 20.

- **Server Protection**: Unlike a naive Promise.all(ids.map(...)) that would flood the API with 10,000 simultaneous connections (likely triggering a 429 Too Many Requests error or crashing the script), batching limits the load to a safe, configurable threshold.