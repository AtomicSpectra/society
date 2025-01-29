import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import { useAuth } from '../contexts/AuthContext'; 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'; 

function Navigation() {
  const { currentUser } = useAuth(); 

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <Avatar 
              alt="Collab X Logo" 
              src="/path-to-your-logo-image.png"
              sx={{
                width: 40, 
                height: 40, 
                marginRight: 1,
              }}
            />
          </Link>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{
              fontWeight: 'bold',
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#333',
              fontSize: '1.75rem',
            }}
          >
            <Link to="/" className="logo-link">
              Collab X
            </Link>
          </Typography>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/chat" className="nav-link">Chat</Link>
          <Link to="/calendar" className="nav-link">Calendar</Link>
          <Link to="/members" className="nav-link">Members</Link>
          {!currentUser ? (
            <>
              <Link to="/login">
                <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="contained" color="secondary">Connect With Alumni</Button>
              </Link>
            </>
          ) : (
            <Link to="/logout" className="nav-link">Logout</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

