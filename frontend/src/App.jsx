import React, { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import AuthModal from './components/AuthModal';
import HabitCard from './components/HabitCard';
import HabitModal from './components/HabitModal';
import StatsGrid from './components/StatsGrid';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [habits, setHabits] = useState([]);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchHabits();
    } else {
      setLoading(false);
    }
  }, []);

  const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.headers,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      throw new Error('Session expired');
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Something went wrong');
    return data;
  };

  const fetchHabits = async () => {
    try {
      const data = await apiCall('/habits');
      setHabits(data);
    } catch (error) {
      console.error('Failed to fetch habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHabit = async (habitData) => {
    try {
      const newHabit = await apiCall('/habits', {
        method: 'POST',
        body: JSON.stringify(habitData),
      });
      setHabits([newHabit, ...habits]);
      setShowHabitModal(false);
    } catch (error) {
      console.error('Failed to create habit:', error);
      alert('Failed to create habit');
    }
  };

  const handleToggleCheckmark = async (habitId) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const result = await apiCall('/checkmarks/toggle', {
        method: 'POST',
        body: JSON.stringify({ habitId, date: today }),
      });
      
      setHabits(habits.map(h => 
        h._id === habitId ? { ...h, streak: result.streak } : h
      ));
    } catch (error) {
      console.error('Failed to toggle checkmark:', error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (!confirm('Are you sure you want to delete this habit?')) return;

    try {
      await apiCall(`/habits/${habitId}`, { method: 'DELETE' });
      setHabits(habits.filter(h => h._id !== habitId));
    } catch (error) {
      console.error('Failed to delete habit:', error);
      alert('Failed to delete habit');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setHabits([]);
  };

  const getStats = () => {
    const completedToday = 0;
    const longestStreak = Math.max(...habits.map(h => h.streak || 0), 0);
    const activeHabits = habits.length;
    return { completedToday, longestStreak, activeHabits };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthModal onSuccess={() => { setIsAuthenticated(true); fetchHabits(); }} />;
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">The Best Habit Tracker</h1>
            <p className="text-slate-400">Build better habits, one day at a time</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowHabitModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Plus size={20} />
              Add Habit
            </button>
            <button
              onClick={handleLogout}
              className="bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg transition"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onToggle={handleToggleCheckmark}
              onDelete={handleDeleteHabit}
            />
          ))}
        </div>

        {habits.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg mb-4">
              No habits yet. Start building better habits today!
            </p>
            <button
              onClick={() => setShowHabitModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Create Your First Habit
            </button>
          </div>
        )}
      </div>

      {showHabitModal && (
        <HabitModal
          onClose={() => setShowHabitModal(false)}
          onSubmit={handleCreateHabit}
        />
      )}
    </div>
  );
}

export default App;