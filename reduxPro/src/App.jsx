import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import BlogComp from "./components/BlogComp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsProvider from "./components/PostsProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PostsProvider>
                  <Dashboard />
                </PostsProvider>
              </PrivateRoute>
            }
          />
          <Route path="/blog/:id" element={<PostsProvider><BlogComp /></PostsProvider>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
