import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [institutionId, setInstitutionId] = useState(
    () => localStorage.getItem('institutionId') || import.meta.env.VITE_INSTITUTION_ID || ''
  );
  const [studentId, setStudentId] = useState(
    () => localStorage.getItem('studentId') || import.meta.env.VITE_STUDENT_ID || ''
  );

  useEffect(() => {
    if (institutionId) {
      localStorage.setItem('institutionId', institutionId);
    }
  }, [institutionId]);

  useEffect(() => {
    if (studentId) {
      localStorage.setItem('studentId', studentId);
    }
  }, [studentId]);

  const value = {
    institutionId,
    setInstitutionId,
    studentId,
    setStudentId
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
