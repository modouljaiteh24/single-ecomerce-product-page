const mainImage = document.getElementById("main-image") as HTMLImageElement;

const thumbnails = document.querySelectorAll(".thumbnail") as any;

const cartImage = document.getElementById("cart-image");
const cartContent = document.getElementById("cart-content");
// const itemTitle = document.getElementsByClassName("item-title");
// const itemPrice = document.getElementsByClassName("item-price");
const quantityCount = document.querySelector(
  ".quantity-count"
) as HTMLDivElement;

const hambuger = document.getElementById("hambuger");
const hambugarContent = document.getElementById("hambugarContent");
const menuClose = document.getElementById("menuClose");

const minusBtn = document.querySelector(".minusButton") as HTMLButtonElement;
const plusBtn = document.querySelector(".plusButton") as HTMLButtonElement;

const originalSrc = mainImage.src; // Store the original image

thumbnails.forEach((thumbnail: any) => {
  thumbnail.addEventListener("mouseover", () => {
    mainImage.src = thumbnail.src;
    // thumbnail.
  });

  thumbnail.addEventListener("mouseout", () => {
    mainImage.src = originalSrc;
  });
});

//menu
hambuger?.addEventListener("click", () => {
  // alert("Cliked");
  if (hambugarContent) {
    hambugarContent?.classList.toggle("hidden");
    // menuClose?.classList.remove("hidden");
  }
});

let count: any = 1;
minusBtn?.addEventListener("click", () => {
  if (count > 1) {
    count--;
    quantityCount.innerText = count;
  }
});

plusBtn?.addEventListener("click", () => {
  count++;
  quantityCount.innerText = count;
});

//cart-content
cartImage?.addEventListener("click", () => {
  if (cartContent) {
    cartContent.classList.toggle("show");
  }
});

//add to cart button
const addToCartButtom = document.getElementsByClassName("shop-item-button");
for (let i = 0; i < addToCartButtom.length; i++) {
  let button = addToCartButtom[i];
  button.addEventListener("click", addToCartCLicked);
}

function addToCartCLicked(event: any) {
  let button = event.target;
  let item = button.closest(".item");

  let title = item.getElementsByClassName("item-title")[0]?.innerText;
  let price = item.getElementsByClassName("item-price")[0]?.innerText;
  // let quantity = item.getElementsByClassName(
  //   "quantity-count"
  // ) as HTMLSpanElement;
  const mainImage = document.getElementsByClassName("main-image")[0]?.innerHTML;
  // console.log(mainImage);
  console.log(title, price, mainImage, quantityCount);
  addItemToCart(title, price, mainImage);
}

function addItemToCart(title: string, price: number, mainImage: string) {
  const cartContent = document.getElementById("cart-content") as HTMLElement;
  //quantity
  const quantityItem = document.getElementById("quantity") as HTMLSpanElement;

  if (quantityItem) {
    quantityItem.innerText = count;
  }

  const existingItems = cartContent.getElementsByClassName("cart-item");
  for (let i = 0; i < existingItems.length; i++) {
    const itemTitle = existingItems[i].querySelector("p")?.textContent?.trim();
    if (itemTitle === title) {
      alert("Item already in cart!");
      return;
    }
  }
  const totalPrice = price * count;

  // Create container for cart item
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <div class="flex items-center gap-4 py-4 border-b border-gray-200">
      <img src="${mainImage}" alt="${title}" class="w-16 h-16 rounded-lg" />
      <div class="text-left">
        <p class="text-sm text-gray-800 font-semibold">${title}</p>
        <p class="text-sm text-gray-600">
          ${price} x ${count}
        </p>
         <span class="font-bold text-black">Total: ${totalPrice}</span>
         
       
      </div>
      <button class="ml-auto text-red-500 hover:text-red-700 delete-btn">🗑️</button>
    </div>
    <div class="shop-item-button flex justify-center gap-3 bg-orange-500 hover:bg-orange-400 px-[4rem] p-4 rounded-[10px]">
      <img draggable="false" src="./public/assets/images/icon-cart.svg" alt="" />
          <button class="text-gray-500">Checkout</button>
    </div>
  `;

  //emty message

  // const emptyMessage = document.getElementsByClassName("emptyMessage");

  // Remove placeholder/empty message
  const emptyMsg = cartContent.querySelector(".item-cart-content");
  if (emptyMsg) {
    emptyMsg.remove();
  } else {
  }

  // Add the new cart item to the cart
  cartContent.appendChild(cartItem);

  // Attach delete functionality to this specific button
  const deleteBtn = cartItem.querySelector(".delete-btn") as HTMLElement;
  deleteBtn.addEventListener("click", () => {
    cartItem.remove();

    if (cartContent.querySelectorAll(".cart-item").length === 0) {
      count = count; // Reset
      if (quantityItem) {
        quantityItem.innerText = "0";
      }

      // Optional: Show "cart is empty" message when no items left
      // quantityItem.innerText.length === 1;
      // const emptyMessage = document.createElement("p");
      // emptyMessage.classList.add("emptyMessage");
      // emptyMessage.innerHTML = `
      // <p class="text-gray-400 emptyMessage">
      //   Your cart is empty.
      // </p>
      // `;

      // cartContent.appendChild(emptyMessage);

      const emptyText = document.createElement("p");
      emptyText.className =
        "item-cart-content text-gray-500 text-center pt-[4rem] text-gray-400";
      emptyText.innerText = "Your cart is empty.";
      cartContent.appendChild(emptyText);
    }
  });

  //Local storage
}
