const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

let savedFiles = {};

// Save uploaded files from index.html
app.post('/api/save-uploads', upload.fields([{ name: 'userPhoto' }, { name: 'clothingPhoto' }]), (req, res) => {
if (req.files['userPhoto']) savedFiles.userPhoto = `/uploads/${req.files['userPhoto'][0].filename}`;
if (req.files['clothingPhoto']) savedFiles.clothingPhoto = `/uploads/${req.files['clothingPhoto'][0].filename}`;
res.sendStatus(200);
});

// Return uploaded files to tryon.html
app.get('/api/get-uploads', (req, res) => {
res.json(savedFiles);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
