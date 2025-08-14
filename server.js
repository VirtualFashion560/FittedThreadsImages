const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.static('public'));

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/api/generate-tryon', async (req,res)=>{
const {self, clothing} = req.body;
try{
const frames=[];
for(let i=0;i<3;i++){
const imgResp = await openai.createImage({
prompt:`Generate a realistic image of a person wearing this clothing. Variation ${i+1}. Person image: ${self}, Clothing image: ${clothing}`,
n:1,
size:"512x512"
});
frames.push(imgResp.data.data[0].b64_json);
}

const framePaths=[];
frames.forEach((b64,i)=>{
const buffer=Buffer.from(b64,'base64');
const filePath=`public/frame${i}.png`;
fs.writeFileSync(filePath,buffer);
framePaths.push(filePath);
});

const videoPath='public/tryon_video.mp4';
const ffmpegCmd=`ffmpeg -y -framerate 1 -i public/frame%d.png -c:v libx264 -pix_fmt yuv420p ${videoPath}`;
exec(ffmpegCmd,(err)=>{
if(err) console.error(err);
res.json({aiImage:`data:image/png;base64,${frames[0]}`, aiVideo:'tryon_video.mp4'});
});

}catch(err){
console.error(err);
res.status(500).json({error:'AI generation failed.'});
}
});

app.listen(3000,()=>console.log('Server running on http://localhost:3000'));
