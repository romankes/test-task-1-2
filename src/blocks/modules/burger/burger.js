const toggleMenu = () => {
    const burger = document.querySelector('.burger');
    const lines = burger.querySelectorAll('.burger__line');
    const menu = document.querySelector('.header__wrapper');


    burger.addEventListener('click', () => {
        lines.forEach(line => {
            line.classList.toggle('burger__line_active');
        })
        menu.classList.toggle('header__wrapper_active');
    })
    document.body.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target !== menu && e.target !== burger && e.target !== lines[0] && e.target !== lines[1] && e.target !== lines[2]) {
            lines.forEach(line => {
                line.classList.remove('burger__line_active');
            })
            menu.classList.remove('header__wrapper_active');
        }
    })
};

export default toggleMenu;
