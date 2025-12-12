import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { subjectsService } from '../services/subjectsService';
import SubjectsList from '../components/Subjects/SubjectsList';
import SubjectForm from '../components/Subjects/SubjectForm';

const SubjectsPage = () => {
  const { institutionId, studentId } = useApp();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    if (institutionId && studentId) {
      loadSubjects();
    }
  }, [institutionId, studentId]);

  const loadSubjects = async () => {
    if (! institutionId || !studentId) {
      setError('Please configure Institution ID and Student ID in Dashboard');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await subjectsService.getAll(institutionId, studentId);
      // Cambiar de response.success a response.status === 200
      if (response.data && response.status === 200) {
        setSubjects(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedSubject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setIsFormOpen(true);
  };

  const handleDelete = async (subject) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) {
      return;
    }

    try {
      await subjectsService.delete(institutionId, studentId, subject.id);
      loadSubjects();
    } catch (err) {
      alert(err.message || 'Failed to delete subject');
    }
  };

  const handleFormSuccess = () => {
    loadSubjects();
  };

  if (!institutionId || !studentId) {
    return (
      <div className="card">
        <div className="alert alert-warning">
          Please configure Institution ID and Student ID in the Dashboard first.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Subjects</h2>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create New Subject
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <SubjectsList
          subjects={subjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      <SubjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        subject={selectedSubject}
        institutionId={institutionId}
        studentId={studentId}
      />
    </div>
  );
};

export default SubjectsPage;
