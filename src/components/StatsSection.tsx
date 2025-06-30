import React from 'react';
import { Users, BookOpen, Award, Zap } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Sinh viên đang học'
    },
    {
      icon: BookOpen,
      number: '1,000+',
      label: 'Khóa học chất lượng'
    },
    {
      icon: Award,
      number: '98%',
      label: 'Tỷ lệ hài lòng'
    },
    {
      icon: Zap,
      number: '300%',
      label: 'Tăng hiệu quả học'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-be-vietnam">
            Con số nói lên <span className="text-blue-600">tất cả</span>
          </h2>
          <p className="text-xl text-gray-600 font-nunito">
            EduFocus đã tạo ra những thay đổi tích cực cho hàng nghìn sinh viên
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2 font-be-vietnam">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium font-nunito">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;