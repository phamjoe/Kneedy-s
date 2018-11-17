cartItems = (typeof cartItems != 'undefined' && cartItems instanceof Array) ? cartItems : [];

$('.add-cart').on("click", function () {
    let div = $(this).closest("div");
    let addedItem = {
        name: div.find(".product").text(),
        description: div.find(".description").text(),
        price: div.find(".price").text(),
        id: div.find(".productID").text(),
        quantity: 1,
        url: div.siblings(".product-img").css('background-image')
    }
    console.log(div.siblings(".product-img").css('background-image'));
    const flag = checkCart(cartItems, addedItem);

    if (flag[0] == 1) {
        cartItems[flag[1]]['quantity'] += 1;
        updateCart(cartItems)
        localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
        cartItems.push(addedItem);
        updateCart(cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
});

function updateCart() {
    let $count = $('.counter');
    let items = JSON.parse(window.localStorage.getItem('cart'));
    console.log(items);
    if (items) {
        $count.text(items.length)
    }

    return true;
}


// This function checks if an item is already present in the cart
// if it's not the case, it adds the object representing the product
// if the item is already present, it returns a flag to inform us it 
// is the case and the position in the array where we need to update the
// object
function checkCart(cartItems, addedItem) {
    let flagItem = [0];
    checkItem = addedItem.id;
    if (cartItems) {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]['id'] == checkItem) {
                flagItem[0] = 1;
                flagItem[1] = i;
            }
        }
    }
    return (flagItem);
}

function buildProduct(info) {
    let objs = [];
    let $subtotal = $('.subtotal');
    let $tax = $('.tax');
    let $total = $('.total');
    let subtotal = 0;
    info.forEach(element => {
        let priceTrim = element.price;
        priceTrim = priceTrim.substr(1);
        let el = $(`
        <tr class="text-center">
		<td class="product-remove"><button class="btn btn-outline-black remove-item"><span class="icon-close"></span></button></td>
		<td class="image-prod">
		<div class="img" style='background-image:${element.url};'></div>
        </td>
    	<td class="product-name">
		<h3 class="name">
		${element.name}</h3>
		<p class="description">${element.description}</p>
	    </td>
		<td class="price">${element.price}</td>
		<td class="quantity">
		<div class="input-group mb-3">
		<input type="text" name="quantity" class="quantity form-control input-number" value="${element.quantity}" min="1" max="100">
		</div>
		</td>
		<td class="item-total">$${element.quantity * priceTrim}</td>
		</tr>`);
        objs.push(el);
        subtotal += element.quantity * priceTrim;
        $subtotal.text(subtotal.toFixed(2));
        $tax.text((subtotal * 0.13).toFixed(2));
        $total.text((subtotal * 1.13).toFixed(2));
    });
    return Promise.resolve(objs);

}

function renderEls(els) {
    els.forEach((el) => {
        $('tbody').append(el);
    });
}

function getProduct() {
    JSON.parse(window.localStorage.getItem('cart'));
    let items = JSON.parse(window.localStorage.getItem('cart'));
    buildProduct(items).then(renderEls).then(() => {
        $('.remove-item').on("click", function () {
            let index = $('.remove-item').index(this);
            let tr = $(this).closest('tr');
            $(tr).remove();
            items.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(items));
        });
    });
}
if (window.cart === true) {
    getProduct();
}


function updatePrice(){
    let $total = $('.total');
    $total.text();
}

$('.clear-cart').on("click", function () {
    $(".root").empty();
    window.localStorage.clear();
});