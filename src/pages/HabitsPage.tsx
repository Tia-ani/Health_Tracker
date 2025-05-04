import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import HabitCard from '../components/habits/HabitCard';
import AddHabitModal from '../components/habits/AddHabitModal';
import { Plus } from 'lucide-react';

const HabitsPage: React.FC = () => {
  const { habits, updateHabitValue, deleteHabit } = useHabits();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Habits</h1>
        
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Habit
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {habits.map(habit => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            onUpdate={updateHabitValue}
            onDelete={deleteHabit}
          />
        ))}
      </div>

      <AddHabitModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default HabitsPage