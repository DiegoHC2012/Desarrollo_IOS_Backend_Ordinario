import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { tasksService } from '../services/tasksService';
import TasksList from '../components/Tasks/TasksList';
import TaskForm from '../components/Tasks/TaskForm';

const TasksPage = () => {
  const { institutionId, studentId } = useApp();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (institutionId && studentId) {
      loadTasks();
    }
  }, [institutionId, studentId]);

  const loadTasks = async () => {
    if (!institutionId || !studentId) {
      setError('Please configure Institution ID and Student ID in Dashboard');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await tasksService.getAll(institutionId, studentId);
      if (response.success && response.data) {
        setTasks(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (task) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await tasksService.delete(institutionId, studentId, task.id);
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await tasksService.update(institutionId, studentId, task.id, {
        completed: !task.completed
      });
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to update task');
    }
  };

  const handleFormSuccess = () => {
    loadTasks();
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
          <h2 className="card-title">Tasks</h2>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create New Task
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <TasksList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          loading={loading}
        />
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        task={selectedTask}
        institutionId={institutionId}
        studentId={studentId}
      />
    </div>
  );
};

export default TasksPage;
