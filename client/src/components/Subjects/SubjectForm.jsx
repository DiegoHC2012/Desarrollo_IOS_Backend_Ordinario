import React, { useState, useEffect } from 'react';
import { subjectsService } from '../../services/subjectsService';
import Modal from '../Common/Modal';

const SubjectForm = ({ isOpen, onClose, onSuccess, subject, institutionId, studentId }) => {
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    schedule: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || '',
        teacher: subject.teacher || '',
        schedule: subject.schedule || '',
        description: subject.description || ''
      });
    } else {
      setFormData({ name: '', teacher: '', schedule: '', description: '' });
    }
  }, [subject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.teacher || !formData.schedule || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (subject) {
        await subjectsService.update(institutionId, studentId, subject.id, formData);
      } else {
        await subjectsService.create(institutionId, studentId, formData);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save subject');
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
      title={subject ? 'Edit Subject' : 'Create New Subject'}
    >
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
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
          <label htmlFor="teacher" className="form-label">Teacher</label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            className="form-control"
            value={formData.teacher}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="schedule" className="form-label">Schedule</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            className="form-control"
            value={formData.schedule}
            onChange={handleChange}
            placeholder="e.g., Mon-Wed 10:00-12:00"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
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
            {loading ? 'Saving...' : subject ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SubjectForm;
