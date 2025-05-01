import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BlogComp = () => {
  const {id} = useParams();

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const API_BASE = "http://localhost:5000/api/posts";

  // for handling like and unlike  based on toggling the button
  const handleLike = () => {
    const method = liked ? "delete" : "post";

    axios({
      method,
      url: `${API_BASE}/${id}/like`,
      withCredentials: true,
    })
      .then(() => setLiked(!liked))
      .catch((err) => console.error("Like toggle failed", err));
  };

  // for handling bookmark based on bookmark and unbookmark on toggling the button
  const handleBookmark = () => {
    const method = bookmarked ? "delete" : "post";

    axios({
      method,
      url: `${API_BASE}/${id}/bookmark`,
      withCredentials: true,
    })
      .then(() => setBookmarked(!bookmarked))
      .catch((err) => console.error("Bookmark toggle failed ", err));
  };
  return (
    <>
      <button onClick={handleLike}>{liked ? "❤️ Liked" : "🤍 Like"}</button>
      <button onClick={handleBookmark}>
        {bookmarked ? "🔖 Bookmarked" : "📑 Bookmark"}
      </button>
    </>
  );
};

export default BlogComp;
