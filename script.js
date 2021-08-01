function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          price: doc.data().price,
          rating: doc.data().rating,
        });
      });
      generateItems(items);
    });
}

function addToCart(item) {
  console.log(item);
  let cartItem = db.collection("cart-items").doc(item.id);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItem.set({
        image: item.image,
        name: item.name,
        make: item.make,
        price: item.price,
        rating: item.rating,
        quantity: 1,
      });
    }
  });
}

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "mr-5");
    doc.innerHTML = `
    <div class="product-image h-52 w-48 bg-white rounded-lg">
      <img class="h-full w-full object-contain" src="${item.image}">
    </div>
    <div class="product-name text-grey-700 font-bold mt-2 text-sm">
        ${item.name}
    </div>
    <div class="product-make text-green-700 font-bold">
        ${item.make}
    </div>
    <div class="product-rating text-yellow-500 font-bold my-1">
    ⭐⭐⭐⭐⭐ ${item.rating}
    </div>
    <div class="product-price font-bold text-grey-700 text-lg">
        ${numeral(item.price).format("$0,0.00")}
    </div>
    `;

    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "h-8",
      "w-28",
      "mt-5",
      "p-2",
      "text-md",
      "flex",
      "items-center",
      "justify-center",
      "bg-yellow-500",
      "justify-center",
      "rounded",
      "text-white",
      "cursor-pointer",
      "hover:bg-yellow-600"
    );
    addToCartEl.innerText = "Add to cart";
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
    });
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-products").appendChild(doc);
  });
}

getItems();
