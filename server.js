import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Or native fetch in Node 18+
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' })); // to handle large base64 images

// Serve your frontend files
app.use(express.static('public')); // put index.html & tryon.html in /public

// AI Try-On endpoint
app.post('/api/generate-tryon', async (req, res) => {
try {
const { self, cloth } = req.body;

if(!self || !cloth){
return res.status(400).json({ error: 'Missing images' });
}

// Example: call to your AI API
const aiResponse = await fetch('https://api.example.com/ai-tryon', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': 'Bearer YOUR_API_KEY'
},
body: JSON.stringify({ self, cloth })
});

const aiResult = await aiResponse.json();

// aiResult should contain { image: 'data:image/png;base64,...', video: 'data:video/mp4;base64,...' }
res.json(aiResult);

} catch(err){
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
