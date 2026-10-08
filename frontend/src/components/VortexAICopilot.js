import React, { useState, useRef, useEffect } from "react";
import "./VortexAICopilot.css";

const PORTB = process.env.REACT_APP_BACK || "http://localhost:8080";
const DASH_URL = process.env.REACT_APP_DASH_URL || "http://localhost:3001";

const VortexAICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `### ⚡ VORTEX Quant Copilot Online
Welcome to VORTEX. I am your algorithmic market assistant. Ask me anything about quantitative trading, equity valuations, derivatives strategies, or how to launch your 3D DMA terminal!`,
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${PORTB}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        throw new Error("AI service temporary latency");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Analysis complete." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ **Connection Note:** ${err.message}. Backend available at ${PORTB}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (prompt) => {
    if (prompt === "GO_TO_DASHBOARD") {
      window.location.href = DASH_URL;
      return;
    }
    handleSend(prompt);
  };

  const renderFormatted = (text) => {
    return text.split("\n").map((line, idx) => {
      if (line.startsWith("### ")) {
        return <h3 key={idx}>{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("#### ")) {
        return <h4 key={idx}>{line.replace("#### ", "")}</h4>;
      }
      if (line.startsWith("- ")) {
        return (
          <li key={idx}>
            {line.replace("- ", "").split("**").map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={idx} />;
      }
      return (
        <p key={idx} style={{ margin: "3px 0" }}>
          {line.split("**").map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <>
      <button
        className="copilot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        title="Open VORTEX AI Assistant"
      >
        <span className="copilot-launcher-icon">
          <i className="fa-solid fa-brain"></i>
        </span>
        <span>VORTEX AI</span>
      </button>

      {isOpen && (
        <div className="copilot-drawer">
          <div className="copilot-header">
            <div className="copilot-header-brand">
              <div className="copilot-avatar">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <div className="copilot-title">VORTEX Copilot</div>
                <div className="copilot-subtitle">QUANT AI // REASONING ENGINE</div>
              </div>
            </div>
            <div className="copilot-header-actions">
              <button
                className="copilot-action-btn"
                onClick={() =>
                  setMessages([
                    {
                      role: "assistant",
                      content: "Session reset. Ask me anything about quantitative trading or market analysis.",
                    },
                  ])
                }
                title="Reset conversation"
              >
                <i className="fa-solid fa-arrows-rotate"></i>
              </button>
              <button
                className="copilot-action-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div className="copilot-chips-track">
            <button
              className="copilot-chip"
              onClick={() => handleChipClick("INFY valuation and technical profile")}
            >
              ⚡ INFY Analysis
            </button>
            <button
              className="copilot-chip"
              onClick={() => handleChipClick("Explain long straddle options strategy")}
            >
              💡 Options Strategy
            </button>
            <button
              className="copilot-chip"
              onClick={() => handleChipClick("How does stop-loss and DMA routing work?")}
            >
              🎯 Order Guidelines
            </button>
            <button
              className="copilot-chip"
              onClick={() => handleChipClick("GO_TO_DASHBOARD")}
              style={{ borderColor: "#0284c7", color: "#0284c7" }}
            >
              🚀 Launch Terminal
            </button>
          </div>

          <div className="copilot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                {msg.role === "assistant" ? renderFormatted(msg.content) : msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble assistant typing">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="copilot-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="copilot-input"
              placeholder="Ask Quant Copilot..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="copilot-send-btn"
              disabled={loading || !input.trim()}
              title="Send prompt"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default VortexAICopilot;
