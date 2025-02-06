let currentCardIndex = 0;
const cards = document.querySelectorAll(".hobby-card");
const dots = document.querySelectorAll(".dot");

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove("active", "prev", "next");
        dots[i].classList.remove("active");

        if (i === index) {
            card.classList.add("active"); // Center slide
        } else if (i === (index - 1 + cards.length) % cards.length) {
            card.classList.add("prev"); // Left side (previous)
        } else if (i === (index + 1) % cards.length) {
            card.classList.add("next"); // Right side (next)
        }
    });
    dots[index].classList.add("active");
    currentCardIndex = index;
}

// Swipe functionality (Fixed Issue)
let startX = 0;
const slider = document.querySelector(".hobby-slider");

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent scrolling while swiping
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        nextCard();
    } else if (startX < endX - 50) {
        prevCard();
    }
});

// Click to change slide
cards.forEach(card => {
    card.addEventListener("click", nextCard);
});

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(currentCardIndex);
}

// Show the first card on page load
showCard(currentCardIndex);
