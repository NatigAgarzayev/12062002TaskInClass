const cart = document.querySelector('.cart__body');
let getBasketItems = JSON.parse(localStorage.getItem('basket'));
let sum = 0;
getBasketItems.forEach(item => {
    sum += +item.price * item.count;
    cart.innerHTML +=
    `
        <div class="cart__item">
            <div class="cart__name">${item.name}</div>
            <div class="cart__price">$${item.price}</div>
            <div class="cart__count">Count: ${item.count}</div>
        </div>
    `
});
cart.innerHTML += 
`
    <div class="cart__item">
        <div class="cart__overall">Total Amount:</div>
        <div class="cart__total">$${sum} + taxes</div>
    </div>
`