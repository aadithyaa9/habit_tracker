import React from 'react';
import { Flame, Check, X } from 'lucide-react';

const HabitCard = ({ habit, onToggle, onDelete }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: `${habit.color}20` }}
          >
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-slate-400">{habit.description}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(habit._id)}
          className="text-slate-400 hover:text-red-400 transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-400" size={20} />
          <span className="font-semibold text-white">{habit.streak || 0}</span>
          <span className="text-slate-400 text-sm">day streak</span>
        </div>

        <button
          onClick={() => onToggle(habit._id)}
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
        >
          <Check size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;