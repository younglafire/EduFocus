import React from 'react';
import { BookOpen, Brain, Users, Trophy, Clock, Target } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Thư viện khóa học khổng lồ',
    description: 'Hơn 1000+ khóa học từ cơ bản đến nâng cao, được cập nhật liên tục bởi các chuyên gia hàng đầu',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Brain,
    title: 'AI học tập thông minh',
    description: 'Trí tuệ nhân tạo phân tích phong cách học và đề xuất lộ trình cá nhân hóa phù hợp nhất',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Users,
    title: 'Cộng đồng 50K+ sinh viên',
    description: 'Kết nối với cộng đồng học tập năng động, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau 24/7',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Trophy,
    title: 'Chứng chỉ được công nhận',
    description: 'Nhận chứng chỉ có giá trị từ các đối tác uy tín, nâng cao CV và cơ hội nghề nghiệp',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Clock,
    title: 'Học mọi lúc mọi nơi',
    description: 'Truy cập 24/7 trên mọi thiết bị, tải offline và đồng bộ tiến độ tự động',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Target,
    title: 'Theo dõi tiến độ chi tiết',
    description: 'Dashboard thông minh với biểu đồ trực quan, báo cáo tiến độ và đề xuất cải thiện',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6 text-sm font-medium">
            <span>✨ Tính năng vượt trội</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-be-vietnam">
            Tại sao chọn <span className="text-blue-600">EduFocus?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            Chúng tôi mang đến trải nghiệm học tập hoàn toàn mới với công nghệ tiên tiến 
            và phương pháp giảng dạy hiệu quả nhất
          </p>
        </div>

        {/* Simple Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Feature Image */}
              <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-be-vietnam">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-nunito">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors font-be-vietnam">
            Trải nghiệm ngay
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;