import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const analyzeSlide = async (fileContent) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Bạn là một giáo viên giàu kinh nghiệm trong việc review và góp ý slide. 
          Hãy phân tích slide và đưa ra những góp ý chi tiết về:
          1. Cấu trúc và bố cục
          2. Nội dung và tính logic
          3. Hình ảnh và đồ họa
          4. Font chữ và màu sắc
          5. Điểm mạnh của slide
          6. Điểm cần cải thiện
          7. Đề xuất cụ thể để cải thiện`
        },
        {
          role: "user",
          content: fileContent
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing slide:', error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Đây là nơi bạn sẽ gửi file lên server của mình
    // const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData);
    // return response.data;
    
    // Tạm thời đọc file locally
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}; 