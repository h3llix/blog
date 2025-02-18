
| **Feature**                   | **`map`**                                                                           | **`unordered_map`**                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Underlying Data Structure** | Balanced binary search tree (e.g., Red-Black Tree)                                  | Hash table                                                                                 |
| **Time Complexity**           | **O(log n)** for insertion, deletion, search                                        | **O(1)** average for insertion, deletion, search <br>**O(n)** worst-case due to collisions |
| **Order of Elements**         | Keys are stored in sorted order                                                     | Keys are stored in arbitrary order                                                         |
| **Memory Usage**              | Generally higher due to tree structure overhead                                     | Generally lower, but hash table and rehashing can use extra space                          |
| **Use Cases**                 | - When sorted order of keys is needed<br>- Ordered traversal required               | - Fast lookups, insertions, and deletions<br>- Order of elements doesn't matter            |
| **Range Query Functions**     | Supports functions like `lower_bound`, `upper_bound`, `equal_range`                 | Does not support range query functions                                                     |
| **Iterator Invalidations**    | Iterators remain valid after insertions (except when pointing to a deleted element) | Iterators may be invalidated by rehashing                                                  |
| **Example Code Output**       | Iterates in sorted order of keys                                                    | Iterates in arbitrary order of keys                                                        |

### Summary
- **Choose `map`** when you need sorted data or require operations like range queries. It has a predictable **O(log n)** time complexity for operations.
- **Choose `unordered_map`** when you need fast access, and the order of elements doesn't matter. It typically offers **O(1)** average time complexity for operations, making it more efficient for large datasets if the order is not important.
