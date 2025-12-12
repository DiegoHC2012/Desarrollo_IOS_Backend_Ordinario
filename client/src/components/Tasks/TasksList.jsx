import React from 'react';

const TasksList = ({ tasks, onEdit, onDelete, onToggleComplete, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">✅</div>
        <div className="empty-state-text">No tasks found</div>
        <p>Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ opacity: task.completed ? 0.7 : 1 }}>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task)}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </td>
              <td style={{ maxWidth: '250px' }}>
                {task.description.length > 80
                  ? `${task.description.substring(0, 80)}...`
                  : task.description}
              </td>
              <td>
                {new Date(task.dueDate).toLocaleDateString()}
                {task.completed && (
                  <span className="badge badge-success" style={{ marginLeft: '8px' }}>
                    Done
                  </span>
                )}
              </td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(task)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
