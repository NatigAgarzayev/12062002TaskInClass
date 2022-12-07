const cards = document.querySelector('.cards'),
    basket = document.querySelector('.basket'),
    counter = document.querySelector('.count'),
    swiperWrapper = document.querySelector('.swiper-wrapper');
const products = [ { id: 1, image: '../img/coffee-1.jpg' , name: 'Black', price: 2 }, { id: 2, image: '../img/coffee-2.jpg', name: 'Latte', price: 5 }, { id: 3, image: '../img/coffee-3.jpg', name: 'Espresso', price: 6 }, { id: 4, image: '../img/coffee-4.jpg', name: 'Eappucino', price: 4 }, { id: 5, image: '../img/coffee-5.jpg', name: 'Lungo', price: 3 }, { id: 6, image: '../img/coffee-6.jpg', name: 'Macchiato', price: 6 } ]; let basketItems = [];
counter.innerText = 0;
let quant = 0;
let count = 0;
localStorage.setItem('products', JSON.stringify(products));

let basketItemsSave = JSON.parse(localStorage.getItem('basket'));
if (basketItemsSave != null && basketItemsSave.length > 0){
    basketItems = basketItemsSave;
}
else{
    basketItems = [];
}

getSliderImage();
getProducts();
getBasket();
getCount();
function createCard(id, image, name, price){
    let productCard = document.createElement('div'),
        productImage = document.createElement('img');
        productName = document.createElement('h3'),
        productPrice = document.createElement('p'),
        productButton = document.createElement('button');
    
    cards.appendChild(productCard);    
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productButton);

    productCard.classList.add('cards__item');
    productImage.classList.add('cards__image');
    productName.classList.add('cards__name');
    productPrice.classList.add('cards__price');
    productButton.classList.add('cards__button');

    productCard.setAttribute('id', id);
    productImage.setAttribute('src', image)
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
            basketItems.push({'id': `${id}`, 'image': `${image}` , 'name': `${name}`, 'price': `${price}`, 'count': 0});
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

function getCount(){
    let getBasketQuant = JSON.parse(localStorage.getItem('basket'));
    let sum = 0;
    if (basketItemsSave != null && basketItemsSave.length > 0){
        for(let i = 0; i < getBasketQuant.length; i++){
            sum += getBasketQuant[i].count;
        }
    }
    else{
        sum = 0;
    }
    counter.innerText = sum;
}

function getSliderImage(){
    let getProductsForSlider = JSON.parse(localStorage.getItem('products'));
    for(let i = 0; i < getProductsForSlider.length - 2; i++){
        let swiperSlide = document.createElement('div');
        let sliderImage = document.createElement('img');
        
        swiperWrapper.appendChild(swiperSlide);
        swiperSlide.appendChild(sliderImage);

        swiperSlide.classList.add('swiper-slide');
        sliderImage.setAttribute('src', getProductsForSlider[i].image);
    }

}
const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 3,
    speed: 1000,
    spaceBetween: 20,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    breakpoints: {  
        '992': {
            slidesPerView: 3,
        },
        '768': {
            slidesPerView: 2,
        },
        '375': {
            slidesPerView: 1
        },
        '0': {
            slidesPerView: 0.5
        }
    },
});

function getProducts(){
    let getProducts = JSON.parse(localStorage.getItem('products'));
    let getBasket = JSON.parse(localStorage.getItem('basket'));
    getProducts.forEach(product => {
        createCard(product.id, product.image, product.name, product.price)
        localStorage.setItem('basket', JSON.stringify(getBasket));
    });
    
}

function getBasket(){
    quant = 0;
    let getBasket = JSON.parse(localStorage.getItem('basket'));
    if (basketItemsSave != null && basketItemsSave.length > 0){
        getBasket = basketItemsSave;
    }
    else{
        getBasket = [];
    }
    for(let i = 0; i < getBasket.length; i++){
        quant += getBasket[i].count;
    }
    counter.innerText = quant;

}

