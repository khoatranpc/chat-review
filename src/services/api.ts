import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function sendMessage(messages: Message[]) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

export async function processFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // TODO: Implement file processing with GPT
    // This would involve:
    // 1. Converting the file to text
    // 2. Sending the text to GPT
    // 3. Getting the response

    return "File processing is not implemented yet.";
  } catch (error) {
    console.error("Error processing file:", error);
    throw error;
  }
}
