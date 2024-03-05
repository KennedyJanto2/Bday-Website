// Track the correct order of image IDs
const correctOrder = ['image1', 'image2', 'image3', 'image4', 'image5'];

// Initialize a counter to track the number of images placed
let placedImages = 0;

document.querySelectorAll('.puzzle-image').forEach(img => {
    img.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

document.querySelectorAll('.placeholder').forEach((placeholder, index) => {
    placeholder.addEventListener('dragover', e => {
        e.preventDefault(); // Necessary to allow dropping
    });

    placeholder.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const image = document.getElementById(id);
    
        if (!placeholder.style.backgroundImage) {
            e.target.style.backgroundImage = `url(${image.src})`;
            image.style.display = 'none';
            placeholder.setAttribute('data-image-id', id); // Set data attribute
            placedImages++;
        }
    
        if (placedImages === correctOrder.length) {
            checkOrder();
        }
    });    
});

function checkOrder() {
    const isCorrect = Array.from(document.querySelectorAll('.placeholder')).every((placeholder, index) => {
        const imageId = placeholder.getAttribute('data-image-id'); // Get the image ID from the data attribute
        return imageId === correctOrder[index];
    });

    if (!isCorrect) {
        setTimeout(resetGame, 1000);
    } else {
        window.location.href = "video_page.html";
    }
}



function resetGame() {
    document.querySelectorAll('.placeholder').forEach(placeholder => {
        placeholder.style.backgroundImage = ''; // Clear the placeholder backgrounds
    });

    const images = document.querySelectorAll('.puzzle-image');
    images.forEach(image => {
        image.style.opacity = '0'; // Fade out the image before moving it
    });

    // Wait for the fade-out animation to complete before resetting positions
    setTimeout(() => {
        images.forEach(image => {
            image.style.display = ''; // Show all images again
            image.style.opacity = '1'; // Fade the image back in at its original position
        });
        placedImages = 0; // Reset the counter
        randomizeImages(); // Randomize the images' positions
    }, 500); // This delay should match the CSS transition duration
}

function randomizeImages() {
    const imagesContainer = document.getElementById('images-container');
    for (let i = imagesContainer.children.length; i >= 0; i--) {
        imagesContainer.appendChild(imagesContainer.children[Math.random() * i | 0]);
    }
}

// Initial randomization on load
window.onload = randomizeImages;
