import React from 'react';
import { Button } from './ui/button';
import Checkbox from './ui/checkbox';
import DeleteIcon from '@/assets/icons/DeleteIcon';

interface TodoItemProps {
    todo: { id: number; text: string; completed: boolean };
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className='w-full flex justify-between border-[0.1px] rounded-lg py-1'>
            <div className='flex items-center w-full px-2'>
                <Checkbox
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className='flex-1 font-garet-book text-sm my-[1px] mx-3 overflow-hidden' style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    {todo.text}
                </span>
                <Button className='px-0 bg-transparent hover:bg-transparent flex items-center' onClick={() => onDelete(todo.id)}>
                    <DeleteIcon width={24} height={24} color='#fff' thickness={1} />
                </Button>
            </div>
        </div>
    );
};

export default TodoItem;