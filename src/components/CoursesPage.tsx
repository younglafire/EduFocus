import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, Filter, Search, Play, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  category: string;
  image: string;
  tags: string[];
  lessons: number;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Lập trình Python từ cơ bản đến nâng cao',
    description: 'Khóa học toàn diện về Python, từ cú pháp cơ bản đến các framework phổ biến như Django và Flask.',
    instructor: 'Nguyễn Văn An',
    duration: '40 giờ',
    students: 2847,
    rating: 4.8,
    price: 0,
    level: 'Cơ bản',
    category: 'Lập trình',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Python', 'Backend', 'Web Development'],
    lessons: 45
  },
  {
    id: '2',
    title: 'Tiếng Anh giao tiếp cho sinh viên',
    description: 'Nâng cao kỹ năng giao tiếp tiếng Anh trong môi trường học tập và công việc.',
    instructor: 'Sarah Johnson',
    duration: '30 giờ',
    students: 1923,
    rating: 4.9,
    price: 299000,
    level: 'Trung cấp',
    category: 'Ngoại ngữ',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['English', 'Communication', 'Speaking'],
    lessons: 32
  },
  {
    id: '3',
    title: 'Thiết kế UI/UX hiện đại',
    description: 'Học cách thiết kế giao diện người dùng đẹp mắt và trải nghiệm người dùng tối ưu.',
    instructor: 'Trần Thị Hoa',
    duration: '35 giờ',
    students: 1456,
    rating: 4.7,
    price: 499000,
    level: 'Trung cấp',
    category: 'Thiết kế',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['UI/UX', 'Design', 'Figma'],
    lessons: 38
  },
  {
    id: '4',
    title: 'Marketing số cho người mới bắt đầu',
    description: 'Khám phá thế giới marketing số, từ SEO, SEM đến social media marketing.',
    instructor: 'Lê Minh Tuấn',
    duration: '25 giờ',
    students: 3241,
    rating: 4.6,
    price: 399000,
    level: 'Cơ bản',
    category: 'Marketing',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Digital Marketing', 'SEO', 'Social Media'],
    lessons: 28
  },
  {
    id: '5',
    title: 'Toán cao cấp cho kỹ sư',
    description: 'Nắm vững các khái niệm toán học cần thiết cho ngành kỹ thuật và công nghệ.',
    instructor: 'PGS.TS Phạm Văn Đức',
    duration: '50 giờ',
    students: 892,
    rating: 4.9,
    price: 0,
    level: 'Nâng cao',
    category: 'Toán học',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Mathematics', 'Engineering', 'Calculus'],
    lessons: 52
  },
  {
    id: '6',
    title: 'Kỹ năng mềm trong công việc',
    description: 'Phát triển các kỹ năng cần thiết để thành công trong môi trường làm việc hiện đại.',
    instructor: 'Nguyễn Thị Mai',
    duration: '20 giờ',
    students: 2156,
    rating: 4.8,
    price: 199000,
    level: 'Cơ bản',
    category: 'Kỹ năng mềm',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Soft Skills', 'Communication', 'Leadership'],
    lessons: 24
  }
];

const categories = ['Tất cả', 'Lập trình', 'Ngoại ngữ', 'Thiết kế', 'Marketing', 'Toán học', 'Kỹ năng mềm'];
const levels = ['Tất cả', 'Cơ bản', 'Trung cấp', 'Nâng cao'];

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedLevel, setSelectedLevel] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Tất cả' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleCourseClick = (courseId: string) => {
    if (isAuthenticated) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate('/login', { state: { from: { pathname: `/courses/${courseId}` } } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-700/50 rounded-full mb-8">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="text-blue-700 dark:text-blue-300 font-medium font-poppins">Khóa học chất lượng cao</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
            Khám phá{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x">
              1000+ khóa học
            </span>
            <br />
            chất lượng cao
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-inter">
            Từ lập trình, thiết kế đến kỹ năng mềm - tất cả đều có tại EduFocus với giảng viên hàng đầu
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-300 font-inter"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 font-poppins"
            >
              <Filter className="h-5 w-5" />
              <span>Bộ lọc</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-down">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Danh mục
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-inter ${
                          selectedCategory === category
                            ? 'bg-blue-500 text-white shadow-glow'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Cấp độ
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-inter ${
                          selectedLevel === level
                            ? 'bg-purple-500 text-white shadow-glow-purple'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-600 dark:text-gray-400 font-inter">
            Tìm thấy <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredCourses.length}</span> khóa học
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden animate-scale-in cursor-pointer"
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => handleCourseClick(course.id)}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Price badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold font-poppins ${
                  course.price === 0 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/90 text-gray-900'
                }`}>
                  {formatPrice(course.price)}
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </button>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Category and Level */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full font-inter">
                    {course.category}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full font-inter ${
                    course.level === 'Cơ bản' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    course.level === 'Trung cấp' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-poppins line-clamp-2">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 font-inter">
                  {course.description}
                </p>

                {/* Instructor */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-inter">
                  Giảng viên: <span className="font-medium">{course.instructor}</span>
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="font-inter">{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="font-inter">{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    <span className="font-semibold font-inter">{course.rating}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded font-inter"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group font-poppins">
                  <span className="mr-2">
                    {isAuthenticated ? 'Xem chi tiết' : 'Đăng nhập để xem'}
                  </span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
              Không tìm thấy khóa học nào
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-inter">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white animate-fade-in-up">
          <h3 className="text-3xl font-bold mb-4 font-poppins">
            Không tìm thấy khóa học phù hợp?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-inter">
            Liên hệ với chúng tôi để được tư vấn khóa học phù hợp nhất với nhu cầu của bạn
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg font-poppins"
          >
            Liên hệ tư vấn
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;