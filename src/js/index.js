import aboutCard from '../blocks/modules/about-card/about-card';
import accordion from '../blocks/modules/work/work';
import scrollConfig from '../blocks/modules/accordion/accordion';
import promoSlider from '../blocks/modules/promo/promo';
import navigation from '../blocks/modules/menu/menu';
import toggleMenu from '../blocks/modules/burger/burger';

document.addEventListener('DOMContentLoaded', () => {
    toggleMenu();
    navigation();
    promoSlider();
    aboutCard();
    accordion();
    scrollConfig();
});