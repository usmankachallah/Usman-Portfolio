import { useState, useEffect } from "react";
import "../../styles/ContactMessages.css";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    fetchMessages();
  }, [currentPage]);

  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/admin/contacts?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: getAuthHeader(),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.contacts || []);
      setTotalPages(data.pagination.pages || 1);
      setError("");
    } catch (err) {
      setError(err.message);
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`${API_URL}/admin/contacts/${id}`, {
          method: "DELETE",
          headers: getAuthHeader(),
        });

        if (response.ok) {
          setMessages(messages.filter((msg) => msg.id !== id));
        } else {
          setError("Failed to delete message");
        }
      } catch (err) {
        setError("Error deleting message: " + err.message);
        console.error("Error deleting message:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2>Contact Messages</h2>
        <button className="refresh-btn" onClick={fetchMessages}>
          🔄 Refresh
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {messages.length === 0 ? (
        <div className="empty-state">
          <p>📭 No messages yet</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className="message-card">
              <div className="message-header">
                <div className="message-info">
                  <h3>{message.name}</h3>
                  <p className="message-email">{message.email}</p>
                </div>
                <span className="message-date">
                  {formatDate(message.created_at)}
                </span>
              </div>
              <div className="message-body">
                <p>{message.message}</p>
              </div>
              <div className="message-actions">
                <a href={`mailto:${message.email}`} className="reply-btn">
                  💬 Reply
                </a>
                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(message.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default ContactMessages;
