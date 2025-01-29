
import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Box, TextField, Button, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import '../styles/Chat.css';

const Chat = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: currentUser?.uid || '',
        timestamp: serverTimestamp()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="chat-container">
      <Card>
        <CardContent>
          <Typography variant="h5">Chat With Everyone</Typography>
          <Box sx={{ maxHeight: 400, overflowY: 'auto', marginBottom: 2 }}>
            <List>
              {messages.map(msg => (
                <ListItem key={msg.id} sx={{ justifyContent: msg.userId === currentUser?.uid ? 'flex-end' : 'flex-start' }}>
                  <Box sx={{ padding: 1, backgroundColor: msg.userId === currentUser?.uid ? '#cce7ff' : '#f1f1f1', borderRadius: 2 }}>
                    <ListItemText primary={msg.text} secondary={msg.timestamp?.toDate().toLocaleTimeString()} />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              label="Type your message..."
              variant="outlined"
              fullWidth
              sx={{ marginRight: 2 }}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;

