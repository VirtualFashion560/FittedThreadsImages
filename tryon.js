const userPhoto = document.getElementById('userPhoto');
const clothingItem = document.getElementById('clothingItem');
const aiResult = document.getElementById('aiResult');

window.addEventListener('load', () => {
userPhoto.src = sessionStorage.getItem('userPhoto') || '';
clothingItem.src = sessionStorage.getItem('clothingItem') || '';

// Example: call backend to generate AI result
if(userPhoto.src && clothingItem.src){
aiResult.innerHTML = '<p>AI-generated image/video will appear here.</p>';
}
});

document.getElementById('saveResultBtn').addEventListener('click', () => {
alert("Save AI result clicked! You can redirect or implement saving later.");
});
