import React, { useState, useEffect } from 'react';
import { studentsService } from '../../services/studentsService';
import Modal from '../Common/Modal';

const StudentForm = ({ isOpen, onClose, onSuccess, student, institutionId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    career: '',
    group: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        career: student.career || '',
        group: student.group || '',
        photo: student.photo || ''
      });
    } else {
      setFormData({ name: '', email: '', career: '', group: '', photo: '' });
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.career || !formData.group) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Clean up empty photo field
      const dataToSend = { ...formData };
      if (!dataToSend.photo) {
        delete dataToSend.photo;
      }

      if (student) {
        await studentsService.update(institutionId, student.id, dataToSend);
      } else {
        // For creating, we need a student ID - we'll use email as base
        const studentId = formData.email.split('@')[0];
        await studentsService.create(institutionId, studentId, dataToSend);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={student ? 'Edit Student' : 'Create New Student'}
    >
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            disabled={loading || student} // Can't change email when editing
          />
          {student && (
            <small style={{ color: '#6c757d' }}>Email cannot be changed</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="career" className="form-label">Career *</label>
          <input
            type="text"
            id="career"
            name="career"
            className="form-control"
            value={formData.career}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="group" className="form-label">Group *</label>
          <input
            type="text"
            id="group"
            name="group"
            className="form-control"
            value={formData.group}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo" className="form-label">Photo URL (optional)</label>
          <input
            type="url"
            id="photo"
            name="photo"
            className="form-control"
            value={formData.photo}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            disabled={loading}
          />
        </div>

        <div className="actions" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : student ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentForm;
