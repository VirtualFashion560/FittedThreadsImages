const photoUpload = document.getElementById('photoUpload');
const clothingUpload = document.getElementById('clothingUpload');
const photoPreview = document.getElementById('photoPreview');
const clothingPreview = document.getElementById('clothingPreview');
const continueBtn = document.getElementById('continueBtn');
const retakeBtn = document.getElementById('retakeBtn');

photoUpload.addEventListener('change', () => previewImage(photoUpload, photoPreview));
clothingUpload.addEventListener('change', () => previewImage(clothingUpload, clothingPreview));

function previewImage(input, preview) {
const file = input.files[0];
if (file) {
const reader = new FileReader();
reader.onload = e => {
preview.src = e.target.result;
};
reader.readAsDataURL(file);
}
}

retakeBtn.addEventListener('click', () => {
photoPreview.src = '';
clothingPreview.src = '';
photoUpload.value = '';
clothingUpload.value = '';
});

continueBtn.addEventListener('click', () => {
// Save uploaded images to sessionStorage for tryon.html
if(photoPreview.src && clothingPreview.src){
sessionStorage.setItem('userPhoto', photoPreview.src);
sessionStorage.setItem('clothingItem', clothingPreview.src);
window.location.href = 'tryon.html';
} else {
alert("Please upload both images before continuing.");
}
});
