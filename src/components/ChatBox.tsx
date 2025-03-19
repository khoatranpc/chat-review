import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiSend, FiSmile } from "react-icons/fi";

interface Message {
  role: "user" | "assistant";
  content: string;
  file?: File;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `Uploaded file: ${file.name}`, file },
      ]);
      // TODO: Handle file upload and GPT processing
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // TODO: Implement GPT API call here
      const response =
        "Hi there! I'm your friendly AI learning buddy. How can I help you today? 😊";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-xl border-2 border-accent-yellow/20">
      <div className="bg-gradient-to-r from-accent-yellow to-accent-blue p-4 rounded-t-3xl">
        <h2 className="text-white font-display text-xl text-center">
          Chat with Your Learning Buddy! 🤖
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 animate-bounce-slow">
            <FiSmile className="h-12 w-12 mx-auto mb-4 text-accent-yellow" />
            <p className="font-medium">
              Hi friend! I'm here to help you learn. Ask me anything! 😊
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-accent-yellow/10 text-secondary rounded-tl-none"
              }`}
            >
              {message.file && (
                <div className="mb-2 text-sm font-medium">
                  <FiUpload className="inline mr-2" />
                  {message.file.name}
                </div>
              )}
              <p className="text-lg">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-accent-yellow/10 rounded-2xl p-4 rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-accent-yellow rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-accent-yellow rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-accent-yellow rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t-2 border-accent-yellow/20 p-6">
        <div
          {...getRootProps()}
          className={`mb-4 p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-accent-blue bg-accent-blue/5"
              : "border-gray-200 hover:border-accent-yellow hover:bg-accent-yellow/5"
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-secondary font-medium">
            {isDragActive
              ? "Drop your file here!"
              : "Share your homework or documents with me!"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            (PDF, TXT, DOC, DOCX files accepted)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything! I'm here to help..."
            className="input flex-1 text-lg"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary flex items-center"
          >
            <FiSend className="mr-2" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
