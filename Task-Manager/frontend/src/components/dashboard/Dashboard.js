import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { tasksAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksAPI.getAllTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await tasksAPI.updateTask(editingTask._id, formData);
        setTasks(tasks.map(task => task._id === editingTask._id ? response.data.task : task));
      } else {
        const response = await tasksAPI.createTask(formData);
        setTasks([response.data.task, ...tasks]);
      }
      setFormData({ title: '', description: '', status: 'pending' });
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      setError('Failed to save task');
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
    setShowTaskForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (error) {
        setError('Failed to delete task');
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'pending' });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getBadgeTone = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
      case 'in-progress':
        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 ring-1 ring-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-700">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mb-4"></div>
          <p className="text-lg text-slate-600 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative text-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="h-full w-full bg-[radial-gradient(900px_500px_at_10%_-10%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(700px_400px_at_90%_-10%,rgba(99,102,241,0.12),transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="rounded-2xl p-6 md:p-8 mb-8 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight ml-[-50px] mb-[10px]">Task Manager</h1>
              <p className="text-slate-500 mt-1">Welcome back, {user?.name}.</p>
            </div>
            <div className="flex items-center gap-3">
              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="px-4 py-2 rounded-lg text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-sm"
                >
                  Admin Panel
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl p-4 bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-semibold">{tasks.length}</div>
              <div className="text-slate-500">Total</div>
            </div>
            <div className="rounded-xl p-4 bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-semibold">
                {tasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-slate-500">Completed</div>
            </div>
            <div className="rounded-xl p-4 bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-semibold">
                {tasks.filter(t => t.status === 'in-progress').length}
              </div>
              <div className="text-slate-500">In Progress</div>
            </div>
          </div>
        </div>
        {error && (
          <div className="mb-6 rounded-lg px-4 py-3 bg-rose-50 text-rose-700 border border-rose-200 shadow-sm">
            {error}
          </div>
        )}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Your Tasks</h2>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-slate-700 mb-2">No tasks yet</h3>
              <p className="text-slate-500">Create a task to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={[
                    'rounded-xl p-5 transition',
                    'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeTone(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>

                  {task.description && (
                    <p className="text-slate-600 mb-4">{task.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="px-3 py-1.5 rounded-lg text-sm text-white bg-sky-500 hover:bg-sky-600 transition-colors shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-3 py-1.5 rounded-lg text-sm text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {showTaskForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={handleCancel} />
            <div className="relative max-w-md w-full mx-4 rounded-2xl p-6 md:p-7 bg-white border border-slate-200 shadow-xl">
              <h3 className="text-xl md:text-2xl font-semibold mb-5">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 py-3 rounded-lg text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 transition-colors shadow-md"
                  >
                    {editingTask ? 'Update Task' : 'Create Task'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 py-3 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Floating Add Button */}
        <button
          onClick={() => setShowTaskForm(true)}
          title="Add New Task"
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-2xl leading-none text-white bg-gradient-to-br from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 transition-shadow shadow-lg grid place-items-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
