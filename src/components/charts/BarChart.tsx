import React from 'react';
import { getDayOfWeek } from '../../utils/dateUtils';

interface BarChartProps {
  data: { date: string; value: number }[];
  maxValue?: number;
  color?: string;
  className?: string;
  showLabels?: boolean;
  animate?: boolean;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  color = '#3B82F6',
  className = '',
  showLabels = true,
  animate = true,
  height = 150,
}) => {
  const highestValue = maxValue || Math.max(...data.map(item => item.value), 1);
  
  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      <div className="flex h-full items-end justify-between">
        {data.map((item, index) => {
          const percentage = (item.value / highestValue) * 100;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center justify-end w-full mx-0.5"
            >
              <div 
                style={{ 
                  height: `${percentage}%`,
                  backgroundColor: color,
                  maxHeight: '100%',
                  transition: animate ? 'height 0.5s ease-out' : 'none',
                }}
                className="w-full rounded-t-sm"
              />
              {showLabels && (
                <div className="text-xs text-gray-500 mt-1 font-medium">
                  {getDayOfWeek(item.date)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;