let quackCount = 0;

document.getElementById('duck').addEventListener('click', function(event) {
    const duckElem = this;
    const quackSound = document.getElementById('quackSound');
    const pond = document.getElementById('pond');
    
    quackSound.currentTime = 0;
    // Play quack sound
    quackSound.play();

    // Increment quack count
    quackCount++;
    if (quackCount >= 7) {
        // Redirect to next page after 5 quacks
        window.location.href = 'pokemon_page.html'; // Replace 'next-page.html' with your actual next page
    }

    // Display "Quack" text
    displayQuackText();
});

function displayQuackText() {
    const duckElem = document.getElementById('duck');
    const quackText = document.createElement('div');
    quackText.textContent = 'Quack!';
    quackText.className = 'quack-text';
    quackText.style.position = 'absolute';

    document.body.appendChild(quackText); // Append to get dimensions

    // Calculate position
    const duckRect = duckElem.getBoundingClientRect(); // Gets the position of the duck relative to the viewport
    const quackTextWidth = quackText.offsetWidth;
    const quackTextHeight = quackText.offsetHeight;

    // Set position to be over the duck, adjusting for the "Quack" text dimensions
    quackText.style.left = `${duckRect.left + (duckRect.width / 2) - (quackTextWidth / 2)}px`;
    quackText.style.top = `${duckRect.top - quackTextHeight}px`; // Position above the duck

    // Remove "Quack" text after a short period
    setTimeout(() => {
        quackText.remove();
    }, 2000);
}


// Detect when the duck reaches the end to flip its direction
const duckElem = document.getElementById('duck');
duckElem.addEventListener('animationiteration', function() {
    this.classList.toggle('flipped');
});
