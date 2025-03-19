import { useState, useCallback } from 'react';
import { FaPaperPlane, FaFileUpload } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import { analyzeSlide, uploadFile } from '../services/openai';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const userMessage = { text: inputMessage, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        const response = await analyzeSlide(inputMessage);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      } catch (error) {
        setMessages(prev => [...prev, { 
          text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau!', 
          sender: 'bot',
          isError: true
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setMessages(prev => [...prev, { 
      text: `Đang tải lên file: ${file.name}...`, 
      sender: 'user' 
    }]);
    setIsLoading(true);

    try {
      const fileContent = await uploadFile(file);
      setMessages(prev => [...prev, { 
        text: 'Đang phân tích slide của bạn...', 
        sender: 'bot' 
      }]);

      const analysis = await analyzeSlide(fileContent);
      setMessages(prev => [...prev, { text: analysis, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: 'Xin lỗi, có lỗi xảy ra khi xử lý file. Vui lòng thử lại!', 
        sender: 'bot',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt']
    },
    maxFiles: 1
  });

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gradient-to-br from-red-50 via-slate-50 to-red-50 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-white p-3 sm:p-4 border-b flex items-center gap-2 sm:gap-3">
        <img src="./mindx-logo.png" alt="MindX Logo" className="h-6 sm:h-8" />
        <div>
          <h2 className="font-bold text-red-600 text-sm sm:text-base">Trợ lý Review Slide</h2>
          <p className="text-xs sm:text-sm text-gray-500">Luôn sẵn sàng giúp đỡ bạn ✨</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {messages.length === 0 && (
          <div {...getRootProps()} className="text-center">
            <input {...getInputProps()} />
            <div className={`text-gray-500 mt-6 sm:mt-10 p-8 border-2 border-dashed rounded-xl transition-colors ${
              isDragActive ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}>
              <p className="text-base sm:text-lg mb-2">👋 Chào mừng bạn đến với MindX!</p>
              <p className="text-sm sm:text-base mb-4">
                Kéo thả file slide vào đây hoặc click để chọn file
              </p>
              <button className="bg-red-100 text-red-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-flex items-center gap-2 hover:bg-red-200 transition-colors text-sm sm:text-base">
                <FaFileUpload />
                Tải slide lên
              </button>
              <p className="text-xs text-gray-400 mt-2">
                Hỗ trợ file .pptx, .ppt, .pdf
              </p>
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <img src="./mindx-logo.png" alt="MindX Logo" className="h-6 w-6 rounded-full hidden sm:block" />
            )}
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 sm:p-4 ${
                message.sender === 'user'
                  ? 'bg-red-600 text-white rounded-br-none'
                  : message.isError
                  ? 'bg-red-50 border border-red-200 text-red-600 rounded-bl-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="text-sm sm:text-base whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start gap-2">
            <img src="./mindx-logo.png" alt="MindX Logo" className="h-6 w-6 rounded-full hidden sm:block" />
            <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button
              type="button"
              className="bg-red-100 text-red-600 p-3 sm:p-4 rounded-full hover:bg-red-200 transition-colors"
            >
              <FaFileUpload className="text-base sm:text-lg" />
            </button>
          </div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Đặt câu hỏi hoặc nhập nội dung cần góp ý..."
            className="flex-1 p-3 sm:p-4 text-sm sm:text-base rounded-full border-2 border-gray-200 focus:outline-none focus:border-red-400 text-gray-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`p-3 sm:p-4 rounded-full transition-colors ${
              isLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            disabled={isLoading}
          >
            <FaPaperPlane className="text-base sm:text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat; 