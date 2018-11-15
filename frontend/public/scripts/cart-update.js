cartItems = ( typeof cartItems != 'undefined' && cartItems instanceof Array ) ? cartItems : []

$('.add-cart').on("click", function() {
    let div = $(this).closest("div")
    let addedItem = {
        name : div.find(".product").text(),
        description : div.find(".description").text(),
        price : div.find(".price").text(),
        quantity : 1
    }
    
    addedItem['quantity'] =  1 || addedItem['quantity']+1;
    cartItems.push(addedItem);
    console.log(cartItems);
    updateCart(cartItems);
    localStorage(cart, cartItems);
});

function updateCart(items){
    let $count = $('.counter');
    $count.text(items.length);
    
}

function getName(index){
    console.log(cartItems[index].name);
    return cartItems[index].name;
}