"use client";

import { useState, useEffect, useRef } from "react";
import { chatWithLLM } from "@/lib/api";

export default function ChatPanel({
  year,
  sector,
  data,
}: {
  year: number;
  sector: string;
  data: any[];
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
    ]);

    setInput("");
    setLoading(true);

    try {
      const reply = await chatWithLLM({
        message: input,
        year,
        sector,
        visibleData: data,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn’t fetch an answer right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[420px]">
      <h2 className="text-lg font-semibold mb-2">💬 Ask About Emissions</h2>

      <div className="flex-1 overflow-y-auto border rounded p-2 mb-2 bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-[90%] ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-500">Thinking…</p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about trends, comparisons, policies..."
          className="flex-1 border rounded px-3 py-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
