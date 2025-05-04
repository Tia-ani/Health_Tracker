export type Habit = {
  id: string;
  name: string;
  icon: string;
  target: number;
  unit: string;
  frequency: 'daily' | 'weekly';
  currentStreak: number;
  longestStreak: number;
  color: string;
  logs: HabitLog[];
};

export type HabitLog = {
  date: string;
  value: number;
  completed: boolean;
};

export type PersonalStat = {
  id: string;
  name: string;
  icon: string;
  currentValue: number;
  target: number;
  unit: string;
  logs: StatLog[];
};

export type StatLog = {
  date: string;
  value: number;
};

export type DailyProgress = {
  date: string;
  habitCompletionPercentage: number;
  habitCount: number;
  habitsCompleted: number;
};