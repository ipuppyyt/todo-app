import React from 'react';
import TodoItem from './TodoItem';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
    return (
        <motion.div
            className='w-full flex flex-col space-y-2 mt-10 mb-5 overflow-y-scroll scrollbarin lg:max-w-[70%]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default TodoList;
