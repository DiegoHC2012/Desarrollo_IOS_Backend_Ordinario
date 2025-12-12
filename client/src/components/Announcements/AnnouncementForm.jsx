import React, { useState, useEffect } from 'react';
import { announcementsService } from '../../services/announcementsService';
import Modal from '../Common/Modal';

const AnnouncementForm = ({ isOpen, onClose, onSuccess, announcement, institutionId }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title || '',
        message: announcement.message || '',
        date: announcement.date ? announcement.date.split('T')[0] : ''
      });
    } else {
      setFormData({ title: '', message: '', date: '' });
    }
  }, [announcement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.message || !formData.date) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        date: new Date(formData.date).toISOString()
      };

      if (announcement) {
        await announcementsService.update(institutionId, announcement.id, dataToSend);
      } else {
        await announcementsService.create(institutionId, dataToSend);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save announcement');
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
      title={announcement ? 'Edit Announcement' : 'Create New Announcement'}
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
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
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
            {loading ? 'Saving...' : announcement ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AnnouncementForm;
