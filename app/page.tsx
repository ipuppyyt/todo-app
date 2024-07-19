'use client';

import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import useTodos from '../hooks/useTodos';

const Home: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, onDragEnd } = useTodos();

  return (
    <main className='min-h-screen bg-slate-950 text-slate-50 px-5 sm:px-10 md:px-20 flex flex-col items-center'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl pt-10 sm:pt-12 md:pt-16 font-bold text-center font-garet-bold'>TaskTracker</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
};

export default Home;