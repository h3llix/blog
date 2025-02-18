## Linked List in C++

### Overview

A **Linked List** is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation.

### Types of Linked Lists

- **Singly Linked List**: Each node contains a single pointer to the next node.
- **Doubly Linked List**: Each node contains two pointers, one pointing to the next node and another to the previous node.
- **Circular Linked List**: The last node points back to the first node, forming a circle.

### Time Complexity

|Operation|Singly Linked List|Doubly Linked List|
|---|---|---|
|Insertion at Head|O(1)|O(1)|
|Insertion at Tail|O(n)|O(1)|
|Deletion at Head|O(1)|O(1)|
|Deletion at Tail|O(n)|O(1)|
|Search|O(n)|O(n)|
|Access (by index)|O(n)|O(n)|

| Feature                   | Singly Linked List                                        | Doubly Linked List                                                               |
| ------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Node Structure**        | `struct Node { int data; Node* next; };`                  | `struct Node { int data; Node* next; Node* prev; };`                             |
| **Memory Usage per Node** | 4 bytes for `int`, 8 bytes for `Node* next`               | 4 bytes for `int`, 8 bytes for `Node* next`, 8 bytes for `Node* prev`            |
| **Insertion at Head**     | Simple: Update `next` pointer                             | Update `next` and set `prev` pointer of new node, update `prev` of old head node |
| **Insertion at Tail**     | Traverse to the end, update `next` pointer                | Traverse to the end, update `next` and `prev` pointers                           |
| **Deletion at Head**      | Update `head` to point to `head->next`                    | Update `head` to point to `head->next`, set `head->prev` to `nullptr`            |
| **Deletion at Tail**      | Traverse to the second last node, set `next` to `nullptr` | Traverse to last node, update `prev->next` to `nullptr`, delete last node        |
| **Traversal**             | Forward only                                              | Forward and backward                                                             |
| **Code Complexity**       | Simpler due to single direction pointers                  | More complex due to dual direction pointers                                      |

```
#include <iostream>

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class SinglyLinkedList {
private:
    Node* head;
public:
    SinglyLinkedList() : head(nullptr) {}

    // Insert at the beginning
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }

    // Insert at the end
    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    // Delete from head
    void deleteFromHead() {
        if (head == nullptr) return;
        Node* temp = head;
        head = head->next;
        delete temp;
    }

    // Display the list
    void display() {
        Node* temp = head;
        while (temp != nullptr) {
            std::cout << temp->data << " -> ";
            temp = temp->next;
        }
        std::cout << "NULL" << std::endl;
    }

    ~SinglyLinkedList() {
        while (head != nullptr) {
            deleteFromHead();
        }
    }
};

int main() {
    SinglyLinkedList list;
    list.insertAtHead(3);
    list.insertAtHead(2);
    list.insertAtHead(1);
    list.insertAtTail(4);
    list.display();

    list.deleteFromHead();
    list.display();

    return 0;
}

```

```
#include <iostream>

struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};

class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
public:
    DoublyLinkedList() : head(nullptr), tail(nullptr) {}

    // Insert at the beginning
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
    }

    // Insert at the end
    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        if (tail == nullptr) {
            head = tail = newNode;
        } else {
            newNode->prev = tail;
            tail->next = newNode;
            tail = newNode;
        }
    }

    // Delete from head
    void deleteFromHead() {
        if (head == nullptr) return;
        Node* temp = head;
        if (head == tail) { // Only one node
            head = tail = nullptr;
        } else {
            head = head->next;
            head->prev = nullptr;
        }
        delete temp;
    }

    // Delete from tail
    void deleteFromTail() {
        if (tail == nullptr) return;
        Node* temp = tail;
        if (head == tail) { // Only one node
            head = tail = nullptr;
        } else {
            tail = tail->prev;
            tail->next = nullptr;
        }
        delete temp;
    }

    // Display the list forward
    void displayForward() {
        Node* temp = head;
        while (temp != nullptr) {
            std::cout << temp->data << " <-> ";
            temp = temp->next;
        }
        std::cout << "NULL" << std::endl;
    }

    // Display the list backward
    void displayBackward() {
        Node* temp = tail;
        while (temp != nullptr) {
            std::cout << temp->data << " <-> ";
            temp = temp->prev;
        }
        std::cout << "NULL" << std::endl;
    }

    ~DoublyLinkedList() {
        while (head != nullptr) {
            deleteFromHead();
        }
    }
};

int main() {
    DoublyLinkedList list;
    list.insertAtHead(3);
    list.insertAtHead(2);
    list.insertAtHead(1);
    list.insertAtTail(4);
    list.displayForward();

    list.deleteFromHead();
    list.displayForward();

    list.displayBackward();

    return 0;
}

```


Visualisation

### Doubly Linked List Visualization

#### 1. Adding a Node

**a. Adding at the Head:**

- **Initial List:**

rust

Copy code

`Head -> [1] <-> [2] <-> [3] <-> NULL`

- **Add 0 at Head:**

rust

Copy code

`Head -> [0] <-> [1] <-> [2] <-> [3] <-> NULL`

- **Explanation:**
    - A new node `[0]` is created.
    - Its `next` pointer points to the previous head node `[1]`.
    - The `prev` pointer of the previous head node `[1]` is updated to point to the new node `[0]`.
    - The head pointer is updated to point to the new node `[0]`.

**b. Adding at the Tail:**

- **Initial List:**

rust

Copy code

`Head -> [0] <-> [1] <-> [2] <-> [3] <-> NULL`

- **Add 4 at Tail:**

rust

Copy code

`Head -> [0] <-> [1] <-> [2] <-> [3] <-> [4] <-> NULL`

- **Explanation:**
    - A new node `[4]` is created.
    - Its `prev` pointer points to the previous tail node `[3]`.
    - The `next` pointer of the previous tail node `[3]` is updated to point to the new node `[4]`.
    - The tail pointer is updated to point to the new node `[4]`