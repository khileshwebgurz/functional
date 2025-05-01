import { useEffect, useState } from "react";
import axios from "axios";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const API_BASE = "http://localhost:5000/api/posts";

  // Check if already liked/bookmarked
  useEffect(() => {
    axios
      .get(`${API_BASE}/${post.id}/status`, { withCredentials: true })
      .then((res) => {
        setLiked(res.data.liked);
        setBookmarked(res.data.bookmarked);
      })
      .catch((err) => console.error("Status check failed", err));
  }, [post.id]);

  // for handling like and unlike  based on toggling the button
  const handleLike = () => {
    const action = liked ? "unlike" : "like";
    const method = liked ? "delete" : "post";

    axios({
      method,
      url: `${API_BASE}/${post.id}/${action}`,
      withCredentials: true,
    })
      .then(() => setLiked(!liked))
      .catch((err) => console.error("Like toggle failed", err));
  };

  // for handling bookmark based on bookmark and unbookmark on toggling the button
  const handleBookmark = () => {
    const action = bookmarked ? "unbookmark" : "bookmark";
    const method = bookmarked ? "delete" : "post";

    axios({
      method,
      url: `${API_BASE}/${post.id}/${action}`,
      withCredentials: true,
    })
      .then(() => setBookmarked(!bookmarked))
      .catch((err) => console.error("Bookmark toggle failed ", err));
  };

  return (
    <div style={styles.card}>
      <img src={post.image} alt={post.title} style={styles.image} />
      <h3>{post.title}</h3>
      <p>{post.description}</p>

      <div style={styles.actions}>
        <button onClick={handleLike}>{liked ? "❤️ Liked" : "🤍 Like"}</button>
        <button onClick={handleBookmark}>
          {bookmarked ? "🔖 Bookmarked" : "📑 Bookmark"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    maxWidth: "400px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  actions: {
    marginTop: "1rem",
    display: "flex",
    gap: "1rem",
  },
};

export default PostCard;
