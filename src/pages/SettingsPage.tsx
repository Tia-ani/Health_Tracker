import React from 'react';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import { Bell, Moon, Shield, Clock, Save } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useHabits();
  const [accentColor, setAccentColor] = React.useState('#3B82F6');

  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Yellow', value: '#F59E0B' }
  ];

  const handleColorChange = (color: string) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--accent-color', color);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardTitle className="flex items-center">
            <Bell size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
            Notifications
          </CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Daily Reminders</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Receive a notification to check in daily</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Missed Check-ins</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Get notified when you miss a habit</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Summary</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Receive weekly progress reports</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle className="flex items-center">
            <Shield size={18} className="text-teal-600 dark:text-teal-400 mr-2" />
            Privacy
          </CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Store Data Locally</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Keep all data on your device only</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Usage Analytics</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Share anonymous usage data</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
            
            <button className="mt-6 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full">
              Export My Data
            </button>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle className="flex items-center">
            <Moon size={18} className="text-purple-600 dark:text-purple-400 mr-2" />
            Appearance
          </CardTitle>
          <CardContent className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <select 
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-300 dark:focus:border-purple-600 focus:ring focus:ring-purple-200 dark:focus:ring-purple-800 focus:ring-opacity-50"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Accent
              </label>
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange(color.value)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      accentColor === color.value 
                        ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800' 
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle className="flex items-center">
            <Clock size={18} className="text-orange-600 dark:text-orange-400 mr-2" />
            Check-in Reminder
          </CardTitle>
          <CardContent className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Check-in Time
              </label>
              <select 
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-orange-300 dark:focus:border-orange-600 focus:ring focus:ring-orange-200 dark:focus:ring-orange-800 focus:ring-opacity-50"
                defaultValue="evening"
              >
                <option value="morning">Morning (8:00 AM)</option>
                <option value="afternoon">Afternoon (2:00 PM)</option>
                <option value="evening">Evening (8:00 PM)</option>
                <option value="custom">Custom Time</option>
              </select>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg flex justify-center items-center transition-colors">
                <Save size={16} className="mr-2" />
                Save Preferences
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;