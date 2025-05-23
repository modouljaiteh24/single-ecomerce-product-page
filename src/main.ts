const mainImage = document.getElementById("main-image") as HTMLImageElement;

const imageProduct1 = document.getElementById(
  "image-product-1"
) as HTMLImageElement;
const imageProduct2 = document.getElementById(
  "image-product-2"
) as HTMLImageElement;
const imageProduct3 = document.getElementById(
  "image-product-3"
) as HTMLImageElement;
const imageProduct4 = document.getElementById(
  "image-product-4"
) as HTMLImageElement;

const cartImage = document.getElementById("cart-image");
const cartContent = document.getElementById("cart-content");
const itemTitle = document.getElementsByClassName("item-title");
const itemPrice = document.getElementsByClassName("item-price");
const quantityCount = document.querySelector(
  ".quantity-count"
) as HTMLDivElement;
const minusBtn = document.querySelector(".minusButton") as HTMLButtonElement;
const plusBtn = document.querySelector(".plusButton") as HTMLButtonElement;
// const itemImage = document.getElementsByClassName("item-image");

// const addToCartButtom = document.getElementsByClassName("shop-item-button");

imageProduct1?.addEventListener("click", () => {
  if ((mainImage.src = imageProduct1.src)) {
  }
});

imageProduct2?.addEventListener("click", () => {
  mainImage.src = imageProduct2.src;
});

imageProduct3?.addEventListener("click", () => {
  mainImage.src = imageProduct3.src;
});

imageProduct4?.addEventListener("click", () => {
  mainImage.src = imageProduct4.src;
});

// window.addEventListener("click", () => {
//   const mainImage = document.getElementById("main-image");
//   for (let i = 1; i <= 4; i++) {
//     const thumb = document.getElementById(`image-product-${i}`);
//     if (thumb) {
//       thumb.addEventListener("click", () => {
//         mainImage.src = thumb.src;
//       });
//     }
//   }
// });

//quantity
let count = 1;
minusBtn?.addEventListener("click", () => {
  if (count > 1) {
    count--;
    quantistyCount.innerText = count;
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

function addToCartCLicked(event) {
  let button = event.target;
  let item = button.closest(".item");
  // let item = button.parentElement.parentElement;
  let title = item.getElementsByClassName("item-title")[0]?.innerText;
  let price = item.getElementsByClassName("item-price")[0]?.innerText;
  let quantity = item.getElementsByClassName("quantity-count");
  const mainImage = document.getElementsByClassName("main-image")[0]?.src;
  // console.log(mainImage);
  console.log(title, price, mainImage, quantityCount);
  addItemToCart(title, price, mainImage, quantityCount);
}

function addItemToCart(title: itemName, price, mainImage, quantity) {
  const cartItemContent = `
    <div class="flex items-center gap-4 py-4 border-b border-gray-200">
      <img src="${mainImage}" alt="${title}" class="w-16 h-16 rounded-lg" />
      <div class="text-left">
        <p class="text-sm text-gray-800 font-semibold">${title}</p>
        <p class="text-sm text-gray-600">
          ${price} x 3 <span class="font-bold text-black">${price}</span>
        </p>
      </div>
      <button class="ml-auto text-red-500 hover:text-red-700 delete-btn">🗑️</button>
    </div>
  `;

  const cartContent = document.getElementById("cart-content");

  // Remove
  const emptyMsg = cartContent.querySelector(".item-cart-content");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  // Append the new item
  cartContent.innerHTML += cartItemContent;
}
