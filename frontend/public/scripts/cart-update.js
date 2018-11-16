cartItems = ( typeof cartItems != 'undefined' && cartItems instanceof Array ) ? cartItems : []

$('.add-cart').on("click", function() {
    let div = $(this).closest("div")
    let addedItem = {
        name : div.find(".product").text(),
        description : div.find(".description").text(),
        price : div.find(".price").text(),
        id : div.find(".productID").text(),
        quantity : 1
    }
    const flag = checkCart(cartItems, addedItem);
    console.log(flag);

    if (flag[0] == 1) {
        cartItems[flag[1]]['quantity'] += 1;
        updateCart(cartItems)
    } else {
    cartItems.push(addedItem);
    updateCart(cartItems);
    //localStorage('cart', cartItems);
    }
    console.log(cartItems);
});

function updateCart(items){
    let $count = $('.counter');
    $count.text(items.length)
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
        for( let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]['id'] == checkItem) {
                flagItem[0] = 1;
                flagItem[1]= i;
            }
        }
    }
    return(flagItem);
}