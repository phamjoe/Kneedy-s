// Gets info about products in the cart
const getProductsInfoInCart = () => {
  $.ajax({
    url: "/local",
    success: cart,
    dataType: "json"
  });
};

// Builds the page elements for the cart and sets an event listener for the removal of the cart items
const cart = (data) => {
  buildProduct(data)
    .then(renderEls)
    .then(() => {
      $(".product-remove").on("click", function () {
        let tr = $(this).closest("tr");
        let c = tr.children(".product-name");
        let p = tr.children(".price");
        let $tax = $(".tax");
        let $total = $(".total");
        let val = c
          .children(".name")
          .text()
          .trim();
        let price = p
          .text()
          .trim();
        let subtotal = (($(".subtotal").text().substr(1)) - (price.substr(1))).toFixed(2);

        let count = $(".counter").text();
        count = parseInt(count) - 1;
        $(".counter").text(count);
        $(".subtotal").text(`$${subtotal}`);
        $tax.text('$' + (subtotal * 0.13).toFixed(2));
        $total.text('$' + (subtotal * 1.13).toFixed(2));
        $(tr).remove();
        $.ajax({
          method: "POST",
          url: "/local/delete",
          data: {
            search: val
          },
          success: () => {
            console.log("It worked!");
          }
        });
      });
    });
}

// Sets quantity of the products and sends both that and their ids 
const actualCart = id => {
  let url = " https://kneedys-api.herokuapp.com/products/" + id;
  $.get(url).then(response => {
    response[0].quantity = 1;
    $.ajax({
      type: "POST",
      url: "/cart",
      data: {
        response
      },
      success: res => {
        console.log(res);
      }
    });
  });
  return Promise.resolve("");
};


// Onclick for the add to cart button
$(".add-cart").on("click", function () {
  let count = $(".counter").text();
  count = parseInt(count) + 1;
  $(".counter").text(count);
  let div = $(this).closest("div");
  let productId = div.find(".productID").text();
  actualCart(productId);
});

// Builds the html elements for the cart items
const buildProduct = (info) => {
  let objs = [];
  let $subtotal = $(".subtotal");
  let $tax = $(".tax");
  let $total = $(".total");
  let subtotal = 0;
  info.forEach(element => {
    let priceTrim = element.quantity;
    let el = $(`
        <tr class="text-center">
		    <td class="product-remove"><button class="btn btn-outline-black"><span class="icon-close"></span></button></td>
		    <td class="image-prod">
		        <div class="img" style='background-image:url("${element.imgUrl}");'></div>
            </td>
    	    <td class="product-name">
		        <h3 class="name">${element.name}</h3>
		        <p class="description">${element.description}</p>
	        </td>
		    <td class="price">$${element.price}</td>
		    <td class="quantity">
		        <div class="input-group mb-3">
		            <input type="text" name="quantity" class="quantity form-control input-number" value="${element.quantity}" min="1" max="100">
		        </div>
		    </td>
		    <td class="item-total">$${(element.price * priceTrim).toFixed(2)}</td>
		</tr>`);
    objs.push(el);
    subtotal += element.price * priceTrim;
    $subtotal.text('$' + subtotal.toFixed(2));
    $tax.text('$' + (subtotal * 0.13).toFixed(2));
    $total.text('$' + (subtotal * 1.13).toFixed(2));
  });

  return Promise.resolve(objs);
}

// Renders the cart items
const renderEls = (els) => {
  els.forEach(el => {
    $("tbody").append(el);
  });
}

$(".clear-cart").on("click", function () {
  $(".root").empty();
});

// Only gets info if this is the cart page
if (window.cart) {
  console.log("Cart Page!");
  getProductsInfoInCart();
}

const cartPrice = () => {
  console.log("Hi");
  let $subtotal = $(".subtotal2");
  let $tax = $(".tax2");
  let $total = $(".total2");

  $subtotal.text('$' + globalSubtotal.toFixed(2));
  $tax.text('$' + (subtotal * 0.13).toFixed(2));
  $total.text('$' + (subtotal * 1.13).toFixed(2));
}