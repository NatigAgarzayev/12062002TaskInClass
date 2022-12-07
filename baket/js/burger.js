const burger = document.querySelector('.burger'),
    list = document.querySelector('.navbar__list');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    list.classList.toggle('active');
});