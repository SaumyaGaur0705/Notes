import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  toggleTodo,
  removeTodo,
  markCompleted,
  markIncomplete,
  update
} from '../redux/action';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from "react-icons/md";

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
 
  const handleUpdate = () => {
    if (newText.trim() !== '') {
      dispatch(update(index, newText.trim()));
      setIsEditing(false);
    }
  };
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">
          {index + 1}.
        </span>
        {isEditing ? (
          <input
            className="mr-4 border px-2 py-1"
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          />
        ) : (
          <span className={`mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className='space-x-3 ml-8'>
        
      {isEditing ? (
          <button
            className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
        ) : ( 
          <button
            className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => setIsEditing(true)}
          >
            <FiEdit />
          </button>
          
          
        )}
        {!todo.completed && !isEditing && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && !isEditing && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(removeTodo(index))}
        >
          <FaTrash />
        </button>
        
      </div>
    </li>
  );
};

export default TodoItem;