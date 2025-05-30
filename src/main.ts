const mainImage = document.getElementById("main-image") as HTMLImageElement;

const thumbnails = document.querySelectorAll(".thumbnail");

const cartImage = document.getElementById("cart-image");
const cartContent = document.getElementById("cart-content");
// const itemTitle = document.getElementsByClassName("item-title");
// const itemPrice = document.getElementsByClassName("item-price");
const quantityCount = document.querySelector(
  ".quantity-count"
) as HTMLDivElement;

const minusBtn = document.querySelector(".minusButton") as HTMLButtonElement;
const plusBtn = document.querySelector(".plusButton") as HTMLButtonElement;

const originalSrc = mainImage.src; // Store the original image

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("mouseover", () => {
    mainImage.src = thumbnail.src;
  });

  thumbnail.addEventListener("mouseout", () => {
    mainImage.src = originalSrc;
  });
});

let count = 1;
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

function addToCartCLicked(event) {
  let button = event.target;
  let item = button.closest(".item");

  let title = item.getElementsByClassName("item-title")[0]?.innerText;
  let price = item.getElementsByClassName("item-price")[0]?.innerText;
  let quantity = item.getElementsByClassName("quantity-count");
  const mainImage = document.getElementsByClassName("main-image")[0]?.src;
  // console.log(mainImage);
  console.log(title, price, mainImage, quantityCount);
  addItemToCart(title, price, mainImage, quantityCount);
}

function addItemToCart(title, price, mainImage) {
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

  // Remove the curent text
  const emptyMsg = cartContent.querySelector(".item-cart-content");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  // Append the new item
  cartContent.innerHTML += cartItemContent;
}
