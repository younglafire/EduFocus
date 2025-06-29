import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { getRandomQuote } from '../utils/quotes';

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const refreshQuote = () => {
    setQuote(getRandomQuote());
  };

  return (
    <div className="bg-gradient-to-r from-primary-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Câu nói truyền cảm hứng</h3>
        <button
          onClick={refreshQuote}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          title="Lấy câu nói khác"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <p className="text-lg italic font-medium">"{quote}"</p>
    </div>
  );
};

export default QuoteDisplay;