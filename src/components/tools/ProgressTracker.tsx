import React, { useEffect, useState } from 'react';
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StudySession {
  date: string;
  duration: number; // in minutes
  subject?: string;
}

const ProgressTracker: React.FC = () => {
  const [studySessions, setStudySessions] = useLocalStorage<StudySession[]>('study-sessions', []);
  const [newDuration, setNewDuration] = useState('');
  const [newSubject, setNewSubject] = useState('');

  const addSession = () => {
    const duration = parseInt(newDuration);
    if (duration > 0) {
      const session: StudySession = {
        date: new Date().toISOString().split('T')[0],
        duration,
        subject: newSubject.trim() || 'Học tập chung'
      };
      setStudySessions(prev => [...prev, session]);
      setNewDuration('');
      setNewSubject('');
    }
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const getDailyStudyTime = () => {
    const last7Days = getLast7Days();
    return last7Days.map(date => {
      const sessionsForDate = studySessions.filter(session => session.date === date);
      return sessionsForDate.reduce((total, session) => total + session.duration, 0);
    });
  };

  const getTotalStudyTime = () => {
    return studySessions.reduce((total, session) => total + session.duration, 0);
  };

  const getAverageStudyTime = () => {
    const dailyTimes = getDailyStudyTime();
    const totalDays = dailyTimes.filter(time => time > 0).length;
    return totalDays > 0 ? getTotalStudyTime() / totalDays : 0;
  };

  const chartData = {
    labels: getLast7Days().map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Thời gian học (phút)',
        data: getDailyStudyTime(),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + ' phút';
          }
        }
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Theo dõi tiến độ học
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Tổng thời gian</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {Math.floor(getTotalStudyTime() / 60)}h {getTotalStudyTime() % 60}m
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Trung bình/ngày</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {Math.round(getAverageStudyTime())} phút
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Phiên học</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {studySessions.length}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Thời gian học 7 ngày qua
        </h4>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Thêm phiên học mới
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            placeholder="Thời gian (phút)"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            min="1"
          />
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Môn học (tùy chọn)"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={addSession}
            disabled={!newDuration || parseInt(newDuration) <= 0}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;