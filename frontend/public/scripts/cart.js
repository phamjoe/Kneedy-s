const items = [];

$(".add-cart").on( "click", function() {
    let div = $(this).closest("div")
    let addedItem = {
        name : div.find(".product").text(),
        description : div.find(".description").text(),
        price : div.find(".price").text()
    }
    items.push(addedItem);
    console.log(items);
});
