let db = [{
    id: 1,
    name: 'burger',
    description: '8oz beef patty, with cheddar chesse, maple bacon, lettuce, tomato and our special sauce',
    price: 4.99,
    imgURL: '../public/src/images/person_2.jpg',
    type: 'food',
    quantity: 0
},
{
  id: 2,
  name: 'Sandwich',
  description: 'Le sandwich jambon beurre fromage',
  price: 6.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food',
  quantity: 0
},
{
  id: 3,
  name: 'Poutine',
  description: 'french fries... drowned into a gravy sauce and curly cheese',
  price: 2.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food',
  quantity: 0
},
{
  id: 4,
  name: 'Veggie Burger',
  description: 'we just removed the meet from our burger and voila',
  price: 4.49,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food',
  quantity: 0
},
{
  id: 5,
  name: 'Avocado Burger',
  description: 'Slices of fresh avocado, avocado bread with the famous guacamole sauce',
  price: 19.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food',
  quantity: 0
},
{
  id: 6,
  name: 'Empty burger',
  description: 'Two delicious gluten-free buns, filled with nothing.',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food',
  quantity: 0
},
{
  id: 7,
  name: 'Coca-Cola',
  description: 'Dark drink with bubbles in it. Sounds weird but it is good',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'drink',
  quantity: 0
},
{
  id: 8,
  name: 'Water',
  description: 'You would be surprised, but in fact it is possible to drink this even if it is tasteless',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'drink',
  quantity: 0
},
{
  id: 9,
  name: 'Root beer',
  description: 'Who did that? We do not know but some people appreciate it with their burgers',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'drink',
  quantity: 0
},
{
  id: 10,
  name: 'Chocolatine',
  description: 'Just enjoy this amazing pastry, just perfectly named',
  price: 3.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'dessert',
  quantity: 0
},
{
  id: 11,
  name: 'Brownie',
  description: 'This will kill you, but it is really also really good',
  price: 3.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'dessert',
  quantity: 0
},
{
  id: 12,
  name: 'Crême brulée',
  description: 'You like caramel and you need a sweet hug? Try this!',
  price: 3.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'dessert',
  quantity: 0
}];

cartItems = ( typeof cartItems != 'undefined' && cartItems instanceof Array ) ? cartItems : [];



const actualCart = () => {
    let items = JSON.parse(window.localStorage.getItem('cart'));
    const itemsQuantity = items.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let cart = [];
    for (each in itemsQuantity) {
        let product = db[each - 1];
        product.quantity = itemsQuantity[each];
        cart.push(product);
    }
    


    return(cart);
}

$('.add-cart').on("click", function() {
    let div = $(this).closest("div");
    let productId = div.find(".productID").text();
    cartItems.push(productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log(actualCart());
    
});

function updateCart(){
    let $count = $('.counter');
    let items = JSON.parse(window.localStorage.getItem('cart'));
    console.log(items);
    if(items){
        $count.text(items.length)
    }
    
    return true;
}



function checkCart(cart, item) {
    if (flag[0] == 1) {
        cart[flag[1]]['quantity'] += 1;
        updateCart(cartItems)
        localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
    cartItems.push(item);
    updateCart(cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    }
};



function buildProduct(info){
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
		<div class="img" style="background-image:url(/src/images/menu-2.jpg);"></div>
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
        $subtotal.text(subtotal);
        $tax.text((subtotal*0.13).toFixed(2));
        $total.text((subtotal*1.13).toFixed(2));
    });
    return Promise.resolve(objs);

}
function renderEls(els){
    els.forEach((el)=>{
        $('tbody').append(el);
    });
}

function getProduct(){
    JSON.parse(window.localStorage.getItem('cart'));
    let items = JSON.parse(window.localStorage.getItem('cart'));
    buildProduct(items).then(renderEls).then(()=>{
        $('.remove-item').on("click", function() {
            let index = $('.remove-item').index(this);
            let tr = $(this).closest('tr');
            $(tr).remove();
            items.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(items));
        });
    });
}
if(window.cart === true){
    getProduct();
}

$('.clear-cart').on("click", function() {
    $( ".root" ).empty();
    window.localStorage.clear();
});

