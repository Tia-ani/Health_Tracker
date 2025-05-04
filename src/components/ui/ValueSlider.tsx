import React, { useState, useEffect } from 'react';

interface ValueSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  color?: string;
  className?: string;
  showButtons?: boolean;
}

const ValueSlider: React.FC<ValueSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = '',
  color = '#3B82F6',
  className = '',
  showButtons = true,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);
    onChange(newValue);
  };
  
  const handleIncrement = () => {
    const newValue = Math.min(currentValue + step, max);
    setCurrentValue(newValue);
    onChange(newValue);
  };
  
  const handleDecrement = () => {
    const newValue = Math.max(currentValue - step, min);
    setCurrentValue(newValue);
    onChange(newValue);
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {currentValue} {unit}
        </span>
      </div>
      
      <div className="flex items-center">
        {showButtons && (
          <button 
            onClick={handleDecrement}
            disabled={currentValue <= min}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            -
          </button>
        )}
        
        <div className="flex-grow mx-2">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{ 
              '--range-color': color,
              background: `linear-gradient(to right, ${color} 0%, ${color} ${(currentValue - min) / (max - min) * 100}%, #e5e7eb ${(currentValue - min) / (max - min) * 100}%, #e5e7eb 100%)`,
            } as React.CSSProperties}
          />
        </div>
        
        {showButtons && (
          <button 
            onClick={handleIncrement}
            disabled={currentValue >= max}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default ValueSlider;