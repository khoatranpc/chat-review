import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
export const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('purpose', 'assistants'); // Required for file search

  const response = await axios.post('https://api.openai.com/v1/files', formData, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'multipart/form-data',
      'OpenAI-Beta': 'assistants=v2'
    }
  });

  return response.data.id
};
export const createAssistant = async () => {
  const res = await axios.post(
    'https://api.openai.com/v1/assistants',
    {
      name: 'Slide Review Assistant',
      instructions: `Bạn là một giáo viên giàu kinh nghiệm trong việc review và góp ý slide. 
      Hãy phân tích slide và đưa ra những góp ý chi tiết về:
      1. Cấu trúc và bố cục
      2. Nội dung và tính logic
      3. Hình ảnh và đồ họa
      4. Font chữ và màu sắc
      5. Điểm mạnh của slide
      6. Điểm cần cải thiện
      7. Đề xuất cụ thể để cải thiện
      `,
      tools: [{ type: 'file_search' }],
      model: 'gpt-4-1106-preview',
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
    }
  );

  return res.data.id; // assistant_id
};
export const createThread = async () => {
  const res = await axios.post(
    'https://api.openai.com/v1/threads',
    {},
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
    }
  );

  return res.data.id; // thread_id
};
export const addMessage = async (threadId, fileId) => {
  const res = await axios.post(
    `https://api.openai.com/v1/threads/${threadId}/messages`,
    {
      role: 'user',
      content: `Hãy review slide với filed_id ${fileId} và hãy chấm điểm slide trên thang điểm 10 sau khi đã góp ý với 7 tiêu chí` ,
      attachments: [{ file_id: fileId, tools: [{ type: "file_search" }] }]
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
    }
  );

  return res.data.id; // message_id
};
export const runAssistant = async (assistantId, threadId) => {
  const res = await axios.post(
    'https://api.openai.com/v1/threads/' + threadId + '/runs',
    {
      assistant_id: assistantId,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
    }
  );

  return res.data.id; // run_id
};
export const waitForRunCompletion = async (threadId, runId) => {
  let status = 'in_progress';
  let output;

  while (status === 'in_progress' || status === 'queued') {
    const res = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
      }
    );

    status = res.data.status;
    await new Promise((r) => setTimeout(r, 1500));
  }

  const messagesRes = await axios.get(
    `https://api.openai.com/v1/threads/${threadId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      },
    }
  );

  const messages = messagesRes.data.data;
  const lastMessage = messages.find((m) => m.role === 'assistant');
  return lastMessage?.content?.[0]?.text?.value;
};


export const startChat = async (fileId) => {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4-1106-preview',
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
        7. Đề xuất cụ thể để cải thiện
        Sau khi góp ý xong với 7 tiêu chí trên, hãy chấm điểm slide trên thang điểm 10
        `
      },
    ],
    tools: [{ type: 'file_search' }],
    file_ids: [fileId]
  }, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('Chat Response:', response.data);
};

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