import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';
import * as Icons from 'lucide-react';

interface AddStatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_OPTIONS = [
  'Moon', 'Smartphone', 'Footprints', 'Heart', 'Scale', 
  'Coffee', 'Battery', 'Timer', 'Activity', 'Gauge'
];

const AddStatModal: React.FC<AddStatModalProps> = ({ isOpen, onClose }) => {
  const { addStat } = useHabits();
  const [statName, setStatName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Activity');
  const [currentValue, setCurrentValue] = useState(0);
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addStat({
      name: statName,
      icon: selectedIcon,
      currentValue,
      target,
      unit
    });
    
    onClose();
    setStatName('');
    setSelectedIcon('Activity');
    setCurrentValue(0);
    setTarget(0);
    setUnit('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Stat</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stat Name
            </label>
            <input
              type="text"
              value={statName}
              onChange={(e) => setStatName(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {ICON_OPTIONS.map(icon => {
                const IconComponent = (Icons as any)[icon];
                return (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`p-2 rounded-lg ${
                      selectedIcon === icon 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent size={20} />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Value
              </label>
              <input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Value
              </label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Stat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStatModal;