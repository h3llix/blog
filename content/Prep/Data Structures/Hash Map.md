#### **Time Complexity of Operations:**

|**Operation**|**Average Case**|**Worst Case**|
|---|---|---|
|**Insertion**|O(1)|O(n)|
|**Deletion**|O(1)|O(n)|
|**Lookup**|O(1)|O(n)|

```
#include <iostream>
#include <list>
#include <vector>
#include <utility> // For std::pair

template <typename K, typename V>
class CustomHashMap {
private:
    // Node to store key-value pairs
    struct Node {
        K key;
        V value;
        Node(K k, V v) : key(k), value(v) {}
    };

    std::vector<std::list<Node>> table;
    int capacity;
    int size;

    int hashFunction(K key) {
        return std::hash<K>()(key) % capacity;
    }

public:
    CustomHashMap(int capacity = 16) : capacity(capacity), size(0) {
        table.resize(capacity);
    }

    void put(K key, V value) {
        int index = hashFunction(key);
        for (auto& node : table[index]) {
            if (node.key == key) {
                node.value = value; // Update value if key already exists
                return;
            }
        }
        table[index].emplace_back(key, value); // Add new key-value pair
        size++;
    }

    V get(K key) {
        int index = hashFunction(key);
        for (auto& node : table[index]) {
            if (node.key == key) {
                return node.value; // Return value if key is found
            }
        }
        return V(); // Return default value if key is not found
    }

    void remove(K key) {
        int index = hashFunction(key);
        auto& chain = table[index];
        for (auto it = chain.begin(); it != chain.end(); ++it) {
            if (it->key == key) {
                chain.erase(it); // Remove key-value pair
                size--;
                return;
            }
        }
    }

    bool containsKey(K key) {
        return get(key) != V();
    }

    bool isEmpty() {
        return size == 0;
    }

    int getSize() {
        return size;
    }
};

int main() {
    CustomHashMap<std::string, int> map;
    map.put("one", 1);
    map.put("two", 2);
    map.put("three", 3);

    std::cout << "Value for key 'two': " << map.get("two") << std::endl;

    map.remove("two");

    std::cout << "Value for key 'two' after removal: " << map.get("two") << std::endl;
    std::cout << "Contains key 'one': " << map.containsKey("one") << std::endl;
    std::cout << "Map is empty: " << std::boolalpha << map.isEmpty() << std::endl;
    std::cout << "Map size: " << map.getSize() << std::endl;

    return 0;
}

```