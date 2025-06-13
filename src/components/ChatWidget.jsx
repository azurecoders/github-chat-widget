import { useState } from "react";

export default function ChatWidget({ config }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await fetch(config.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey, // optional, if you're handling API key via headers
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Failed to get response." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white w-80 p-4 rounded-2xl shadow-xl">
      <h2 className="text-lg font-semibold mb-2">ChatBot</h2>
      <div className="h-64 overflow-y-auto bg-gray-900 p-2 rounded mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded ${
                msg.role === "user" ? "bg-primary" : "bg-gray-700"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="w-full p-2 rounded bg-gray-700"
        placeholder="Ask something..."
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="mt-2 w-full p-2 rounded bg-primary text-black"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
