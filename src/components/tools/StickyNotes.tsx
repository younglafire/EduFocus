import React, { useState } from 'react';
import { Plus, X, Edit3 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Note {
  id: string;
  content: string;
  color: string;
  createdAt: Date;
}

const colors = [
  'bg-yellow-200 border-yellow-300',
  'bg-pink-200 border-pink-300',
  'bg-blue-200 border-blue-300',
  'bg-green-200 border-green-300',
  'bg-purple-200 border-purple-300',
  'bg-orange-200 border-orange-300'
];

const StickyNotes: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('sticky-notes', []);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: new Date()
      };
      setNotes(prev => [...prev, note]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const updateNote = (id: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content } : note
    ));
    setEditingId(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addNote();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Edit3 className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Ghi chú nhanh
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {notes.length} ghi chú
        </span>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập ghi chú mới... (Ctrl + Enter để thêm)"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none h-20 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg border-2 ${note.color} relative group shadow-sm hover:shadow-md transition-shadow`}
          >
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
            >
              <X className="h-3 w-3" />
            </button>
            
            {editingId === note.id ? (
              <textarea
                defaultValue={note.content}
                onBlur={(e) => updateNote(note.id, e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    updateNote(note.id, e.currentTarget.value);
                  }
                }}
                className="w-full bg-transparent resize-none border-none outline-none text-gray-800"
                autoFocus
              />
            ) : (
              <p
                onClick={() => setEditingId(note.id)}
                className="text-gray-800 cursor-pointer whitespace-pre-wrap break-words"
              >
                {note.content}
              </p>
            )}
            
            <div className="mt-2 text-xs text-gray-600">
              {new Date(note.createdAt).toLocaleDateString('vi-VN')}
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <Edit3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Chưa có ghi chú nào. Thêm ghi chú đầu tiên của bạn!</p>
        </div>
      )}
    </div>
  );
};

export default StickyNotes;