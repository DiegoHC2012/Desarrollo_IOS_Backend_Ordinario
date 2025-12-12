import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { studentsService } from '../services/studentsService';
import StudentsList from '../components/Students/StudentsList';
import StudentForm from '../components/Students/StudentForm';

const StudentsPage = () => {
  const { institutionId } = useApp();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (institutionId) {
      loadStudents();
    }
  }, [institutionId]);

  const loadStudents = async () => {
    if (!institutionId) {
      setError('Please configure Institution ID in Dashboard');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await studentsService.getAll(institutionId);
      if (response.success && response.data) {
        setStudents(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleDelete = async (student) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      await studentsService.delete(institutionId, student.id);
      loadStudents();
    } catch (err) {
      alert(err.message || 'Failed to delete student');
    }
  };

  const handleFormSuccess = () => {
    loadStudents();
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
          <h2 className="card-title">Students</h2>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create New Student
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <StudentsList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        student={selectedStudent}
        institutionId={institutionId}
      />
    </div>
  );
};

export default StudentsPage;
