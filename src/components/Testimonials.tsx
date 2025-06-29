import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Sinh viên năm 3',
    school: 'ĐH Bách Khoa Hà Nội',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'EduFocus đã thay đổi hoàn toàn cách tôi học tập. Từ một sinh viên bình thường, giờ tôi đã có GPA 3.8 và tự tin hơn rất nhiều trong việc học.',
    rating: 5,
    achievement: 'Tăng GPA từ 2.5 lên 3.8',
    achievementColor: 'bg-blue-500'
  },
  {
    name: 'Trần Hoàng Nam',
    role: 'Sinh viên năm 4',
    school: 'ĐH Kinh tế Quốc dân',
    avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Cộng đồng học tập ở đây thật sự tuyệt vời! Tôi đã tìm được nhóm học cùng và cùng nhau vượt qua kỳ thi khó khăn nhất. Giờ tôi đã có việc làm mơ ước.',
    rating: 5,
    achievement: 'Nhận offer từ 3 công ty lớn',
    achievementColor: 'bg-green-500'
  },
  {
    name: 'Lê Thị Hương',
    role: 'Sinh viên năm 2',
    school: 'ĐH Ngoại Thương',
    avatar: 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Pomodoro Timer và các công cụ học tập thông minh giúp tôi tập trung hơn 300%. Tôi có thể học 8 tiếng mà không cảm thấy mệt mỏi như trước.',
    rating: 5,
    achievement: 'Tăng hiệu suất học 300%',
    achievementColor: 'bg-purple-500'
  },
  {
    name: 'Phạm Đức Minh',
    role: 'Thạc sĩ',
    school: 'ĐH Quốc gia Hà Nội',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'AI của EduFocus đã giúp tôi tìm ra phương pháp học phù hợp nhất. Thời gian chuẩn bị luận văn giảm từ 8 tháng xuống chỉ còn 4 tháng.',
    rating: 5,
    achievement: 'Hoàn thành luận văn sớm 4 tháng',
    achievementColor: 'bg-orange-500'
  },
  {
    name: 'Vũ Thu Trang',
    role: 'Sinh viên năm 1',
    school: 'ĐH Y Hà Nội',
    avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Là sinh viên năm nhất, tôi rất lo lắng về việc học đại học. EduFocus đã giúp tôi thích nghi nhanh chóng và đạt học bổng toàn phần.',
    rating: 5,
    achievement: 'Đạt học bổng toàn phần',
    achievementColor: 'bg-pink-500'
  },
  {
    name: 'Ngô Văn Đức',
    role: 'Sinh viên năm 3',
    school: 'ĐH Công nghệ',
    avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Nhờ EduFocus, tôi đã tự học được 5 ngôn ngữ lập trình và nhận được internship tại Google. Đây thực sự là bước ngoặt trong cuộc đời tôi.',
    rating: 5,
    achievement: 'Internship tại Google',
    achievementColor: 'bg-indigo-500'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6 text-sm font-medium">
            <span>⭐ Câu chuyện thành công</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-poppins">
            Sinh viên nói gì về <span className="text-blue-600">EduFocus?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Hàng nghìn sinh viên đã thay đổi cuộc đời và đạt được ước mơ nhờ EduFocus
          </p>
        </div>

        {/* Simple Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">5.0</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic font-inter">
                "{testimonial.quote}"
              </blockquote>

              {/* Achievement Badge */}
              <div className={`inline-flex items-center px-3 py-1 ${testimonial.achievementColor} text-white rounded-full text-sm font-medium mb-4`}>
                <span>{testimonial.achievement}</span>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 font-poppins">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm font-inter">
                    {testimonial.role}
                  </p>
                  <p className="text-blue-600 text-sm font-medium font-inter">
                    {testimonial.school}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
            Bạn cũng muốn có câu chuyện thành công như vậy?
          </h3>
          <p className="text-gray-600 mb-8 font-inter">
            Hãy bắt đầu hành trình học tập của bạn ngay hôm nay
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors font-poppins">
            Bắt đầu miễn phí
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;