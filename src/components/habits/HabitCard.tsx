import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from '../ui/Card';
import ValueSlider from '../ui/ValueSlider';
import ProgressBar from '../ui/ProgressBar';
import { Habit } from '../../types';
import { format, isToday } from '../../utils/dateUtils';
import * as Icons from 'lucide-react';
import { Trash2 } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onUpdate: (habitId: string, value: number) => void;
  onDelete: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onUpdate, onDelete }) => {
  const today = format(new Date());
  const todayLog = habit.logs.find(log => log.date === today) || { 
    date: today, 
    value: 0, 
    completed: false 
  };
  
  const [value, setValue] = useState(todayLog.value);
  
  const handleChange = (newValue: number) => {
    setValue(newValue);
    onUpdate(habit.id, newValue);
  };
  
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[habit.icon] || Icons.Activity;
  
  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: `${habit.color}20` }}
          >
            <IconComponent size={20} color={habit.color} />
          </div>
          <div>
            <CardTitle className="mb-0">{habit.name}</CardTitle>
            <div className="text-sm text-gray-500">
              Target: {habit.target} {habit.unit} • Streak: {habit.currentStreak} days
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {todayLog.completed && (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <Icons.Check size={12} className="mr-1" />
              Completed
            </div>
          )}
          <button
            onClick={() => onDelete(habit.id)}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <CardContent className="mt-4">
        <ProgressBar 
          value={value} 
          max={habit.target} 
          color={habit.color}
          height={8}
        />
        
        <div className="mt-4">
          <ValueSlider
            min={0}
            max={Math.max(habit.target * 1.5, 10)}
            step={1}
            value={value}
            onChange={handleChange}
            unit={habit.unit}
            color={habit.color}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard