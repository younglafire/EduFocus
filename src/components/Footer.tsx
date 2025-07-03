import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart, Award, Users, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Về chúng tôi', href: '#' },
    { name: 'Khóa học', href: '#' },
    { name: 'Tài nguyên', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Cộng đồng', href: '#' },
    { name: 'Trợ giúp', href: '#' }
  ];

  const courses = [
    { name: 'Lập trình cơ bản', href: '#' },
    { name: 'Tiếng Anh giao tiếp', href: '#' },
    { name: 'Kỹ năng mềm', href: '#' },
    { name: 'Toán cao cấp', href: '#' },
    { name: 'Thiết kế đồ họa', href: '#' },
    { name: 'Marketing số', href: '#' }
  ];

  const support = [
    { name: 'Trung tâm trợ giúp', href: '#' },
    { name: 'Liên hệ hỗ trợ', href: '#' },
    { name: 'Báo cáo lỗi', href: '#' },
    { name: 'Yêu cầu tính năng', href: '#' },
    { name: 'Trạng thái hệ thống', href: '#' },
    { name: 'API Documentation', href: '#' }
  ];

  const achievements = [
    { icon: Users, number: '50K+', label: 'Sinh viên' },
    { icon: Award, number: '1000+', label: 'Khóa học' },
    { icon: Zap, number: '98%', label: 'Hài lòng' },
    { icon: Heart, number: '4.9/5', label: 'Đánh giá' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold">Studytools</span>
              </div>
              
              <p className="text-blue-100 mb-8 text-lg leading-relaxed max-w-md">
                Nền tảng học tập hiện đại hàng đầu Việt Nam, giúp hơn 50,000 sinh viên 
                nâng cao hiệu quả học tập và đạt được ước mơ của mình.
              </p>

              {/* Achievements */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <achievement.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{achievement.number}</div>
                      <div className="text-xs text-blue-200">{achievement.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                  { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
                  { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
                  { icon: Youtube, href: '#', color: 'hover:bg-red-600' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 transform hover:scale-110`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Liên kết nhanh</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Khóa học phổ biến</h3>
              <ul className="space-y-3">
                {courses.map((course, index) => (
                  <li key={index}>
                    <a
                      href={course.href}
                      className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                      {course.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Hỗ trợ & Liên hệ</h3>
              
              {/* Contact info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-blue-200">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <a href="mailto:support@studytools.vn" className="hover:text-white transition-colors">
                    support@studytools.vn
                  </a>
                </div>
                <div className="flex items-center text-blue-200">
                  <Phone className="h-5 w-5 mr-3 text-blue-400" />
                  <a href="tel:+842812345678" className="hover:text-white transition-colors">
                    (028) 1234-5678
                  </a>
                </div>
                <div className="flex items-start text-blue-200">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
                  <span>Hồ Chí Minh, Việt Nam</span>
                </div>
              </div>

              {/* Support links */}
              <ul className="space-y-2">
                {support.slice(0, 3).map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-blue-200 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-white/10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Đăng ký nhận tin tức mới nhất
            </h3>
            <p className="text-blue-200 mb-8">
              Nhận thông tin về khóa học mới, tips học tập và ưu đãi đặc biệt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © 2024 Studytools. Tất cả quyền được bảo lưu. Made with{' '}
              <Heart className="inline h-4 w-4 text-red-400 mx-1" />
              in Vietnam
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Cookies
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;