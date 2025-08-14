// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // for API requests
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public/
app.use(express.static('public'));

// Parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' }));

// API route to handle AI generation
app.post('/generate-ai', async (req, res) => {
const { selfImage, clothingImage } = req.body;

if (!selfImage || !clothingImage) {
return res.status(400).json({ error: 'Images are required' });
}

try {
// Example: Replace this with actual Replicate/OpenAI API call
const replicateResponse = await fetch('https://api.replicate.com/v1/predictions', {
method: 'POST',
headers: {
'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
'Content-Type': 'application/json',
},
body: JSON.stringify({
version: 'YOUR_MODEL_VERSION_ID', // replace with the model version you want
input: {
self: selfImage,
clothing: clothingImage
}
})
});

const data = await replicateResponse.json();
// The returned data should contain a URL to the AI generated image
const aiResultUrl = data.output?.[0] || null;

res.json({ aiResultUrl });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'AI generation failed' });
}
});

// Start server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
