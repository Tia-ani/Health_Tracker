import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';
import { Droplet, Dumbbell, BookOpen, Brain, Heart, Music, Pencil, Code, Coffee, Bike, Cog as Yoga, Radiation as Meditation } from 'lucide-react';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICONS = {
  Droplet,
  Dumbbell,
  BookOpen,
  Brain,
  Heart,
  Music,
  Pencil,
  Code,
  Coffee,
  Bike,
  Yoga,
  Meditation
};

const ICON_OPTIONS = [
  'Droplet', 'Dumbbell', 'BookOpen', 'Brain', 'Heart', 'Music', 
  'Pencil', 'Code', 'Coffee', 'Bike', 'Yoga', 'Meditation'
];

const COLOR_OPTIONS = [
  '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B', 
  '#EF4444', '#06B6D4', '#14B8A6', '#6366F1'
];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabits();
  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Droplet');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [target, setTarget] = useState(1);
  const [unit, setUnit] = useState('times');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addHabit({
      name: habitName,
      icon: selectedIcon,
      target,
      unit,
      frequency: 'daily',
      color: selectedColor
    });
    
    onClose();
    setHabitName('');
    setSelectedIcon('Droplet');
    setSelectedColor('#3B82F6');
    setTarget(1);
    setUnit('times');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Habit</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Habit Name
            </label>
            <input
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {ICON_OPTIONS.map(icon => {
                const IconComponent = ICONS[icon as keyof typeof ICONS];
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex space-x-2">
              {COLOR_OPTIONS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${
                    selectedColor === color ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daily Target
              </label>
              <input
                type="number"
                min="1"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
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
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;