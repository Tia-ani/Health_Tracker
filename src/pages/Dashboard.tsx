import React from 'react';
import { useHabits } from '../context/HabitContext';
import ProgressSummary from '../components/dashboard/ProgressSummary';
import HabitCard from '../components/habits/HabitCard';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import { Zap, TrendingUp, Award } from 'lucide-react';
import { isToday } from '../utils/dateUtils';

const Dashboard: React.FC = () => {
  const { 
    habits, 
    personalStats, 
    weeklyProgress,
    todayProgress,
    updateHabitValue,
    totalHabits,
    completedHabits
  } = useHabits();
  
  // Get today's habits that need to be completed
  const todayHabits = habits
    .filter(habit => {
      const todayLog = habit.logs.find(log => isToday(log.date));
      return !todayLog?.completed;
    })
    .slice(0, 3);
  
  // Get streak leaders
  const streakLeaders = [...habits]
    .sort((a, b) => b.currentStreak - a.currentStreak)
    .slice(0, 3);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <ProgressSummary 
        weeklyProgress={weeklyProgress}
        todayProgress={todayProgress}
        totalHabits={totalHabits}
        completedHabits={completedHabits}
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardTitle className="flex items-center">
            <Zap size={18} className="text-blue-600 mr-2" />
            Today's Focus
          </CardTitle>
          <CardContent className="mt-4">
            {todayHabits.length > 0 ? (
              todayHabits.map(habit => (
                <div 
                  key={habit.id} 
                  className="flex items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: habit.color }}
                  ></div>
                  <span className="text-gray-700">{habit.name}</span>
                  <span className="ml-auto text-sm text-gray-500">
                    {habit.target} {habit.unit}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                All habits completed for today!
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle className="flex items-center">
            <TrendingUp size={18} className="text-teal-600 mr-2" />
            Weekly Insights
          </CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Completion Rate</span>
                <span className="font-semibold">
                  {Math.round(weeklyProgress.reduce((sum, day) => sum + day.habitCompletionPercentage, 0) / weeklyProgress.length)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Most Productive Day</span>
                <span className="font-semibold">
                  {weeklyProgress.sort((a, b) => b.habitCompletionPercentage - a.habitCompletionPercentage)[0]?.date ? 
                    new Date(weeklyProgress.sort((a, b) => b.habitCompletionPercentage - a.habitCompletionPercentage)[0].date)
                      .toLocaleDateString('en-US', { weekday: 'long' }) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Completions</span>
                <span className="font-semibold">
                  {weeklyProgress.reduce((sum, day) => sum + day.habitsCompleted, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle className="flex items-center">
            <Award size={18} className="text-purple-600 mr-2" />
            Streak Leaders
          </CardTitle>
          <CardContent className="mt-4">
            {streakLeaders.map((habit, index) => (
              <div 
                key={habit.id} 
                className="flex items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs font-semibold">
                  {index + 1}
                </div>
                <span className="text-gray-700">{habit.name}</span>
                <span className="ml-auto font-semibold text-purple-600">
                  {habit.currentStreak} days
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Habits</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {habits.slice(0, 4).map(habit => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            onUpdate={updateHabitValue} 
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;