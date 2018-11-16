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
    checkCart(cartItems, addedItem);
    cartItems.push(addedItem);
    console.log(cartItems);
    updateCart(cartItems);
});

function updateCart(items){
    let $count = $('.counter');
    $count.text(items.length)
}



// id {
//     name : div.find(".product").text(),
//     description : div.find(".description").text(),
//     price : div.find(".price").text()
// }

function checkCart(cartItems, addedItem) {
    let flag = 0
    checkItem = addedItem.id
    if (cartItems) {
        for( let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]['id'] == checkItem) {
                flag = 1
            }
        }
    }
    console.log(flag);
    return(flag);
}