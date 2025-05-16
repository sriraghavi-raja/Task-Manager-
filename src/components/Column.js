import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

export default function Column({ column, tasks, onTaskDelete, onTaskEdit, onTaskAdd }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="column">
      <div className="column-header">
        <h3>{column.title}</h3>
        <button 
          className="add-task-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>
      
      {showForm && (
        <TaskForm 
          columnId={column.id} 
          onTaskAdd={onTaskAdd} 
          onClose={() => setShowForm(false)}
        />
      )}

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={onTaskDelete}
                onEdit={onTaskEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}