import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import StatCard from '../components/stats/StatCard';
import AddStatModal from '../components/stats/AddStatModal';
import { Plus } from 'lucide-react';

const StatsPage: React.FC = () => {
  const { personalStats, updateStatValue, deleteStat } = useHabits();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Personal Stats</h1>
        
        <button 
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Stat
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {personalStats.map(stat => (
          <StatCard 
            key={stat.id} 
            stat={stat} 
            onUpdate={updateStatValue}
            onDelete={deleteStat}
          />
        ))}
      </div>

      <AddStatModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default StatsPage