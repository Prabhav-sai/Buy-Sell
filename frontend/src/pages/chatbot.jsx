import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthcontext";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";


const Chatbot = () => {
    const [history, setHistory] = useState([{
        role: 'user',
        parts: [{ text: 'Hello' }]
    },
    {
        role: 'model',
        parts: [{ text: 'Great to meet you. What would you like to know?' }]
    }
    ]);
    const { user } = useAuthContext();
    const [prompt, setPrompt] = useState('');
    const fetchAI = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/genai', { history, prompt },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            setHistory([...history, { role: 'user', parts: [{ text: prompt }] }, { role: 'model', parts: [{ text: response.data.text }] }]);
        } catch (err) {
            console.error('Error fetching AI:', err);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && prompt.length > 0) {
            fetchAI();
        }
    };
    useEffect(() => {
        setPrompt('');
    }, [history]);
    return (
        <Box 
      sx={{ 
        maxWidth: 600, 
        margin: "auto", 
        p: 2, 
        display: "flex", 
        flexDirection: "column", 
        gap: 2 
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        AI Chat
      </Typography>

      <Paper 
        sx={{ 
          p: 2, 
          height: 400, 
          overflowY: "auto", 
          borderRadius: 2, 
          boxShadow: 3,
          backgroundColor: "#f5f5f5"
        }}
      >
        {history.map((msg, i) => (
          <Box
            key={i}
            sx={{
              textAlign: msg.role === "user" ? "right" : "left",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                p: 1.5,
                borderRadius: 2,
                maxWidth: "75%",
                bgcolor: msg.role === "user" ? "#1976d2" : "#e0e0e0",
                color: msg.role === "user" ? "white" : "black",
              }}
            >
              {msg.parts[0].text}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={fetchAI} 
          disabled={prompt.length === 0}
        >
          Send
        </Button>
      </Box>
    </Box>
    );

};

export default Chatbot;