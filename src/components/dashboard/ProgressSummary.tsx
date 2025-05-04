import React from 'react';
import { Card, CardTitle, CardContent } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { DailyProgress } from '../../types';
import { formatDisplayDate } from '../../utils/dateUtils';
import BarChart from '../charts/BarChart';
import { BrainCircuit, Zap, BarChart2 } from 'lucide-react';

interface ProgressSummaryProps {
  weeklyProgress: DailyProgress[];
  todayProgress: number;
  totalHabits: number;
  completedHabits: number;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  weeklyProgress,
  todayProgress,
  totalHabits,
  completedHabits,
}) => {
  const chartData = weeklyProgress.map(day => ({
    date: day.date,
    value: day.habitCompletionPercentage
  }));
  
  const today = new Date();
  const todayFormatted = formatDisplayDate(today.toISOString().split('T')[0]);
  
  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between">
        <CardTitle>Today's Progress</CardTitle>
        <span className="text-sm text-gray-500">{todayFormatted}</span>
      </div>
      
      <CardContent className="mt-2">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3">
              <Zap size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Completion</div>
              <div className="text-xl font-semibold">{todayProgress}%</div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mr-3">
              <BrainCircuit size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Habits Done</div>
              <div className="text-xl font-semibold">{completedHabits} of {totalHabits}</div>
            </div>
          </div>
          
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center mr-3">
              <BarChart2 size={20} className="text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Weekly Avg</div>
              <div className="text-xl font-semibold">
                {Math.round(weeklyProgress.reduce((sum, day) => sum + day.habitCompletionPercentage, 0) / weeklyProgress.length)}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Today's Progress</div>
          <ProgressBar value={completedHabits} max={totalHabits} color="#8B5CF6" />
        </div>
        
        <div className="mt-6">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">This Week</div>
          <BarChart 
            data={chartData} 
            color="#8B5CF6"
            height={120}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;