import { useEffect, useRef, useState, type FormEvent } from "react";
import aiApi from "@/api/aiApi";
import { extractErrorMessage } from "@/api/axiosClient";
import { useI18n } from "@/context/I18nContext";
import "./AiChatWidget.css";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

// Floating AI assistant available on every page (mounted once in Layout).
// Talks to POST /api/ai/chat, which grounds every answer in real, current
// auction data server-side — this component only renders whatever text
// comes back and never fabricates auction facts itself.
export default function AiChatWidget() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: "greeting", role: "assistant", text: t.aiChat.greeting }]);
    }
    // Only seed the greeting once, when first opened — not on every
    // language change, so we don't clobber an in-progress conversation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await aiApi.chat(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: response.reply },
      ]);
    } catch (err) {
      // 503 (AI down/misconfigured) and 429 (rate limited) both come back
      // through extractErrorMessage with a friendly message already —
      // we just show it as a system note instead of a fake AI reply.
      setError(extractErrorMessage(err) || t.aiChat.unavailable);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="ai-chat">
      {isOpen && (
        <div className="ai-chat__panel" role="dialog" aria-label={t.aiChat.title}>
          <div className="ai-chat__header">
            <div>
              <div className="ai-chat__title">{t.aiChat.title}</div>
              <div className="ai-chat__subtitle">{t.aiChat.subtitle}</div>
            </div>
            <button
              type="button"
              className="ai-chat__close"
              onClick={() => setIsOpen(false)}
              aria-label={t.aiChat.close}
            >
              ×
            </button>
          </div>

          <div className="ai-chat__messages" ref={listRef}>
            {messages.map((m) => (
              <div key={m.id} className={`ai-chat__bubble ai-chat__bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {isSending && (
              <div className="ai-chat__bubble ai-chat__bubble--assistant ai-chat__bubble--thinking">
                <span className="ai-chat__dot" />
                <span className="ai-chat__dot" />
                <span className="ai-chat__dot" />
              </div>
            )}
            {error && <div className="ai-chat__error">{error}</div>}
          </div>

          <form className="ai-chat__form" onSubmit={handleSubmit}>
            <input
              className="ai-chat__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.aiChat.placeholder}
              disabled={isSending}
              maxLength={1000}
            />
            <button
              type="submit"
              className="ai-chat__send"
              disabled={isSending || !input.trim()}
            >
              {t.aiChat.send}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="ai-chat__launcher"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="ai-chat__launcher-icon" aria-hidden>
          {isOpen ? "×" : "✦"}
        </span>
        {!isOpen && <span className="ai-chat__launcher-label">{t.aiChat.launcherLabel}</span>}
      </button>
    </div>
  );
}