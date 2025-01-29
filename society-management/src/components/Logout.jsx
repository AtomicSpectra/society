import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import '../styles/Logout.css'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="logout-container"
    >
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout} className="btn btn-danger">
        Confirm Logout
      </button>
    </motion.div>
  );
};

export default Logout;

