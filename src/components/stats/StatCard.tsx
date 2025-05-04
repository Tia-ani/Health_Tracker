import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from '../ui/Card';
import ValueSlider from '../ui/ValueSlider';
import { PersonalStat } from '../../types';
import { format } from '../../utils/dateUtils';
import * as Icons from 'lucide-react';
import { Trash2 } from 'lucide-react';
import LineChart from '../charts/LineChart';

interface StatCardProps {
  stat: PersonalStat;
  onUpdate: (statId: string, value: number) => void;
  onDelete: (statId: string) => void;
}

const StatCard: React.FC<StatCardProps> = ({ stat, onUpdate, onDelete }) => {
  const [value, setValue] = useState(stat.currentValue);
  
  const handleChange = (newValue: number) => {
    setValue(newValue);
    onUpdate(stat.id, newValue);
  };
  
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[stat.icon] || Icons.Activity;
  
  // Get last 7 days of data
  const last7DaysData = [...stat.logs]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);
  
  // Determine if current value exceeds target
  const exceededTarget = stat.name === 'Screen Time' 
    ? stat.currentValue > stat.target 
    : stat.currentValue < stat.target;
  
  const statusColor = exceededTarget ? '#EF4444' : '#10B981';
  
  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3">
            <IconComponent size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="mb-0">{stat.name}</CardTitle>
            <div className="text-sm text-gray-500">
              Target: {stat.target} {stat.unit}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div 
            className={`text-sm font-medium rounded-full px-3 py-1 flex items-center ${
              exceededTarget 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' 
                : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
            }`}
          >
            {stat.currentValue} {stat.unit}
          </div>
          <button
            onClick={() => onDelete(stat.id)}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <CardContent className="mt-4">
        <LineChart 
          data={last7DaysData}
          color="#3B82F6"
          height={100}
          showLabels={true}
        />
        
        <div className="mt-4">
          <ValueSlider
            min={0}
            max={stat.name === 'Sleep' ? 12 : stat.name === 'Screen Time' ? 12 : 20000}
            step={stat.name === 'Sleep' || stat.name === 'Screen Time' ? 0.5 : 100}
            value={value}
            onChange={handleChange}
            unit={stat.unit}
            color="#3B82F6"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard