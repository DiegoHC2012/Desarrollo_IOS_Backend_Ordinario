import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { gradesService } from '../services/gradesService';
import { subjectsService } from '../services/subjectsService';
import GradesList from '../components/Grades/GradesList';
import GradeForm from '../components/Grades/GradeForm';

const GradesPage = () => {
  const { institutionId, studentId } = useApp();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    if (institutionId && studentId) {
      loadSubjects();
    }
  }, [institutionId, studentId]);

  useEffect(() => {
    if (selectedSubjectId) {
      loadGrades();
    }
  }, [selectedSubjectId]);

  const loadSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const response = await subjectsService.getAll(institutionId, studentId);
      if (response.success && response.data) {
        setSubjects(response.data);
        if (response.data.length > 0 && !selectedSubjectId) {
          setSelectedSubjectId(response.data[0].id);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load subjects');
    } finally {
      setLoadingSubjects(false);
    }
  };

  const loadGrades = async () => {
    if (!institutionId || !studentId || !selectedSubjectId) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await gradesService.getAll(institutionId, studentId, selectedSubjectId);
      if (response.success && response.data) {
        setGrades(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load grades');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    if (!selectedSubjectId) {
      alert('Please select a subject first');
      return;
    }
    setSelectedGrade(null);
    setIsFormOpen(true);
  };

  const handleEdit = (grade) => {
    setSelectedGrade(grade);
    setIsFormOpen(true);
  };

  const handleDelete = async (grade) => {
    if (!window.confirm('Are you sure you want to delete this grade?')) {
      return;
    }

    try {
      await gradesService.delete(institutionId, studentId, selectedSubjectId, grade.id);
      loadGrades();
    } catch (err) {
      alert(err.message || 'Failed to delete grade');
    }
  };

  const handleFormSuccess = () => {
    loadGrades();
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

  if (loadingSubjects) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading subjects...</p>
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="card">
        <div className="alert alert-info">
          No subjects found. Please create a subject first before adding grades.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <h2 className="card-title">Grades</h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select
              className="form-control"
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              style={{ width: 'auto', minWidth: '200px' }}
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleCreate}>
              Create New Grade
            </button>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <GradesList
          grades={grades}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      <GradeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        grade={selectedGrade}
        institutionId={institutionId}
        studentId={studentId}
        subjectId={selectedSubjectId}
      />
    </div>
  );
};

export default GradesPage;
