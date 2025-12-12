import React from 'react';

const AnnouncementsList = ({ announcements, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📢</div>
        <div className="empty-state-text">No announcements found</div>
        <p>Create your first announcement to get started</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>{announcement.title}</td>
              <td style={{ maxWidth: '300px' }}>
                {announcement.message.length > 100
                  ? `${announcement.message.substring(0, 100)}...`
                  : announcement.message}
              </td>
              <td>{new Date(announcement.date).toLocaleDateString()}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(announcement)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(announcement)}
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

export default AnnouncementsList;
