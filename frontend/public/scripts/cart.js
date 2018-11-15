const items = [];

$(".add-cart").on( "click", function() {
    let itemClicked = $(this).parent('p').siblings('p')
    let clicked = [];
    clicked.push(itemClicked);
    let addedItem = {
        description : document.getElementsByClassName('description')[0],
        price : clicked[0][1].innerText
    }
    items.push(addedItem);

    console.log(items);


});
