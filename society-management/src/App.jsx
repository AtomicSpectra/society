import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Chat from './components/Chat'
import Calendar from './components/Calendar'
import Logout from './components/Logout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


