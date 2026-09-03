"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";

type View = "list" | "thread";

type ChatMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
};

const WHATSAPP = "https://wa.me/251976390000";
const GREETING = "How may I assist you today?";

const starters = [
  "Tell me about agribusiness export",
  "I need construction services",
  "Connect me with the head office",
];

export default function LiveChat() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("list");
  const [unread, setUnread] = useState(true);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", from: "bot", text: GREETING },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || view !== "thread") return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    inputRef.current?.focus();
  }, [open, view, messages.length]);

  function openPanel() {
    setOpen(true);
    setUnread(false);
  }

  function closePanel() {
    setOpen(false);
    setView("list");
  }

  function openThread() {
    setView("thread");
    setUnread(false);
  }

  function sendText(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      from: "user",
      text: trimmed,
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: `b-${Date.now()}`,
        from: "bot",
        text: "Thanks — our team is available on WhatsApp for a live reply. You can continue there now.",
      },
    ]);
    setDraft("");
    setView("thread");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendText(draft);
  }

  function continueOnWhatsApp() {
    const lastUser = [...messages].reverse().find((m) => m.from === "user");
    const query = lastUser
      ? `?text=${encodeURIComponent(lastUser.text)}`
      : `?text=${encodeURIComponent("Hello Global Plus — I'd like to get in touch.")}`;
    window.open(`${WHATSAPP}${query}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="liveChat">
      {open ? (
        <section
          className="liveChatPanel"
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Live chat messages"
        >
          {view === "list" ? (
            <>
              <header className="liveChatHeader">
                <h2>Messages</h2>
                <button type="button" className="liveChatIconBtn" onClick={closePanel} aria-label="Close chat">
                  <CloseIcon />
                </button>
              </header>
              <button type="button" className="liveChatThreadRow" onClick={openThread}>
                <span className="liveChatAvatar" aria-hidden="true">G</span>
                <span className="liveChatThreadMeta">
                  <strong>Global Plus</strong>
                  <span>{GREETING}</span>
                </span>
                <span className="liveChatThreadAside">
                  <time>Now</time>
                  {unread ? <i className="liveChatDot" aria-label="Unread" /> : null}
                </span>
              </button>
            </>
          ) : (
            <>
              <header className="liveChatHeader liveChatHeaderThread">
                <button type="button" className="liveChatIconBtn" onClick={() => setView("list")} aria-label="Back to messages">
                  <BackIcon />
                </button>
                <div className="liveChatHeaderPerson">
                  <span className="liveChatAvatar liveChatAvatarSm" aria-hidden="true">G</span>
                  <div>
                    <strong>Global Plus</strong>
                    <span>Typically replies on WhatsApp</span>
                  </div>
                </div>
                <button type="button" className="liveChatIconBtn" onClick={closePanel} aria-label="Close chat">
                  <CloseIcon />
                </button>
              </header>

              <div className="liveChatBody">
                {messages.map((message) => (
                  <p
                    key={message.id}
                    className={message.from === "bot" ? "liveChatBubble bot" : "liveChatBubble user"}
                  >
                    {message.text}
                  </p>
                ))}
                {messages.length <= 1 ? (
                  <div className="liveChatStarters">
                    {starters.map((item) => (
                      <button key={item} type="button" onClick={() => sendText(item)}>
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>

              <div className="liveChatFooter">
                <button type="button" className="liveChatWhatsApp" onClick={continueOnWhatsApp}>
                  Continue on WhatsApp
                </button>
                <form className="liveChatComposer" onSubmit={onSubmit}>
                  <input
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type a message…"
                    aria-label="Message"
                    autoComplete="off"
                  />
                  <button type="submit" aria-label="Send message" disabled={!draft.trim()}>
                    <SendIcon />
                  </button>
                </form>
              </div>
            </>
          )}
        </section>
      ) : null}

      <button
        type="button"
        className={`liveChatFab${open ? " isOpen" : ""}`}
        onClick={open ? closePanel : openPanel}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close live chat" : "Open live chat"}
      >
        {open ? <CloseIcon /> : <ChatBubbleIcon />}
        {!open && unread ? <i className="liveChatFabBadge" aria-hidden="true" /> : null}
      </button>
    </div>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.2 3.5h13.6c1.4 0 2.5 1.1 2.5 2.5v9.2c0 1.4-1.1 2.5-2.5 2.5H11l-4.4 3.3c-.6.4-1.4 0-1.4-.7v-2.6H5.2c-1.4 0-2.5-1.1-2.5-2.5V6c0-1.4 1.1-2.5 2.5-2.5Z"
      />
      <path
        fill="#0a7cff"
        d="M8.2 11.2c1.5 1.2 3.1 1.8 3.8 1.8s2.3-.6 3.8-1.8c.3-.2.6 0 .5.4-0.6 1.7-2.2 3-4.3 3s-3.7-1.3-4.3-3c-.1-.4.2-.6.5-.4Z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.7 6.7a1 1 0 0 1 1.4 0L12 10.6l3.9-3.9a1 1 0 1 1 1.4 1.4L13.4 12l3.9 3.9a1 1 0 0 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 0-1.4Z"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 6.3a1 1 0 0 1 0 1.4L10.4 12l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Z"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.2 11.2 19.1 3.9c.7-.3 1.4.4 1.1 1.1l-7.3 14.9c-.3.7-1.3.6-1.5-.1l-1.5-5.1-5.1-1.5c-.7-.2-.8-1.2-.1-1.5Z"
      />
    </svg>
  );
}
