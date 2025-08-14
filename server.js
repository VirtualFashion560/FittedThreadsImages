const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch'); // or axios

const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.static('public')); // serve index.html & tryon.html

app.post('/api/generate-tryon', async (req, res) => {
const {self, clothing} = req.body;

try {
// Replace this with your AI image generation API call
// Example with OpenAI Images:
// const aiImage = await generateAIImage(self, clothing);
// const aiVideo = await generateAIVideo(self, clothing);

// For demo, just return uploaded images as placeholders
res.json({
aiImage: self, // replace with actual AI-generated image URL/base64
aiVideo: clothing // replace with actual AI-generated video URL
});
} catch(err){
console.error(err);
res.status(500).json({error:'AI generation failed.'});
}
});

app.listen(3000, ()=>console.log('Server running on http://localhost:3000'));
