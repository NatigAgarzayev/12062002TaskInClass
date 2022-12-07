const burger = document.querySelector('.burger'),
    list = document.querySelector('.navbar__list'),
    body = document.querySelector('body');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    list.classList.toggle('active');
    body.classList.toggle('active');
});