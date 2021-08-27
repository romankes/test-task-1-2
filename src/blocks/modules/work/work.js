const accordion = () => {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(item => {
        item.addEventListener('click', () => {            
            const switcher = item.querySelector('.accordion__switch');

            item.classList.add('accordion_active');
            switcher.classList.add('accordion__switch_open');

            accordions.forEach(itemForRemove => {
                if(item !== itemForRemove) {
                    
                    const switcher = itemForRemove.querySelector('.accordion__switch');

                    itemForRemove.classList.remove('accordion_active');
                    switcher.classList.remove('accordion__switch_open');
                }
            })

        });
    })
};

export default accordion;