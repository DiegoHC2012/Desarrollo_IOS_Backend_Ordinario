import React from 'react';

const GradesList = ({ grades, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!grades || grades.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📊</div>
        <div className="empty-state-text">No grades found</div>
        <p>Create your first grade to get started</p>
      </div>
    );
  }

  const average = grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length;

  return (
    <div>
      <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#1976d2' }}>
          Average Grade: <strong>{average.toFixed(2)}</strong>
        </h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.title}</td>
                <td>
                  <span style={{ fontWeight: 'bold', color: grade.value >= 70 ? '#28a745' : '#dc3545' }}>
                    {grade.value.toFixed(2)}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => onEdit(grade)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(grade)}
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
    </div>
  );
};

export default GradesList;
