import ChatBox from "../components/ChatBox";

export default function Chat() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Chat with AI Assistant
      </h1>
      <ChatBox />
    </div>
  );
}
