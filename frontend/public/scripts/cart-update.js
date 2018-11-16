cartItems = ( typeof cartItems != 'undefined' && cartItems instanceof Array ) ? cartItems : [];

$('.add-cart').on("click", function() {
    let div = $(this).closest("div");
    let addedItem = {
        name : div.find(".product").text(),
        description : div.find(".description").text(),
        price : div.find(".price").text(),
        quantity : 1
    }
    
    addedItem['quantity'] =  1 || addedItem['quantity']+1;
    cartItems.push(addedItem);
    updateCart(cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
});

function updateCart(){
    let $count = $('.counter');
    let items = JSON.parse(window.localStorage.getItem('cart'));
    console.log(items);
    $count.text(items.length);
    return true;
}

function buildProduct(info){
    let objs = [];
    
    info.forEach(element => {
        let priceTrim = element.price;
        priceTrim = priceTrim.substr(1);
        let el = $(`
        <tr class="text-center">
		<td class="product-remove"><a href="#"><span class="icon-close"></span></a></td>
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
		<input type="text" name="quantity" class="quantity form-control input-number" value="1" min="1" max="100">
		</div>
		</td>
		<td class="total">$${element.quantity * priceTrim}</td>
		</tr>`);
        objs.push(el);
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
    buildProduct(items).then(renderEls);
    
}
if(window.cart === true){
getProduct();
}