import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import "../styles/Calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsQuery = query(collection(db, 'events'), orderBy('date', 'asc'));
        const eventsCollection = await getDocs(eventsQuery);
        setEvents(
          eventsCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate() || new Date() // Ensure valid dates
          }))
        );
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      }
    };
    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) {
      setError("Title and date are required.");
      return;
    }
    try {
      await addDoc(collection(db, 'events'), {
        title: newEvent.title,
        description: newEvent.description,
        date: new Date(newEvent.date)
      });
      setNewEvent({ title: '', date: '', description: '' });
      setError(null); // Clear errors
    } catch (err) {
      console.error("Error adding event:", err);
      setError("Failed to add event.");
    }
  };

  return (
    <Box className="card" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Upcoming Events</Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <form onSubmit={addEvent}>
        <TextField
          label="Event Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <TextField
          label="Event Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary">Add Event</Button>
      </form>

      <Box className="events-list" sx={{ marginTop: 3 }}>
        {events.map(event => (
          <Card key={event.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography color="textSecondary">{format(event.date, 'MMMM dd, yyyy')}</Typography>
              <Typography>{event.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;

