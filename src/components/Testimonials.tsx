import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Sinh viên năm 3',
    school: 'ĐH Bách Khoa Hà Nội',
    avatar: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Studytools đã thay đổi hoàn toàn cách tôi học tập. Từ một sinh viên bình thường, giờ tôi đã có GPA 3.8 và tự tin hơn rất nhiều trong việc học.',
    rating: 5,
    achievement: 'Tăng GPA từ 2.5 lên 3.8',
    achievementColor: 'bg-blue-500'
  },
  {
    name: 'Trần Hoàng Nam',
    role: 'Sinh viên năm 4',
    school: 'ĐH Kinh tế Quốc dân',
    avatar: 'https://images.pexels.com/photos/8199565/pexels-photo-8199565.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Cộng đồng học tập ở đây thật sự tuyệt vời! Tôi đã tìm được nhóm học cùng và cùng nhau vượt qua kỳ thi khó khăn nhất. Giờ tôi đã có việc làm mơ ước.',
    rating: 5,
    achievement: 'Nhận offer từ 3 công ty lớn',
    achievementColor: 'bg-green-500'
  },
  {
    name: 'Lê Thị Hương',
    role: 'Sinh viên năm 2',
    school: 'ĐH Ngoại Thương',
    avatar: 'https://images.pexels.com/photos/8199563/pexels-photo-8199563.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Pomodoro Timer và các công cụ học tập thông minh giúp tôi tập trung hơn 300%. Tôi có thể học 8 tiếng mà không cảm thấy mệt mỏi như trước.',
    rating: 5,
    achievement: 'Tăng hiệu suất học 300%',
    achievementColor: 'bg-purple-500'
  },
  {
    name: 'Phạm Đức Minh',
    role: 'Thạc sĩ',
    school: 'ĐH Quốc gia Hà Nội',
    avatar: 'https://images.pexels.com/photos/8199564/pexels-photo-8199564.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'AI của Studytools đã giúp tôi tìm ra phương pháp học phù hợp nhất. Thời gian chuẩn bị luận văn giảm từ 8 tháng xuống chỉ còn 4 tháng.',
    rating: 5,
    achievement: 'Hoàn thành luận văn sớm 4 tháng',
    achievementColor: 'bg-orange-500'
  },
  {
    name: 'Vũ Thu Trang',
    role: 'Sinh viên năm 1',
    school: 'ĐH Y Hà Nội',
    avatar: 'https://images.pexels.com/photos/8199566/pexels-photo-8199566.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Là sinh viên năm nhất, tôi rất lo lắng về việc học đại học. Studytools đã giúp tôi thích nghi nhanh chóng và đạt học bổng toàn phần.',
    rating: 5,
    achievement: 'Đạt học bổng toàn phần',
    achievementColor: 'bg-pink-500'
  },
  {
    name: 'Ngô Văn Đức',
    role: 'Sinh viên năm 3',
    school: 'ĐH Công nghệ',
    avatar: 'https://images.pexels.com/photos/8199567/pexels-photo-8199567.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Nhờ Studytools, tôi đã tự học được 5 ngôn ngữ lập trình và nhận được internship tại Google. Đây thực sự là bước ngoặt trong cuộc đời tôi.',
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
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-be-vietnam">
            Sinh viên nói gì về <span className="text-blue-600">Studytools?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            Hàng nghìn sinh viên đã thay đổi cuộc đời và đạt được ước mơ nhờ Studytools
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
                <span className="text-2xl font-bold text-gray-900 font-be-vietnam">5.0</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic font-nunito">
                "{testimonial.quote}"
              </blockquote>

              {/* Achievement Badge */}
              <div className={`inline-flex items-center px-3 py-1 ${testimonial.achievementColor} text-white rounded-full text-sm font-medium mb-4 font-nunito`}>
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
                  <h4 className="font-bold text-gray-900 font-be-vietnam">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm font-nunito">
                    {testimonial.role}
                  </p>
                  <p className="text-blue-600 text-sm font-medium font-nunito">
                    {testimonial.school}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-be-vietnam">
            Bạn cũng muốn có câu chuyện thành công như vậy?
          </h3>
          <p className="text-gray-600 mb-8 font-nunito">
            Hãy bắt đầu hành trình học tập của bạn ngay hôm nay
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors font-be-vietnam">
            Bắt đầu miễn phí
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;