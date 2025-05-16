import React, { useState } from 'react';

export default function TaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task?.title || '');
  const [content, setContent] = useState(task?.content || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      content,
      dueDate: dueDate || null
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
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
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}