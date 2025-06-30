import React from 'react';
import { ArrowRight, Play, BookOpen, Users, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate('/tools');
    } else {
      navigate('/register');
    }
  };

  const handleWatchDemo = () => {
    // Scroll to video demo section or open modal
    const videoSection = document.getElementById('video-demo');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-left animate-fade-in-up">
            {/* Simple Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-8 text-sm font-medium">
              <span>🚀 Nền tảng học tập #1 Việt Nam</span>
            </div>

            {/* Clean Typography */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-be-vietnam leading-tight mb-8 text-gray-900 dark:text-gray-800">
              Học tập
              <br />
              <span className="text-blue-600">thông minh</span>
              <br />
              Thành công
              <br />
              <span className="text-blue-500">rực rỡ!</span>
            </h1>

            {/* Simple Description */}
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl font-nunito">
              Khám phá nền tảng học tập hiện đại với AI thông minh, giúp 
              <span className="font-semibold text-blue-600"> 50,000+ sinh viên</span> tăng hiệu quả học 
              <span className="font-semibold text-blue-600"> 300%</span>
            </p>

            {/* Clean CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleStartLearning}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors font-be-vietnam flex items-center justify-center"
              >
                <span>{isAuthenticated ? 'Vào học ngay' : 'Bắt đầu miễn phí'}</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              
              <button 
                onClick={handleWatchDemo}
                className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors font-be-vietnam flex items-center justify-center"
              >
                <Play className="h-5 w-5 mr-2" />
                <span>Xem Demo</span>
              </button>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { icon: Users, number: '50K+', label: 'Sinh viên' },
                { icon: BookOpen, number: '1000+', label: 'Khóa học' },
                { icon: Star, number: '4.9/5', label: 'Đánh giá' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1 font-be-vietnam">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium font-nunito">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Simple Image */}
          <div className="relative animate-fade-in-right">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-4">
                <img
                  src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sinh viên Việt Nam học tập thông minh"
                  className="w-full h-auto rounded-xl"
                />
                
                {/* Simple Floating Cards */}
                <div className="absolute top-6 left-6 bg-white p-3 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 font-nunito">Đang học online</span>
                  </div>
                </div>

                <div className="absolute top-6 right-6 bg-white p-3 rounded-lg shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 font-be-vietnam">4.9⭐</div>
                    <div className="text-xs text-gray-600 font-nunito">Đánh giá</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <div>
                      <div className="text-sm font-semibold text-gray-700 font-be-vietnam">+25 điểm</div>
                      <div className="text-xs text-gray-500 font-nunito">Tiến bộ hôm nay</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Course Categories */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-be-vietnam">
              Khám phá các lĩnh vực học tập
            </h3>
            <p className="text-gray-600 font-nunito">
              Từ lập trình đến kỹ năng mềm, chúng tôi có tất cả
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Lập trình', icon: '💻', students: '15K+' },
              { name: 'Thiết kế', icon: '🎨', students: '8K+' },
              { name: 'Kinh doanh', icon: '📊', students: '12K+' },
              { name: 'Ngôn ngữ', icon: '🌍', students: '10K+' }
            ].map((category, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h4 className="text-gray-900 font-semibold text-lg mb-2 font-be-vietnam">{category.name}</h4>
                <p className="text-gray-600 text-sm font-nunito">{category.students} sinh viên</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;