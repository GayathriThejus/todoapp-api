// import Todo1 from "./components/Todo1"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Todo from './components/Todo'
import Signup from './components/Signup';
function App() {
 

  return (
    <Router>
    <Routes>
   
      <Route path="/" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
    
  </Router>

  )
}

export default App
