cartItems = ( typeof cartItems != 'undefined' && cartItems instanceof Array ) ? cartItems : []

$('.add-cart').on("click", function() {
    let div = $(this).closest("div")
    let addedItem = {
        name : div.find(".product").text(),
        description : div.find(".description").text(),
        price : div.find(".price").text(),
<<<<<<< HEAD:frontend/public/scripts/cart.js
        id : div.find(".productID").text(),
        quantity : 1
    }
    const flag = checkCart(cartItems, addedItem);
    console.log(flag);

    if (flag[0] == 1) {
        cartItems[flag[1]]['quantity'] += 1;
        updateCart(cartItems)
    } else {
=======
        quantity : 1
    }
    
    addedItem['quantity'] =  1 || addedItem['quantity']+1;
>>>>>>> 8fe27afbb3477ce3987df432e1f20d97d85c7cc9:frontend/public/scripts/cart-update.js
    cartItems.push(addedItem);
    updateCart(cartItems);
<<<<<<< HEAD:frontend/public/scripts/cart.js
    }
    console.log(cartItems);
=======
    localStorage(cart, cartItems);
>>>>>>> 8fe27afbb3477ce3987df432e1f20d97d85c7cc9:frontend/public/scripts/cart-update.js
});

function updateCart(items){
    let $count = $('.counter');
<<<<<<< HEAD:frontend/public/scripts/cart.js
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
=======
    $count.text(items.length);
    
}

function getName(index){
    console.log(cartItems[index].name);
    return cartItems[index].name;
>>>>>>> 8fe27afbb3477ce3987df432e1f20d97d85c7cc9:frontend/public/scripts/cart-update.js
}