import { useState } from "react";
import "./Community.css";

export default function Community() {
  const [comments, setComments] = useState([
    { id: 1, username: "ShadowGamer", text: "This tournament is gonna be epic! 🔥", replies: [] },
    { id: 2, username: "NeonNinja", text: "Anyone wanna team up? Looking for a duo! 👀", replies: [] },
    { id: 3, username: "CyberWolf", text: "Let's go! Can't wait for the finals. 💀⚡", replies: [] }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);

  // Function to add a new comment
  const addComment = () => {
    if (newComment.trim() !== "") {
      const newEntry = {
        id: comments.length + 1,
        username: "GuestUser",
        text: newComment,
        replies: []
      };
      setComments([newEntry, ...comments]);
      setNewComment("");
    }
  };

  // Function to handle replies
  const addReply = (commentId) => {
    if (replyText[commentId]?.trim() !== "") {
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: comment.replies.length + 1,
                  username: "GuestUser",
                  text: replyText[commentId]
                }
              ]
            }
          : comment
      );
      setComments(updatedComments);
      setReplyText({ ...replyText, [commentId]: "" });
      setReplyingTo(null);
    }
  };

  return (
    <div className="community-container">
      <h2 className="community-title">Community Discussions</h2>

      {/* New Comment Box */}
      <div className="comment-box">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type your comment here..."
        />
        <button onClick={addComment}>Post</button>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <h4>{comment.username}</h4>
            <p>{comment.text}</p>
            <button className="reply-btn" onClick={() => setReplyingTo(comment.id)}>Reply</button>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="reply-box">
                <textarea
                  value={replyText[comment.id] || ""}
                  onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                  placeholder="Write a reply..."
                />
                <button onClick={() => addReply(comment.id)}>Reply</button>
              </div>
            )}

            {/* Nested Replies */}
            {comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="reply">
                    <h5>{reply.username}</h5>
                    <p>{reply.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
