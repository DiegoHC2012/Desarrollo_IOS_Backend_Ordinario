import React from 'react';

const SubjectsList = ({ subjects, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📚</div>
        <div className="empty-state-text">No subjects found</div>
        <p>Create your first subject to get started</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Teacher</th>
            <th>Schedule</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.name}</td>
              <td>{subject.teacher}</td>
              <td>{subject.schedule}</td>
              <td style={{ maxWidth: '250px' }}>
                {subject.description.length > 80
                  ? `${subject.description.substring(0, 80)}...`
                  : subject.description}
              </td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(subject)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(subject)}
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

export default SubjectsList;
