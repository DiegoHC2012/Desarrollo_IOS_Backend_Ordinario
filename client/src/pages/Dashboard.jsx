import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { institutionId, setInstitutionId, studentId, setStudentId } = useApp();
  const [localInstitutionId, setLocalInstitutionId] = useState(institutionId);
  const [localStudentId, setLocalStudentId] = useState(studentId);

  const handleSaveConfig = () => {
    setInstitutionId(localInstitutionId);
    setStudentId(localStudentId);
    alert('Configuration saved successfully!');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to iOS Backend Admin</h1>
        <p>Manage your institution's data efficiently</p>
      </div>

      <div className="dashboard-config">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Configuration</h2>
          </div>
          <div className="card-body">
            <p style={{ marginBottom: '20px', color: '#6c757d' }}>
              Set your Institution ID and Student ID to use across all modules
            </p>
            
            <div className="form-group">
              <label htmlFor="institutionId" className="form-label">
                Institution ID
              </label>
              <input
                type="text"
                id="institutionId"
                className="form-control"
                value={localInstitutionId}
                onChange={(e) => setLocalInstitutionId(e.target.value)}
                placeholder="Enter institution ID"
              />
            </div>

            <div className="form-group">
              <label htmlFor="studentId" className="form-label">
                Student ID (Default)
              </label>
              <input
                type="text"
                id="studentId"
                className="form-control"
                value={localStudentId}
                onChange={(e) => setLocalStudentId(e.target.value)}
                placeholder="Enter student ID"
              />
            </div>

            <button className="btn btn-primary" onClick={handleSaveConfig}>
              Save Configuration
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-modules">
        <h2>Available Modules</h2>
        <div className="modules-grid">
          <div className="module-card">
            <div className="module-icon">📢</div>
            <h3>Announcements</h3>
            <p>Manage institution announcements</p>
          </div>

          <div className="module-card">
            <div className="module-icon">📚</div>
            <h3>Subjects</h3>
            <p>Manage student subjects</p>
          </div>

          <div className="module-card">
            <div className="module-icon">✅</div>
            <h3>Tasks</h3>
            <p>Track student tasks</p>
          </div>

          <div className="module-card">
            <div className="module-icon">📊</div>
            <h3>Grades</h3>
            <p>View and manage grades</p>
          </div>

          <div className="module-card">
            <div className="module-icon">👥</div>
            <h3>Students</h3>
            <p>Manage student profiles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
