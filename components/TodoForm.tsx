import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import PlusIcon from '@/assets/icons/PlusIcon';

interface TodoFormProps {
    onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex space-x-2 mt-20 md:mt-14 lg:mt-10 w-full lg:max-w-[70%]'>
            <Input type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new task"
                className='bg-slate-900 text-white font-garet-book'
            />
            <Button
                type="submit"
                className='bg-slate-900 text-white border shadow-gray-50'>
                <PlusIcon width={24} height={24} color='white' thickness={3} />
            </Button>
        </form>
    );
};

export default TodoForm;