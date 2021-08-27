const navigation = () => {
    const links = document.querySelectorAll('.menu__link');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const blockName = link.getAttribute('href');
            document.querySelector(blockName).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });
    })
}

export default navigation;
