import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6 text-sm font-medium">
            <span>🎬 Video Demo</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-poppins">
            Khám phá <span className="text-blue-600">EduFocus</span> trong 2 phút
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
            Xem cách EduFocus giúp hàng nghìn sinh viên học tập hiệu quả
          </p>
        </div>

        {/* Simple Video Container */}
        <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
          {!isPlaying ? (
            <>
              {/* Video Thumbnail */}
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Video demo EduFocus"
                className="w-full h-full object-cover"
              />
              
              {/* Simple Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </button>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-sm font-semibold text-gray-900">Giới thiệu EduFocus 2024</div>
                <div className="text-xs text-gray-600">2:15 phút</div>
              </div>
            </>
          ) : (
            /* Simple Video Player */
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                <p>Đang tải video...</p>
              </div>
            </div>
          )}
        </div>

        {/* Simple Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Giao diện trực quan',
              description: 'Thiết kế hiện đại, dễ sử dụng'
            },
            {
              title: 'Tính năng thông minh',
              description: 'AI hỗ trợ học tập tự động'
            },
            {
              title: 'Hiệu quả chứng minh',
              description: 'Hàng nghìn sinh viên thành công'
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">{item.title}</h3>
              <p className="text-gray-600 font-inter">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;