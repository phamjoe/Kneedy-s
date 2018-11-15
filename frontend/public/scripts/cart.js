cartItems = ( typeof cartItems != 'undefined' && cartItems instanceof Array ) ? cartItems : []

$('.add-cart').on("click", function() {
    let div = $(this).closest("div")
    let addedItem = {
        name : div.find(".product").text(),
        description : div.find(".description").text(),
        price : div.find(".price").text()
    }
    cartItems.push(addedItem);
    console.log(cartItems);
    updateCart(cartItems);
});

function updateCart(items){
    let $count = $('.counter');
    $count.text(items.length)
}