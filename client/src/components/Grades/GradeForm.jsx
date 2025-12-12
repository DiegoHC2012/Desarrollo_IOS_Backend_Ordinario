import React, { useState, useEffect } from 'react';
import { gradesService } from '../../services/gradesService';
import Modal from '../Common/Modal';

const GradeForm = ({ isOpen, onClose, onSuccess, grade, institutionId, studentId, subjectId }) => {
  const [formData, setFormData] = useState({
    title: '',
    value: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (grade) {
      setFormData({
        title: grade.title || '',
        value: grade.value || ''
      });
    } else {
      setFormData({ title: '', value: '' });
    }
  }, [grade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.value) {
      setError('Please fill in all fields');
      return;
    }

    const value = parseFloat(formData.value);
    if (isNaN(value) || value < 0 || value > 100) {
      setError('Please enter a valid grade value between 0 and 100');
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        title: formData.title,
        value: value
      };

      if (grade) {
        await gradesService.update(institutionId, studentId, subjectId, grade.id, dataToSend);
      } else {
        await gradesService.create(institutionId, studentId, subjectId, dataToSend);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save grade');
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
      title={grade ? 'Edit Grade' : 'Create New Grade'}
      size="small"
    >
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Exam 1, Homework 2"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="value" className="form-label">Value (0-100)</label>
          <input
            type="number"
            id="value"
            name="value"
            className="form-control"
            value={formData.value}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
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
            {loading ? 'Saving...' : grade ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GradeForm;
