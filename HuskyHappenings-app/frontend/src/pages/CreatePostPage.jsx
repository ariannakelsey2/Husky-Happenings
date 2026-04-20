import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    console.log("Post submitted:", content);

    navigate("/landing");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Create a Post</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What’s happening at USM?"
          rows="6"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
            fontSize: "15px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#1d4ed8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
}