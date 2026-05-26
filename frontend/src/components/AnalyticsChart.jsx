'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

// Register Chart.js models
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsChart({ type = 'bar', data, options }) {
  // Chart theme defaults for premium dark mode
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8', // text-dark-400
          font: {
            family: 'Inter',
            size: 11,
          },
          usePointStyle: true,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#0f172a', // text-dark-900
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          color: 'rgba(51, 65, 85, 0.2)', // grid lines color
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(51, 65, 85, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 10,
          },
        },
      },
    } : undefined,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="h-64 sm:h-80 w-full relative">
      {type === 'doughnut' && <Doughnut data={data} options={mergedOptions} />}
      {type === 'bar' && <Bar data={data} options={mergedOptions} />}
      {type === 'line' && <Line data={data} options={mergedOptions} />}
    </div>
  );
}
