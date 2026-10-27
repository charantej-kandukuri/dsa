# Optimize MySQL query

Given two table schemas order and orderItem, optimize the query to return the top 15 most expensive orders.

```sql
CREATE TABLE "Order" (
    id TEXT NOT NULL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL
);
 
CREATE TABLE "OrderItem" (
    id TEXT NOT NULL PRIMARY KEY,
    order_id TEXT NOT NULL,
    name TEXT NOT NULL,
    cost INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES "Order" (id)
);
 
-- Optimize the following query
-- This query returns the 15 most expensive orders
SELECT 
  order.id, 
  SUM(item.cost*item.quantity) as total_cost
FROM order
INNER JOIN "OrderItem" item ON item.order_id = order.id
GROUP BY 1 
ORDER BY 2 DESC
LIMIT 15;
```



## Solution
- not joins needed, as have have all the data in the orderItems table.
- no grouping required.

```sql
SELECT 
  item.order_id,
  SUM(item.cost*item.quantity) as total_cost
FROM orderItem item
  ORDER BY 2 DESC
LIMIT 15;
```