import { Habit, PersonalStat, DailyProgress } from '../types';
import { addDays, format, subDays } from '../utils/dateUtils';

const today = new Date();

// Helper to generate random values between min and max
const randomBetween = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1) + min);

// Generate logs for the last 14 days
const generateLogs = (min: number, max: number, target: number, unit: string) => {
  const logs = [];
  for (let i = 13; i >= 0; i--) {
    const date = format(subDays(today, i));
    const value = randomBetween(min, max);
    logs.push({
      date,
      value,
      completed: value >= target
    });
  }
  return logs;
};

const generateStatLogs = (min: number, max: number) => {
  const logs = [];
  for (let i = 13; i >= 0; i--) {
    const date = format(subDays(today, i));
    logs.push({
      date,
      value: randomBetween(min, max)
    });
  }
  return logs;
};

export const habits: Habit[] = [
  {
    id: '1',
    name: 'Water Intake',
    icon: 'droplet',
    target: 8,
    unit: 'glasses',
    frequency: 'daily',
    currentStreak: 5,
    longestStreak: 12,
    color: '#3B82F6',
    logs: generateLogs(5, 10, 8, 'glasses')
  },
  {
    id: '2',
    name: 'Exercise',
    icon: 'dumbbell',
    target: 30,
    unit: 'minutes',
    frequency: 'daily',
    currentStreak: 3,
    longestStreak: 14,
    color: '#10B981',
    logs: generateLogs(0, 60, 30, 'minutes')
  },
  {
    id: '3',
    name: 'Reading',
    icon: 'book-open',
    target: 20,
    unit: 'minutes',
    frequency: 'daily',
    currentStreak: 7,
    longestStreak: 21,
    color: '#8B5CF6',
    logs: generateLogs(0, 45, 20, 'minutes')
  },
  {
    id: '4',
    name: 'Meditation',
    icon: 'brain',
    target: 10,
    unit: 'minutes',
    frequency: 'daily',
    currentStreak: 2,
    longestStreak: 8,
    color: '#EC4899',
    logs: generateLogs(0, 15, 10, 'minutes')
  }
];

export const personalStats: PersonalStat[] = [
  {
    id: '1',
    name: 'Sleep',
    icon: 'moon',
    currentValue: 7.5,
    target: 8,
    unit: 'hours',
    logs: generateStatLogs(5, 9).map(log => ({
      date: log.date,
      value: log.value + Math.random()
    }))
  },
  {
    id: '2',
    name: 'Screen Time',
    icon: 'smartphone',
    currentValue: 3.2,
    target: 2,
    unit: 'hours',
    logs: generateStatLogs(1, 5).map(log => ({
      date: log.date,
      value: log.value + Math.random()
    }))
  },
  {
    id: '3',
    name: 'Steps',
    icon: 'footprints',
    currentValue: 8200,
    target: 10000,
    unit: 'steps',
    logs: generateStatLogs(5000, 12000)
  }
];

export const weeklyProgress: DailyProgress[] = Array.from({ length: 7 }).map((_, index) => {
  const date = format(subDays(today, 6 - index));
  const habitCount = habits.length;
  const habitsCompleted = randomBetween(1, habitCount);
  
  return {
    date,
    habitCompletionPercentage: Math.round((habitsCompleted / habitCount) * 100),
    habitCount,
    habitsCompleted
  };
});