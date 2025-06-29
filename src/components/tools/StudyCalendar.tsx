import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
  color: string;
}

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-pink-500'
];

const StudyCalendar: React.FC = () => {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('study-calendar', []);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    description: ''
  });

  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.time) return;

    if (editingEvent) {
      setEvents(prev => prev.map(event =>
        event.id === editingEvent.id
          ? { ...event, ...formData }
          : event
      ));
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        date: selectedDate,
        color: colors[Math.floor(Math.random() * colors.length)],
        ...formData
      };
      setEvents(prev => [...prev, newEvent]);
    }

    setFormData({ title: '', time: '', description: '' });
    setShowForm(false);
    setEditingEvent(null);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const startEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      time: event.time,
      description: event.description || ''
    });
    setShowForm(true);
  };

  const weekDays = getCurrentWeekDays();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Lịch học tuần
          </h3>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm sự kiện</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        
        {weekDays.map((date, index) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayEvents = getEventsForDate(dateStr);
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;

          return (
            <div
              key={index}
              onClick={() => setSelectedDate(dateStr)}
              className={`p-2 rounded-lg cursor-pointer border-2 transition-colors min-h-[80px] ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : isToday
                  ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
              }`}>
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs px-1 py-0.5 rounded text-white truncate ${event.color}`}
                    title={`${event.time} - ${event.title}`}
                  >
                    {event.time.slice(0, 5)}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500">+{dayEvents.length - 2}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t dark:border-gray-700 pt-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Sự kiện ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {getEventsForDate(selectedDate).map(event => (
            <div
              key={event.id}
              className={`p-3 rounded-lg text-white flex items-center justify-between ${event.color}`}
            >
              <div className="flex-1">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm opacity-90">{event.time}</div>
                {event.description && (
                  <div className="text-sm opacity-75 mt-1">{event.description}</div>
                )}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => startEdit(event)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {getEventsForDate(selectedDate).length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              Không có sự kiện nào trong ngày này
            </p>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingEvent ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Thời gian
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mô tả (tùy chọn)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-20 resize-none"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingEvent ? 'Cập nhật' : 'Thêm'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                    setFormData({ title: '', time: '', description: '' });
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyCalendar;