import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Box, Grid, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import "../styles/Members.css";

const Members = () => {
  const [societies, setSocieties] = useState([]);

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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Society Members</Typography>
      
      <Grid container spacing={3}>
        {societies.map(society => (
          <Grid item xs={12} sm={6} md={4} key={society.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h5" component="div">{society.name}</Typography>
                <List>
                  {society.members && society.members.map((email, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={email} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Members;
