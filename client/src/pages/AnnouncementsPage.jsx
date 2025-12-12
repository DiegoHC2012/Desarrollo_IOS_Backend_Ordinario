import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { announcementsService } from '../services/announcementsService';
import AnnouncementsList from '../components/Announcements/AnnouncementsList';
import AnnouncementForm from '../components/Announcements/AnnouncementForm';

const AnnouncementsPage = () => {
  const { institutionId } = useApp();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    if (institutionId) {
      loadAnnouncements();
    }
  }, [institutionId]);

  const loadAnnouncements = async () => {
    if (!institutionId) {
      setError('Please configure Institution ID in Dashboard');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await announcementsService.getAll(institutionId);
      if (response.success && response.data) {
        setAnnouncements(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedAnnouncement(null);
    setIsFormOpen(true);
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsFormOpen(true);
  };

  const handleDelete = async (announcement) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      await announcementsService.delete(institutionId, announcement.id);
      loadAnnouncements();
    } catch (err) {
      alert(err.message || 'Failed to delete announcement');
    }
  };

  const handleFormSuccess = () => {
    loadAnnouncements();
  };

  if (!institutionId) {
    return (
      <div className="card">
        <div className="alert alert-warning">
          Please configure Institution ID in the Dashboard first.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Announcements</h2>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create New Announcement
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <AnnouncementsList
          announcements={announcements}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      <AnnouncementForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        announcement={selectedAnnouncement}
        institutionId={institutionId}
      />
    </div>
  );
};

export default AnnouncementsPage;
