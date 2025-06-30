import React from 'react';

const TrustedBy: React.FC = () => {
  const universities = [
    { name: 'ĐH Bách Khoa HN', logo: '🏛️' },
    { name: 'ĐH Quốc gia HN', logo: '🎓' }, 
    { name: 'ĐH Kinh tế QD', logo: '📊' },
    { name: 'ĐH Ngoại Thương', logo: '🌍' },
    { name: 'ĐH Y Hà Nội', logo: '⚕️' },
    { name: 'ĐH Công nghệ', logo: '💻' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-be-vietnam">
            Được tin tưởng bởi sinh viên từ 100+ trường đại học
          </h2>
          <p className="text-gray-600 font-nunito">
            Hàng nghìn sinh viên từ các trường đại học uy tín đang sử dụng EduFocus
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {universities.map((university, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{university.logo}</div>
              <h3 className="text-sm font-medium text-gray-900 font-be-vietnam">
                {university.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;