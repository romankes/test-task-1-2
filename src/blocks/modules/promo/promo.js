const deleteNotDigits = (str) => {
    return +str.replace(/\D/g, '');
};

const slide = (width, slidesField, slideNum) => {
    const offset = deleteNotDigits(width) * slideNum;


    slidesField.style.transform = `translateX(-${offset+10}px)`;
};

const nextSwitcher = (activeSlide, switchers, width, slidesField) => {
    if(activeSlide === 3) {

        switchers[3].classList.remove('promo-switcher__progress_active');
        switchers[0].classList.add('promo-switcher__progress_active');

        slide(width, slidesField, 0);

        return 0;
    } else {
        switchers[activeSlide].classList.remove('promo-switcher__progress_active');
        switchers[activeSlide+1].classList.add('promo-switcher__progress_active');

        slide(width, slidesField, activeSlide+1);


        return activeSlide+1;
    }

};

const promoSlider = () => {
    const progresses = document.querySelectorAll('.promo-switcher__progress');
    let activeSlide = 0;

    progresses[activeSlide].classList.add('promo-switcher__progress_active');

    const switchers = document.querySelectorAll('.promo-switcher'),
        slidesWrapper = document.querySelector('.promo__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.promo__slider');
        
    let timeInterval  = setInterval(() => activeSlide = nextSwitcher(activeSlide, progresses, width, slidesField), 10000);

        switchers.forEach((switcher, i) => {
            switcher.addEventListener('click', () => {
                clearInterval(timeInterval);

                progresses.forEach(forRemove => {
                    forRemove.classList.remove('promo-switcher__progress_active');
                });

                activeSlide = i;

                slide(width, slidesField, activeSlide)
                progresses[i].classList.add('promo-switcher__progress_active');

                timeInterval  = setInterval(() => activeSlide = nextSwitcher(activeSlide, progresses, width, slidesField), 10000)
            });
        });

};

export default promoSlider;
