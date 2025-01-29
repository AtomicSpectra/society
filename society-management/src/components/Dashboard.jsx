import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@mui/material';  // Importing MUI Button
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [societies, setSocieties] = useState([]);
  const { currentUser } = useAuth(); 

  useEffect(() => {
    const fetchSocieties = async () => {
      const societiesCollection = await getDocs(collection(db, 'Socities'));
      setSocieties(societiesCollection.docs.map(doc => ({
        id: doc.id, 
        ...doc.data() 
      })));
    };

    fetchSocieties();
  }, []);

  const joinSociety = async (societyId) => {
    if (!currentUser) return alert('You must be logged in to join a society');
    
    const societyRef = doc(db, 'Societies', societyId);
    const societyDoc = await societyRef.get();
    
    const existingMembers = societyDoc.exists() ? societyDoc.data().members : [];

    if (!existingMembers.includes(currentUser.email)) {
      await updateDoc(societyRef, {
        members: [...existingMembers, currentUser.email],
      });
    } else {
      alert('You are already a member of this society');
    }
  };

  const handleRedirect = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div>
      <h2>Societies</h2>
      <div className="sms">
        {societies.map(society => (
          <div key={society.id} className="society-card">
            <h3 
              onClick={() => handleRedirect(society.link)} 
              style={{cursor: 'pointer'}}
            >
              {society.name}
            </h3>
            <p>{society.description}</p>
            {society.photoURL && <img src={society.photoURL} alt={society.name} className="society-photo" />}
            {currentUser && (
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => joinSociety(society.id)}
                disabled={society.members?.includes(currentUser.email)}
              >
                {society.members?.includes(currentUser.email) ? 'Already a member' : 'Join Society'}
              </Button>
            )}
            {society.link && (
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => handleRedirect(society.link)} 
                style={{ marginTop: '10px' }}
              >
                Visit Society Page
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

               
