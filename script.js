let currentCardIndex = 0;

function showCard(index) {
    const cards = document.querySelectorAll('.hobby-card');
    const dots = document.querySelectorAll('.dot');

    if (!cards.length || !dots.length) {
        return;
    }

    cards.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next');
        dots[i].classList.remove('active');

        if (i === index) {
            card.classList.add('active');
        } else if (i === (index - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (i === (index + 1) % cards.length) {
            card.classList.add('next');
        }
    });

    dots[index].classList.add('active');
    currentCardIndex = index;
}

function nextCard() {
    const cards = document.querySelectorAll('.hobby-card');
    if (!cards.length) {
        return;
    }

    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
}

function prevCard() {
    const cards = document.querySelectorAll('.hobby-card');
    if (!cards.length) {
        return;
    }

    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(currentCardIndex);
}

window.showCard = showCard;

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.hobby-slider');
    const cards = document.querySelectorAll('.hobby-card');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!slider || !cards.length) {
        // Keep nav highlighting functional even if slider is removed later.
    } else {
        let startX = 0;

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });

        slider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;

            if (startX > endX + 50) {
                nextCard();
            } else if (startX < endX - 50) {
                prevCard();
            }
        });

        cards.forEach((card) => {
            card.addEventListener('click', nextCard);
        });

        showCard(currentCardIndex);
    }

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
        });
    };

    if (sections.length && navLinks.length) {
        const updateActiveSection = () => {
            const marker = window.scrollY + 140;
            let activeId = sections[0].id;

            sections.forEach((section) => {
                if (section.offsetTop <= marker) {
                    activeId = section.id;
                }
            });

            setActiveLink(activeId);
        };

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
    }

    const expItems = document.querySelectorAll('.exp-item');
    if (expItems.length) {
        const expObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            {
                threshold: 0.25
            }
        );

        expItems.forEach((item) => expObserver.observe(item));
    }
});
