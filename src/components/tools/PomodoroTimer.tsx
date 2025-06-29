import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for notification
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYeBHuN0fLXfS4FKoLU8teGOQgXaLnu4Z1WEwoHRqDg8L1nHgYcg8771XVXQhQdg8770HVXQhQadg8771nZXQhUe2P711VXEws');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Time's up!
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      
      if (isBreak) {
        // Break finished, start new work session
        setTimeLeft(25 * 60);
        setIsBreak(false);
        setSessions(prev => prev + 1);
      } else {
        // Work session finished, start break
        setTimeLeft(5 * 60);
        setIsBreak(true);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <Clock className="h-6 w-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Pomodoro Timer
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isBreak ? 'Giờ nghỉ ngơi' : 'Giờ học tập'}
        </p>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
            className={isBreak ? 'text-green-500' : 'text-primary-500'}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold ${isBreak ? 'text-green-600' : 'text-primary-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : isBreak
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
        >
          {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          <span>{isActive ? 'Tạm dừng' : 'Bắt đầu'}</span>
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Phiên đã hoàn thành: <span className="font-semibold text-primary-600">{sessions}</span>
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;