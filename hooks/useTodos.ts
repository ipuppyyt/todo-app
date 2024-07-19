import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const dbRequest = indexedDB.open('TodoDB', 1);

        dbRequest.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore('todos', { keyPath: 'id' });
        };

        dbRequest.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            fetchTodos(db);
        };

        dbRequest.onerror = (event) => {
            console.error('Database error:', (event.target as IDBOpenDBRequest).error);
        };
    }, []);

    const fetchTodos = (db: IDBDatabase) => {
        const transaction = db.transaction('todos', 'readonly');
        const store = transaction.objectStore('todos');
        const request = store.getAll();

        request.onsuccess = () => {
            setTodos(request.result);
        };
    };

    const addTodo = (text: string) => {
        const newTodo: Todo = { id: Date.now(), text, completed: false };
        const dbRequest = indexedDB.open('TodoDB', 1);

        dbRequest.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction('todos', 'readwrite');
            const store = transaction.objectStore('todos');
            store.add(newTodo);
            setTodos((prev) => [...prev, newTodo]);
        };
    };

    const toggleTodo = (id: number) => {
        const dbRequest = indexedDB.open('TodoDB', 1);

        dbRequest.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction('todos', 'readwrite');
            const store = transaction.objectStore('todos');

            const getRequest = store.get(id);
            getRequest.onsuccess = () => {
                const todo = getRequest.result;
                if (todo) {
                    todo.completed = !todo.completed;
                    store.put(todo);
                    setTodos((prev) =>
                        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
                    );
                }
            };
        };
    };

    const deleteTodo = (id: number) => {
        const dbRequest = indexedDB.open('TodoDB', 1);

        dbRequest.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction('todos', 'readwrite');
            const store = transaction.objectStore('todos');
            store.delete(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        };
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return; // Exit if there's no valid destination
        }

        // Reorder the todos array
        setTodos((prevTodos) => {
            const items = Array.from(prevTodos);
            const [reorderedItem] = items.splice(result.source.index, 1);
            
            if (result.destination) {
                items.splice(result.destination.index, 0, reorderedItem);
                
                // Update IndexedDB with the new order
                const dbRequest = indexedDB.open('TodoDB', 1);
                dbRequest.onsuccess = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    const transaction = db.transaction('todos', 'readwrite');
                    const store = transaction.objectStore('todos');
                    
                    items.forEach((todo) => {
                        store.put(todo); // Update each todo in IndexedDB
                    });
                };
            }
            
            return items;
        });
    };

    return { todos, addTodo, toggleTodo, deleteTodo, onDragEnd };
};

export default useTodos;