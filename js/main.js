// Variables

const burger = document.querySelector('.burger__menu');
const burgerNav = document.querySelector('.burger__nav');
const blurredBg = document.querySelector('.blurred__bg');
const body = document.querySelector('body');

// Open burger nav on click with functions
burger.addEventListener('click', function(){
    burgerNav.classList.add('is__open');
    burgerNav.scrollTop = 0;
    blurredBg.classList.add('is__open');
    body.classList.add('no__scroll');
});

// Close burger nav on click of burger nav items
$('.burger__nav__item, .burger__watch__item, .burger__sub__cta, .burger__naut__cta, .burger__logo, .blurred__bg').click(function() {
    burgerNav.classList.remove('is__open');
    blurredBg.classList.remove('is__open');
    body.classList.remove('no__scroll');
});

// Return  descript to original height after click
$('.main__watch__item, .brands__item, .watch__list__item').click(function() {
    location.reload();
});

// Filter function for gallery images
$(document).ready(function() {
    $('.item').click(function() {
        const value = $(this).attr('data-filter');
        if (value == 'all') {
            $('.img__box').show('1000');
        } else {
            $('.img__box').not('.'+value).hide('1000');
            $('.img__box').filter('.'+value).show('1000');
        }
    });
    // Active class function
    $('.item').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
});

// Show cart
const cartInfo = document.querySelector('.nav__cart__wrapper');
const cartOverlay = document.querySelector('.cart__overlay');
const cart = document.querySelector('.cart');
const burgerCart = document.querySelector('.burger__nav__cart');

(function() {
    cartInfo.addEventListener('click', function() {
        cartOverlay.classList.add('transparentBcg');
        cart.classList.add('showCart');
        cart.scrollTop = 0;
        body.classList.add('no__scroll');
    });
})();

(function() {
    burgerCart.addEventListener('click', function() {
        cartOverlay.classList.add('transparentBcg');
        cart.classList.add('showCart');
        cart.scrollTop = 0;
        body.classList.add('no__scroll');
        burgerNav.classList.remove('is__open');
        blurredBg.classList.remove('is__open');

    })
})();

// Close cart
(function() {
    cartOverlay.addEventListener('click', function() {
        if (cartOverlay.classList.contains('transparentBcg')) {
            cart.classList.remove('showCart');
            cartOverlay.classList.remove('transparentBcg');
            body.classList.remove('no__scroll');
        }
    });
})();






// Cart functions

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {    
    var removeCartItemButtons = document.getElementsByClassName('remove__item');

    for (var i = 0; i < removeCartItemButtons.length; i ++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem);
    } 

    var addToCartButtons = document.getElementsByClassName('watch__desc__cta');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked);

    document.getElementsByClassName('clear__cart')[0].addEventListener('click', clearCart);
}

// Clear cart and close cart on clear
function clearCart() {
    var cartItems = document.getElementsByClassName('cart__content')[0];
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);

        cart.classList.remove('showCart');
        cartOverlay.classList.remove('transparentBcg');
        body.classList.remove('no__scroll');
    }
    updateCartTotal();
}

// Purchase button function and closing cart on purchase
function purchaseClicked() {
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart__content')[0];
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
        cart.classList.remove('showCart');
        cartOverlay.classList.remove('transparentBcg');
        body.classList.remove('no__scroll');
    }
    updateCartTotal();
}

// Adding item to cart
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('watch__desc__title')[0].innerText;
    var desc = shopItem.getElementsByClassName('watch__desc__style')[0].innerText;
    var price = shopItem.getElementsByClassName('watch__desc__price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('fade')[0].src;
    addItemToCart(title, desc, price, imageSrc);

    cartOverlay.classList.add('transparentBcg');
    cart.classList.add('showCart');
    cart.scrollTop = 0;
    body.classList.add('no__scroll');

    updateCartTotal();
}

// Removing item from cart
function removeCartItem(event) {
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
}

// Adding actual div of item added in cart 
function addItemToCart(title, desc, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart__item');

    var cartItems = document.getElementsByClassName('cart__content')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart__image');

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].src == imageSrc) {
            alert('Already in cart');
            return;
        }
    }


    var cartRowContents = `
        <img class= "cart__image" src="${imageSrc}" alt="Rolex Submariner">
        <div>
            <h4 class = "cart__item__title">${title}</h4>
            <h4>${desc}</h4>
            <h5 class="cart__price">${price}</h5>
        </div>
        <div>
            <span class="remove__item">remove</span>

        </div>
    `;
    cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow);
    cartRow.getElementsByClassName('remove__item')[0].addEventListener('click', removeCartItem);
    
}

// Updating cart total
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart__content')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart__item');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart__price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart__up')[0];
        var priceCut = priceElement.textContent;
        var finalPrice = priceCut.slice(1).trim();
        var price = parseFloat(finalPrice.replace(',', ''));
        total = total + price;
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('cart__total')[0].innerText = total;
    
}