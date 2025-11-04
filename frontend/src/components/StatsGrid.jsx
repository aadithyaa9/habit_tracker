import React from 'react';
import { Calendar, Check, Flame, TrendingUp } from 'lucide-react';

const StatsGrid = ({ stats }) => {
  const statCards = [
    {
      icon: Check,
      value: stats.completedToday,
      label: 'Completed Today',
      bgColor: 'bg-emerald-500/20',
      textColor: 'text-emerald-400'
    },
    {
      icon: Flame,
      value: stats.longestStreak,
      label: 'Longest Streak',
      bgColor: 'bg-orange-500/20',
      textColor: 'text-orange-400'
    },
    {
      icon: TrendingUp,
      value: stats.activeHabits,
      label: 'Active Habits',
      bgColor: 'bg-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      icon: Calendar,
      value: new Date().getDate(),
      label: 'Days in Month',
      bgColor: 'bg-purple-500/20',
      textColor: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-4 mb-2">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={stat.textColor} size={24} />
              </div>
              <span className="text-4xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-slate-400">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;