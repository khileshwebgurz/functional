import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import PostCard from "./PostCard";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate timestamps
  const getRandomDate = () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 10));
    return pastDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const postRes = await axios.get("https://dummyjson.com/posts?limit=10");
        const postData = postRes.data.posts;

        const userRequests = postData.map((post) =>
          axios.get(`https://dummyjson.com/users/${post.userId}`)
        );

        const userResponses = await Promise.all(userRequests);
        const postsWithUser = postData.map((post, index) => ({
          ...post,
          user: userResponses[index].data,
          createdAt: getRandomDate(), // mock createdAt timestamp
        }));

        setPosts(postsWithUser);
      } catch (error) {
        console.error("Failed to fetch posts or users", error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);


  console.log('set posts are >>>',posts)

 

  if (loading) return <p>Loading posts...</p>;
  return (
    <>
   
      

     <div style={{maxWidth:'600px', margin:'auto'}}>
        {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: 16, marginBottom: 20, borderRadius: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={post.user.image}
              alt={post.user.firstName}
              style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/40')}
            />
            {/* <div>
              <strong>{post.user.firstName} {post.user.lastName}</strong>
              <p style={{ fontSize: 12, color: '#666' }}>{formatDistanceToNow(new Date(post.createdAt))} ago</p>
            </div> */}
          </div>

          {/* <h3>{post.title}</h3>
          <p>{post.body}</p> */}
            <PostCard key={post.id} post={post}/>

          <div style={{ marginTop: 8 }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ marginRight: 8, color: '#007bff' }}>#{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
    
    </>
   
  )
};

export default Dashboard;
