const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your environment
});
const openai = new OpenAIApi(configuration);

app.post('/api/generate', async (req, res) => {
const { selfImage, clothImage } = req.body;
if (!selfImage || !clothImage) {
return res.status(400).json({ error: 'Missing images' });
}

try {
// Generate AI image combining user & clothing
const imageResponse = await openai.images.generate({
model: "gpt-image-1",
prompt: `Combine this person ${selfImage} wearing this clothing ${clothImage} in realistic style`,
size: "1024x1024"
});

// Save generated image as base64 URL
const aiImageBase64 = imageResponse.data[0].b64_json;
const aiImageUrl = `data:image/png;base64,${aiImageBase64}`;

// Generate AI video placeholder (for full video generation, you would need an actual video API)
// Here we can return a placeholder video or integrate with a video generation AI if available
const aiVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

res.json({ aiImageUrl, aiVideoUrl });

} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to generate AI content' });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
