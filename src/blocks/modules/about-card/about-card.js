const aboutCard = () => {
    const cards = document.querySelectorAll('.about-card__info');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('about-card__info_active');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('about-card__info_active');
        });
    });
};

export default aboutCard;