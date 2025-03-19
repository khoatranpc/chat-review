import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
      <img src="./mindx-logo.png" alt="MindX Logo" className="h-12 sm:h-16 mx-auto mb-4 sm:mb-6" />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-4 sm:mb-6">
        Xin chào bạn nhỏ! 👋
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
        Hãy gửi slide của bạn để MindX review và góp ý giúp bạn nhé! 🎯
      </p>
      <div className="space-y-3 sm:space-y-4">
        <Link
          to="/chat"
          className="inline-block bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-xl hover:bg-red-700 transition-colors shadow-lg"
        >
          Gửi slide để review ✨
        </Link>
        <p className="text-sm sm:text-base text-gray-500">
          Mình sẽ giúp bạn cải thiện bài thuyết trình thật tốt! 🌟
        </p>
      </div>
    </div>
  );
};

export default Home; 