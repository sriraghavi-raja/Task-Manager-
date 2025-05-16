import React, { useState } from 'react';

export default function TaskForm({ columnId, onTaskAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onTaskAdd(columnId, {
      title: title.trim(),
      content: content.trim(),
      dueDate: dueDate || null
    });
    
    setTitle('');
    setContent('');
    setDueDate('');
    onClose();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Task description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
}