// Required modules
const express = require('express');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// OpenAI API setup
const openai = new OpenAI({
    apiKey: 'your-openai-api-key',  // Replace with your actual OpenAI API key
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static('public'));

// POST route to get the answer from OpenAI API
app.post('/get-answer', async (req, res) => {
    const { question } = req.body;  // User's question from the frontend
    if (!question) {
        return res.status(400).json({ error: 'No question provided' });
    }

    try {
        // Send request to OpenAI API for a response to the question
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: question }],
            model: 'gpt-3.5-turbo',  // Use GPT-3.5 model
        });

        const answer = response.choices[0].message.content.trim();  // Extract the answer
        res.json({ answer });  // Send the answer back to the frontend

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});

// Test route to check if the server is working
app.get('/', (req, res) => {
    res.send('Hello, server is running!');
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});