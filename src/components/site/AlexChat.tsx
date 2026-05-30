import { X, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { chatWithAlex } from "@/lib/chatWithAlex";
import { startVapi } from "@/lib/vapi";

type Role = "alex" | "user";
interface Msg { role: Role; text: string }

const OPENING = "Hi! I'm Alex, EPR Plumbing's virtual assistant. I can answer questions about our services, pricing, and availability — or connect you with a live plumber. What can I help you with?";

export function AlexChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setMessages([{ role: "alex", text: OPENING }]);
    setInput("");
    setSessionId(null);
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = input.trim();
    if (!val || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: val }]);
    setLoading(true);

    try {
      const { reply, sessionId: sid } = await chatWithAlex({ data: { message: val, sessionId: sessionId ?? undefined } });
      if (sid) setSessionId(sid);
      setMessages((m) => [...m, { role: "alex", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "alex", text: "Sorry, something went wrong. Please call us at (605) 815-1039." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleVoice() {
    onClose();
    startVapi();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-charcoal/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Chat with Alex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-luxe overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-turquoise flex items-center justify-center text-white font-bold text-sm">A</div>
            <div>
              <p className="font-semibold text-charcoal text-sm leading-tight">Alex · EPR Plumbing</p>
              <p className="text-xs text-turquoise flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-turquoise animate-pulse inline-block" /> Online now
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="size-8 rounded-full hover:bg-secondary flex items-center justify-center text-charcoal/60 hover:text-charcoal transition">
            <X className="size-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="px-4 py-4 space-y-3 overflow-y-auto flex-1 bg-secondary/20">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-turquoise text-white rounded-br-sm" : "bg-white text-charcoal border border-border rounded-bl-sm shadow-sm"}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 rounded-full bg-charcoal/30 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Voice escalation */}
        <div className="px-4 pt-2 shrink-0">
          <button
            onClick={handleVoice}
            className="w-full flex items-center justify-center gap-2 text-xs text-charcoal/60 hover:text-turquoise transition py-1.5"
          >
            <PhoneCall className="size-3.5" /> Speak with a live plumber instead
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border flex gap-2 shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask a plumbing questionâ€¦"
            className="flex-1 border border-border rounded-lg px-3 py-2 text-sm text-charcoal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-turquoise/40 focus:border-turquoise transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-turquoise text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
