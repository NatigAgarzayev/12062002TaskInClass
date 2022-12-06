const cards = document.querySelector('.cards'),
basket = document.querySelector('.basket'),
counter = document.querySelector('.count');
const products = [ { id: 1, name: 'Black', price: 2 }, { id: 2, name: 'Latte', price: 5 }, { id: 3, name: 'Espresso', price: 6 }, { id: 4, name: 'Eappucino', price: 4 }, { id: 5, name: 'Lungo', price: 3 }, { id: 6, name: 'Macchiato', price: 6 } ];
let basketItems = [];
counter.innerText = 0;
let quant = 0;
let count = 0;
localStorage.setItem('products', JSON.stringify(products));
let basketItemsSave = JSON.parse(localStorage.getItem('basket'));
if(basketItemsSave !== null){
    basketItems = basketItemsSave;
}

getProducts();
getBasket();
function createCard(id, name, price){
    let productCard = document.createElement('div'),
        productName = document.createElement('h3'),
        productPrice = document.createElement('p'),
        productButton = document.createElement('button');
    
    cards.appendChild(productCard);    
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productButton);

    productCard.classList.add('cards__item');
    productName.classList.add('cards__name');
    productPrice.classList.add('cards__price');
    productButton.classList.add('cards__button');

    productCard.setAttribute('id', id);
    productName.innerText = name;
    productPrice.innerText = "$" + price;
    productButton.innerText = 'Add to Cart';

    productButton.addEventListener('click', (e) => {
        quant = 0;
        let cardId = e.target.parentNode.getAttribute('id');
        count += 1;
        if(basketItems.some(x => cardId == x.id)){
            
        }
        else{
            basketItems.push({'id': `${id}`, 'name': `${name}`, 'price': `${price}`, 'count': 0});
        }
        

        for(let i = 0; i < basketItems.length; i++){
            if(cardId == basketItems[i].id){
                basketItems[i].count += count;
            }
        }    
        count = 0;
        
        for(let i = 0; i < basketItems.length; i++){
            quant += basketItems[i].count;
        }
        counter.innerText = quant;
        localStorage.setItem('basket', JSON.stringify(basketItems));
    });
}


function getProducts(){
    let getProducts = JSON.parse(localStorage.getItem('products'));
    let getBasket = JSON.parse(localStorage.getItem('basket'));
    getProducts.forEach(product => {
        createCard(product.id, product.name, product.price)
        localStorage.setItem('basket', JSON.stringify(getBasket));
    });
    
}

function getBasket(){
    quant = 0;
    let getBasket = JSON.parse(localStorage.getItem('basket'));
    for(let i = 0; i < getBasket.length; i++){
        quant += getBasket[i].count;
    }
    counter.innerText = quant;
}
