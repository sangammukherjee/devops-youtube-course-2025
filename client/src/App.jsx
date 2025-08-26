'use client';

import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskDialog from './components/AddTaskDialog';
import LoadingSpinner from './components/LoadingSpinner';
import { taskService } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      setTasks((prevTasks) => [response.data, ...prevTasks]);
      setIsDialogOpen(false);
      return { success: true };
    } catch (err) {
      console.error('Error creating task:', err);
      return {
        success: false,
        error: err.message || 'Failed to create task',
      };
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleRetry = () => {
    fetchTasks();
  };

  let sangam = 'unused variable here';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600 mt-1">Simple task management for DevOps demo</p>
            </div>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
        )}
      </main>

      {/* Add Task Dialog */}
      {isDialogOpen && (
        <AddTaskDialog onClose={() => setIsDialogOpen(false)} onSubmit={handleAddTask} />
      )}
    </div>
  );
}

export default App;
