const getProductsInfoInCart = () => {
  $.ajax({
    url: "/local",
    success: cart,
    dataType: "json"
  });
};

const cart = (data) => {
  buildProduct(data)
    .then(renderEls)
    .then(() => {
      $(".product-remove").on("click", function () {
        let tr = $(this).closest("tr");
        let c = tr.children(".product-name");
        let val = c
          .children(".name")
          .text()
          .trim();
        let count = $(".counter").text();
        count = parseInt(count) - 1;
        $(".counter").text(count);
        console.log(val);
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


$(".add-cart").on("click", function () {
  let count = $(".counter").text();
  count = parseInt(count) + 1;
  $(".counter").text(count);
  let div = $(this).closest("div");
  let productId = div.find(".productID").text();
  actualCart(productId);
});

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
		<h3 class="name">
		${element.name}</h3>
		<p class="description">${element.description}</p>
	    </td>
		<td class="price">${element.price}</td>
		<td class="quantity">
		<div class="input-group mb-3">
		<input type="text" name="quantity" class="quantity form-control input-number" value="${
      element.quantity
    }" min="1" max="100">
		</div>
		</td>
		<td class="item-total">$${element.price * priceTrim}</td>
		</tr>`);
    objs.push(el);
    subtotal += element.price * priceTrim;
    $subtotal.text(subtotal.toFixed(2));
    $tax.text((subtotal * 0.13).toFixed(2));
    $total.text((subtotal * 1.13).toFixed(2));
  });

  return Promise.resolve(objs);
}

const renderEls = (els) => {
  els.forEach(el => {
    $("tbody").append(el);
  });
}

const updatePrice = () => {
  let $total = $(".total");
  $total.text();
}

$(".clear-cart").on("click", function () {
  $(".root").empty();
  window.localStorage.clear();
});

if (window.cart) {
  console.log("Cart Page!");
  getProductsInfoInCart();
}