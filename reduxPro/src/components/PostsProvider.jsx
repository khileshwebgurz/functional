import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

const PostsProvider = ({ children }) => {
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
        const postRes = await axios.get("https://dummyjson.com/posts?limit=20");
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
  return (
    <PostsContext.Provider value={{ posts, setPosts, loading }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
