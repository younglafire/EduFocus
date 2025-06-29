import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Users, Star, Award, CheckCircle, Download, BookOpen, Target, Globe } from 'lucide-react';

// Mock course data - in real app, this would come from API
const getCourseById = (id: string) => {
  const courses = {
    '1': {
      id: '1',
      title: 'Lập trình Python từ cơ bản đến nâng cao',
      description: 'Khóa học toàn diện về Python, từ cú pháp cơ bản đến các framework phổ biến như Django và Flask. Bạn sẽ học được cách xây dựng ứng dụng web, xử lý dữ liệu và tự động hóa các tác vụ.',
      instructor: {
        name: 'Nguyễn Văn An',
        avatar: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: 'Senior Python Developer với 8+ năm kinh nghiệm tại các công ty công nghệ hàng đầu',
        rating: 4.9,
        students: 15000
      },
      duration: '40 giờ',
      students: 2847,
      rating: 4.8,
      price: 0,
      level: 'Cơ bản',
      category: 'Lập trình',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'Backend', 'Web Development'],
      lessons: 45,
      certificate: true,
      language: 'Tiếng Việt',
      lastUpdated: '2024-01-15',
      whatYouWillLearn: [
        'Nắm vững cú pháp Python từ cơ bản đến nâng cao',
        'Xây dựng ứng dụng web với Django và Flask',
        'Xử lý và phân tích dữ liệu với Pandas',
        'Tự động hóa các tác vụ hàng ngày',
        'Làm việc với cơ sở dữ liệu và API',
        'Best practices và clean code'
      ],
      curriculum: [
        {
          title: 'Giới thiệu Python',
          lessons: 8,
          duration: '4 giờ',
          topics: ['Cài đặt Python', 'IDE và môi trường', 'Cú pháp cơ bản', 'Biến và kiểu dữ liệu']
        },
        {
          title: 'Cấu trúc dữ liệu',
          lessons: 10,
          duration: '6 giờ',
          topics: ['Lists và Tuples', 'Dictionaries', 'Sets', 'String manipulation']
        },
        {
          title: 'Lập trình hướng đối tượng',
          lessons: 12,
          duration: '8 giờ',
          topics: ['Classes và Objects', 'Inheritance', 'Polymorphism', 'Encapsulation']
        },
        {
          title: 'Web Development với Django',
          lessons: 15,
          duration: '12 giờ',
          topics: ['Django basics', 'Models và Database', 'Views và Templates', 'REST API']
        }
      ],
      requirements: [
        'Máy tính có kết nối internet',
        'Không cần kinh nghiệm lập trình trước đó',
        'Tinh thần học hỏi và kiên trì'
      ]
    }
  };
  
  return courses[id as keyof typeof courses] || null;
};

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const course = getCourseById(id || '');

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Không tìm thấy khóa học
          </h1>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách khóa học
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Course Info */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
                {course.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-inter leading-relaxed">
                {course.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-2 mx-auto">
                    <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{course.rating}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Đánh giá</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl mb-2 mx-auto">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{course.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Học viên</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-2 mx-auto">
                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{course.duration}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Thời lượng</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl mb-2 mx-auto">
                    <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{course.lessons}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Bài học</div>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 font-poppins">
                    {formatPrice(course.price)}
                  </div>
                  {course.price > 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Thanh toán một lần
                    </div>
                  )}
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-poppins">
                  Bắt đầu học ngay
                </button>
              </div>
            </div>

            {/* Right - Course Image */}
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* What You'll Learn */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-poppins flex items-center">
                <Target className="h-6 w-6 text-blue-600 mr-3" />
                Bạn sẽ học được gì?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-inter">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-poppins flex items-center">
                <BookOpen className="h-6 w-6 text-purple-600 mr-3" />
                Nội dung khóa học
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((section, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins">
                        {section.title}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                        {section.lessons} bài • {section.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {section.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full font-inter"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-poppins">
                Yêu cầu
              </h2>
              <ul className="space-y-3">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-inter">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Instructor */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-poppins">
                Giảng viên
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white font-poppins">
                    {course.instructor.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{course.instructor.rating}</span>
                    <span>•</span>
                    <span>{course.instructor.students.toLocaleString()} học viên</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-inter">
                {course.instructor.bio}
              </p>
            </div>

            {/* Course Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-poppins">
                Thông tin khóa học
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-inter">Ngôn ngữ:</span>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-white font-inter">{course.language}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-inter">Chứng chỉ:</span>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-green-500" />
                    <span className="text-gray-900 dark:text-white font-inter">
                      {course.certificate ? 'Có' : 'Không'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-inter">Cập nhật:</span>
                  <span className="text-gray-900 dark:text-white font-inter">
                    {new Date(course.lastUpdated).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-poppins">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-inter"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;