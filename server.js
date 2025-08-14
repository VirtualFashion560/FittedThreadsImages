const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const REPLICATE_API_TOKEN = 'YOUR_REPLICATE_API_TOKEN_HERE';

// Generate AI try-on photo
app.post('/api/generate-tryon-photo', async (req, res) => {
const { person_image, cloth_image, cloth_type } = req.body;

try {
const response = await fetch('https://api.replicate.com/v1/predictions', {
method: 'POST',
headers: {
'Authorization': `Token ${REPLICATE_API_TOKEN}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({
version: "db21e45d6f2f2c2c1234567890abcdef", // Replace with your model version
input: {
person_image,
cloth_image,
cloth_type,
output_format: "png",
output_quality: 100
}
})
});

const data = await response.json();
let resultUrl = data.output && data.output[0] ? data.output[0] : '';
res.json({ output_url: resultUrl });

} catch(err) {
console.error(err);
res.status(500).json({ error: "Failed to generate AI try-on photo" });
}
});

// Generate AI try-on video (optional)
app.post('/api/generate-tryon-video', async (req, res) => {
const { person_image, cloth_image } = req.body;

try {
const response = await fetch('https://api.replicate.com/v1/predictions', {
method: 'POST',
headers: {
'Authorization': `Token ${REPLICATE_API_TOKEN}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({
version: "YOUR_VIDEO_MODEL_VERSION", // Replace with correct video model version
input: {
person_image,
cloth_image
}
})
});

const data = await response.json();
let resultUrl = data.output && data.output[0] ? data.output[0] : '';
res.json({ output_url: resultUrl });

} catch(err) {
console.error(err);
res.status(500).json({ error: "Failed to generate AI try-on video" });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
