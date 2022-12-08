const cart = document.querySelector('.cart__body');
let getBasketItems = JSON.parse(localStorage.getItem('basket'));
let sum = 0;
getBasketItems.forEach(item => {
    cart.innerHTML +=
    `
        <div class="cart__item" id=${item.id}>
            <div class="cart__head">
                <div class="cart__image"><img src='${item.image}'></div>
                <div class="cart__name">${item.name}</div>
            </div>
            <div class="cart__price">$${item.price}</div>
            <div class="cart__proccess">
                <div class="cart__plus"><i class="fa-solid fa-plus"></i></div>
                <div class="cart__count">${item.count}</div>
                <div class="cart__minus"><i class="fa-solid fa-minus"></i></div>
            </div>
        </div>
    `
});
makeTotal();

cart.addEventListener('click', (e) => {
    let target = e.target;
    if(target.parentElement.className == 'cart__minus'){
        minusProductCount(e);
    }
    if(target.parentElement.className == 'cart__plus'){
        plusProductCount(e);
    }
});

function minusProductCount(e){
    let cartId = e.target.parentElement.parentElement.parentElement.getAttribute('id');
    cartId = Number(cartId);
    for(let i = 0; i < getBasketItems.length; i++){
        if(+getBasketItems[i].id == cartId){
            getBasketItems[i].count -= 1;
            e.target.parentElement.previousElementSibling.innerText = `${getBasketItems[i].count}`;
            if(getBasketItems[i].count == 0){
                e.target.parentElement.parentElement.parentElement.remove();
                getBasketItems.splice(i, 1);
            }
        }
    }
    makeTotal();
    localStorage.setItem('basket', JSON.stringify(getBasketItems));
}

function plusProductCount(e){
    let cartId = e.target.parentElement.parentElement.parentElement.getAttribute('id');
    cartId = Number(cartId);
    for(let i = 0; i < getBasketItems.length; i++){
        if(+getBasketItems[i].id == cartId){
            getBasketItems[i].count += 1;
            e.target.parentElement.nextElementSibling.innerText = `${getBasketItems[i].count}`;
        }
    }
    makeTotal();
    localStorage.setItem('basket', JSON.stringify(getBasketItems));
}

function makeTotal(){
    cart.innerHTML += 
    `
        <div class="cart__item">
            <div class="cart__overall">Total Amount:</div>
            <div class="cart__total">$${getTotal()} + taxes</div>
        </div>
    `
    let cartTotal = document.querySelectorAll('.cart__overall');
    for(let i = 0; i < cartTotal.length - 1; i++){
        cartTotal[i].parentElement.remove();
    }
}

function getTotal(){
    let sum = 0;
    getBasketItems.forEach(item => {
        sum += +item.price * item.count;
    })
    return sum;
}
