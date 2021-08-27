import Scrollbar  from 'smooth-scrollbar';

const scrollConfig = () => {
    const containers = document.querySelectorAll('.accordion__desc');

    containers.forEach(container => {
        Scrollbar.init(container)
        Scrollbar.detachStyle();

    })
};

export default scrollConfig;