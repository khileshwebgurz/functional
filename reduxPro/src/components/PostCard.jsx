import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const Navigate = useNavigate();

  // Check if already liked/bookmarked
  // useEffect(() => {
  //   axios
  //     .get(`${API_BASE}/${post.id}/status`, { withCredentials: true })
  //     .then((res) => {
  //       setLiked(res.data.liked);
  //       setBookmarked(res.data.bookmarked);
  //     })
  //     .catch((err) => console.error("Status check failed", err));
  // }, [post.id]);

  // handling modal
  const handleShowModel = () => {
    Navigate(`/blog/${post.id}`);
  };

  return (
    <div style={styles.card}>
      <img src={post.image} alt={post.title} style={styles.image} />
      <h3>{post.title}</h3>
      <p>{post.description}</p>

      <div style={styles.actions}>
        <button onClick={handleShowModel}>Read article</button>
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
