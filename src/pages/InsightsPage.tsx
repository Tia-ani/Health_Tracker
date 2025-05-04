import React from 'react';
import { useHabits } from '../context/HabitContext';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import { format, getLastNDays } from '../utils/dateUtils';

const InsightsPage: React.FC = () => {
  const { habits, personalStats, weeklyProgress } = useHabits();
  
  // Get data for the last 14 days
  const last14Days = getLastNDays(14);
  
  // Calculate completion rate per day
  const completionData = last14Days.map(date => {
    const completed = habits.filter(habit => 
      habit.logs.some(log => log.date === date && log.completed)
    ).length;
    
    return {
      date,
      value: Math.round((completed / habits.length) * 100)
    };
  });
  
  // Get sleep data
  const sleepStat = personalStats.find(stat => stat.name === 'Sleep');
  const sleepData = sleepStat ? sleepStat.logs.slice(-14) : [];
  
  // Get screen time data
  const screenStat = personalStats.find(stat => stat.name === 'Screen Time');
  const screenData = screenStat ? screenStat.logs.slice(-14) : [];
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Insights</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardTitle>Habit Completion Rate</CardTitle>
          <CardContent className="mt-4">
            <BarChart 
              data={completionData} 
              color="#8B5CF6"
              height={200}
              showLabels={true}
            />
            <div className="mt-4 text-sm text-gray-500 text-center">
              Your average completion rate: {Math.round(completionData.reduce((sum, item) => sum + item.value, 0) / completionData.length)}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Sleep vs Screen Time</CardTitle>
          <CardContent className="mt-4 relative">
            <div className="flex justify-end mb-2">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-600">Sleep</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs text-gray-600">Screen Time</span>
              </div>
            </div>
            
            <div className="relative h-[200px]">
              <LineChart 
                data={sleepData} 
                color="#3B82F6"
                height={200}
                showLabels={false}
                showPoints={false}
              />
              <div className="absolute inset-0">
                <LineChart 
                  data={screenData} 
                  color="#EF4444"
                  height={200}
                  showLabels={true}
                  showPoints={false}
                />
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              Avg Sleep: {sleepData.length ? (sleepData.reduce((sum, item) => sum + item.value, 0) / sleepData.length).toFixed(1) : 0} hrs 
              • Avg Screen Time: {screenData.length ? (screenData.reduce((sum, item) => sum + item.value, 0) / screenData.length).toFixed(1) : 0} hrs
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardTitle>Top Habit</CardTitle>
          <CardContent className="mt-4">
            {habits.length > 0 && (
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${habits[0].color}20` }}
                >
                  <span className="text-2xl" style={{ color: habits[0].color }}>
                    {habits[0].name.charAt(0)}
                  </span>
                </div>
                <div className="text-lg font-semibold">{habits[0].name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {habits[0].longestStreak} day streak record
                </div>
                <div className="mt-3 text-sm">
                  Completed {habits[0].logs.filter(log => log.completed).length} times
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Weekly Trends</CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Most Active Day</div>
                <div className="text-xl font-semibold">
                  {weeklyProgress.sort((a, b) => b.habitCompletionPercentage - a.habitCompletionPercentage)[0]?.date ? 
                    new Date(weeklyProgress.sort((a, b) => b.habitCompletionPercentage - a.habitCompletionPercentage)[0].date)
                      .toLocaleDateString('en-US', { weekday: 'long' }) : 'N/A'}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Least Active Day</div>
                <div className="text-xl font-semibold">
                  {weeklyProgress.sort((a, b) => a.habitCompletionPercentage - b.habitCompletionPercentage)[0]?.date ? 
                    new Date(weeklyProgress.sort((a, b) => a.habitCompletionPercentage - b.habitCompletionPercentage)[0].date)
                      .toLocaleDateString('en-US', { weekday: 'long' }) : 'N/A'}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Consistency Score</div>
                <div className="text-xl font-semibold">
                  {Math.round(weeklyProgress.reduce((sum, day) => sum + day.habitCompletionPercentage, 0) / weeklyProgress.length)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Habit Streaks</CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-3">
              {habits.map(habit => (
                <div key={habit.id} className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: habit.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{habit.name}</span>
                  <div className="ml-auto flex items-center">
                    <span className="text-sm font-semibold">{habit.currentStreak}</span>
                    <span className="text-xs text-gray-500 ml-1">days</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm font-medium mb-2">Total Streak Days</div>
              <div className="text-2xl font-bold">
                {habits.reduce((sum, habit) => sum + habit.currentStreak, 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPage;