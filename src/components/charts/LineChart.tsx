import React from 'react';
import { getDayOfWeek } from '../../utils/dateUtils';

interface LineChartProps {
  data: { date: string; value: number }[];
  maxValue?: number;
  color?: string;
  className?: string;
  showLabels?: boolean;
  animate?: boolean;
  height?: number;
  showLine?: boolean;
  showPoints?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  maxValue,
  color = '#3B82F6',
  className = '',
  showLabels = true,
  animate = true,
  height = 150,
  showLine = true,
  showPoints = true,
}) => {
  if (!data.length) return null;
  
  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const highestValue = maxValue || Math.max(...sortedData.map(item => item.value), 1);
  const width = 100; // width percentage
  const chartWidth = width;
  const segmentWidth = chartWidth / (sortedData.length - 1);
  
  // Generate SVG path for the line
  let pathD = '';
  sortedData.forEach((item, index) => {
    const x = index * segmentWidth;
    const y = 100 - ((item.value / highestValue) * 100);
    
    if (index === 0) {
      pathD += `M ${x},${y} `;
    } else {
      pathD += `L ${x},${y} `;
    }
  });
  
  return (
    <div className={`w-full ${className}`}>
      <div 
        className="relative w-full" 
        style={{ height: `${height}px` }}
      >
        {/* SVG for the line */}
        {showLine && (
          <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${chartWidth} 100`}
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ 
                transition: animate ? 'all 0.5s ease-out' : 'none',
              }}
            />
          </svg>
        )}
        
        {/* Render data points */}
        {showPoints && (
          <div className="absolute inset-0 flex items-stretch justify-between">
            {sortedData.map((item, index) => {
              const percentage = (item.value / highestValue) * 100;
              
              return (
                <div 
                  key={index}
                  className="flex flex-col justify-end items-center relative"
                  style={{ width: `${100 / sortedData.length}%` }}
                >
                  <div 
                    className="w-2 h-2 rounded-full absolute"
                    style={{ 
                      backgroundColor: color,
                      bottom: `${percentage}%`,
                      transform: 'translate(-50%, 50%)',
                      transition: animate ? 'bottom 0.5s ease-out' : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        
        {/* X-axis labels */}
        {showLabels && (
          <div className="absolute bottom-0 inset-x-0 flex justify-between items-center">
            {sortedData.map((item, index) => (
              <div 
                key={index} 
                className="text-xs text-gray-500 text-center"
                style={{ width: `${100 / sortedData.length}%` }}
              >
                {getDayOfWeek(item.date)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;