import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Habit, PersonalStat, HabitLog, DailyProgress } from '../types';
import { habits as mockHabits, personalStats as mockStats, weeklyProgress as mockProgress } from '../data/mockData';
import { format, isToday } from '../utils/dateUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface HabitContextType {
  habits: Habit[];
  personalStats: PersonalStat[];
  weeklyProgress: DailyProgress[];
  todayProgress: number;
  updateHabitValue: (habitId: string, value: number) => void;
  updateStatValue: (statId: string, value: number) => void;
  getHabit: (habitId: string) => Habit | undefined;
  getStat: (statId: string) => PersonalStat | undefined;
  totalHabits: number;
  completedHabits: number;
  addHabit: (habit: Omit<Habit, 'id' | 'logs' | 'currentStreak' | 'longestStreak'>) => void;
  addStat: (stat: Omit<PersonalStat, 'id' | 'logs'>) => void;
  deleteHabit: (habitId: string) => void;
  deleteStat: (statId: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', mockHabits);
  const [personalStats, setPersonalStats] = useLocalStorage<PersonalStat[]>('personalStats', mockStats);
  const [weeklyProgress, setWeeklyProgress] = useLocalStorage<DailyProgress[]>('weeklyProgress', mockProgress);
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');
  
  const todayDate = format(new Date());
  
  const totalHabits = habits.length;
  const completedHabits = habits.filter(habit => {
    const todayLog = habit.logs.find(log => log.date === todayDate);
    return todayLog?.completed;
  }).length;
  
  const todayProgress = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  const updateHabitValue = (habitId: string, value: number) => {
    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id === habitId) {
          const completed = value >= habit.target;
          const existingLogIndex = habit.logs.findIndex(log => log.date === todayDate);
          const newLogs = [...habit.logs];
          
          if (existingLogIndex >= 0) {
            newLogs[existingLogIndex] = {
              ...newLogs[existingLogIndex],
              value,
              completed
            };
          } else {
            newLogs.push({
              date: todayDate,
              value,
              completed
            });
          }
          
          let newStreak = habit.currentStreak;
          if (completed) {
            newStreak += 1;
          } else {
            newStreak = 0;
          }
          
          return {
            ...habit,
            logs: newLogs,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, habit.longestStreak)
          };
        }
        return habit;
      });
    });
    
    updateWeeklyProgress();
  };
  
  const updateStatValue = (statId: string, value: number) => {
    setPersonalStats(prevStats => {
      return prevStats.map(stat => {
        if (stat.id === statId) {
          const existingLogIndex = stat.logs.findIndex(log => log.date === todayDate);
          const newLogs = [...stat.logs];
          
          if (existingLogIndex >= 0) {
            newLogs[existingLogIndex] = {
              ...newLogs[existingLogIndex],
              value
            };
          } else {
            newLogs.push({
              date: todayDate,
              value
            });
          }
          
          return {
            ...stat,
            currentValue: value,
            logs: newLogs
          };
        }
        return stat;
      });
    });
  };
  
  const updateWeeklyProgress = () => {
    setWeeklyProgress(prev => {
      const updatedProgress = [...prev];
      const todayIndex = updatedProgress.findIndex(day => day.date === todayDate);
      
      if (todayIndex >= 0) {
        updatedProgress[todayIndex] = {
          date: todayDate,
          habitCount: totalHabits,
          habitsCompleted: completedHabits,
          habitCompletionPercentage: todayProgress
        };
      }
      
      return updatedProgress;
    });
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'logs' | 'currentStreak' | 'longestStreak'>) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      logs: [],
      currentStreak: 0,
      longestStreak: 0
    };
    
    setHabits(prev => [...prev, newHabit]);
  };

  const addStat = (stat: Omit<PersonalStat, 'id' | 'logs'>) => {
    const newStat: PersonalStat = {
      ...stat,
      id: crypto.randomUUID(),
      logs: []
    };
    
    setPersonalStats(prev => [...prev, newStat]);
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    updateWeeklyProgress();
  };

  const deleteStat = (statId: string) => {
    setPersonalStats(prev => prev.filter(stat => stat.id !== statId));
  };
  
  const getHabit = (habitId: string) => habits.find(h => h.id === habitId);
  const getStat = (statId: string) => personalStats.find(s => s.id === statId);
  
  useEffect(() => {
    updateWeeklyProgress();
  }, [completedHabits, totalHabits]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  
  return (
    <HabitContext.Provider
      value={{
        habits,
        personalStats,
        weeklyProgress,
        todayProgress,
        updateHabitValue,
        updateStatValue,
        getHabit,
        getStat,
        totalHabits,
        completedHabits,
        addHabit,
        addStat,
        deleteHabit,
        deleteStat,
        theme,
        setTheme
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};