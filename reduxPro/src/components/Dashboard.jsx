import { usePosts } from "./PostsProvider";
import PostCard from "./PostCard";

const Dashboard = () => {
  const { posts, loading } = usePosts();
  if (loading) return <p>Loading posts...</p>;
  return (
    <>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: 16,
              marginBottom: 20,
              borderRadius: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={post.user.image}
                alt={post.user.firstName}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/40")
                }
              />
              {/* <div>
              <strong>{post.user.firstName} {post.user.lastName}</strong>
              <p style={{ fontSize: 12, color: '#666' }}>{formatDistanceToNow(new Date(post.createdAt))} ago</p>
            </div> */}
            </div>

            {/* <h3>{post.title}</h3>
          <p>{post.body}</p> */}
            <PostCard key={post.id} post={post} />

            <div style={{ marginTop: 8 }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{ marginRight: 8, color: "#007bff" }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
