import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDelete, MdEdit } from 'react-icons/md';

export default function TaskCard({ task, index, onDelete, onEdit }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? '#e6f7ff' : '#fff'
          }}
        >
          <div className="task-header">
            <h4>{task.title}</h4>
            <div className="task-actions">
              <button onClick={() => onEdit(task)}>
                <MdEdit />
              </button>
              <button onClick={() => onDelete(task.id)}>
                <MdDelete />
              </button>
            </div>
          </div>
          <p className="task-content">{task.content}</p>
          {task.dueDate && (
            <div className="task-footer">
              <span className={`due-date ${new Date(task.dueDate) < new Date() ? 'overdue' : ''}`}>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}