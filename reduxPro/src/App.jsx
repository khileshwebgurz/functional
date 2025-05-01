
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import BlogComp from './components/BlogComp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/blog/:id' element={<BlogComp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
