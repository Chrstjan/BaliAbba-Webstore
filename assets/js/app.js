//#region GLOBAL code
const cardsContainer = document.getElementById("cardsContainer");
const companyName = document.getElementById("company-name");
const hamburgerBtn = document.getElementById("hamburger");
const mainNav = document.getElementById("main-list");
const shoppingCartElement = document.getElementById("basket-img");
const cartAmount = document.getElementById("cartAmount");
const domBody = document.body;

//#region click eventListeners
companyName.addEventListener("click", () => {
  buildProductCard(featuredProductsArray);
});

hamburgerBtn.addEventListener("click", () => {
  mainNav.classList.toggle("show-nav");
  domBody.classList.toggle("no-scroll");
});

shoppingCartElement.addEventListener("click", () => {
  showShoppingCart();
});
//#endregion click eventListeners//

//#region arrays
let navigationArray = [];
let allProducts = null;
let featuredProductsArray = [];
let productsInCart = [];
//#endregion arrays

//#region calling functions
Init();

function Init() {
  buildLoadingAnimation();
  getCategoryData();
  getProductData();
  checkShoppingCart();
  updateCartAmount();
}

//#endregion calling functions

//#endregion GLOBAL code

//#region model code
function getCategoryData() {
  fetch("https://dummyjson.com/products/categories?limit=0")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      recivedCategoryData(json);
    })
    .catch((error) => {
      console.log("Error fetching category data:", error);
    });
}

function getProductData() {
  fetch("https://dummyjson.com/products?limit=0")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      recivedProductData(json);
      removeLoadingAnimation();
    })
    .catch((error) => {
      console.log("Error fetching product data:", error);
    });
}

function getLocalStorage(key) {
  let localData = localStorage.getItem(key);
  return JSON.parse(localData || "[]");
}

function setLocalStorage(key, value) {
  let serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
}

//#endregion model code

//#region controller code
function recivedCategoryData(categoryData) {
  // const categoryArray = categoryData.map(category => [category]);
  console.log(categoryData);

  let allCategories = categoryData;

  let eletronicDevices = [];
  let homeDecoration = [];
  let clothes = [];
  let accessories = [];
  let skinCare = [];
  let vehicles = [];
  let grocery = [];
  let misc = [];

  allCategories.forEach((category) => {
    switch (category) {
      case "smartphones":
      case "laptops": {
        eletronicDevices.push(category);
        break;
      }

      case "home-decoration":
      case "furniture":
      case "lighting": {
        homeDecoration.push(category);
        break;
      }

      case "tops":
      case "womens-dresses":
      case "womens-shoes":
      case "mens-shirts":
      case "mens-shoes": {
        clothes.push(category);
        break;
      }

      case "mens-watches":
      case "womens-watches":
      case "womens-bags":
      case "womens-jewellery":
      case "sunglasses": {
        accessories.push(category);
        break;
      }

      case "fragrances":
      case "skincare": {
        skinCare.push(category);
        break;
      }

      case "automotive":
      case "motorcycle": {
        vehicles.push(category);
        break;
      }

      case "groceries": {
        grocery.push(category);
        break;
      }

      default: {
        misc.push(category);
        break;
      }
    }
  });
  // console.log(eletronicDevices);

  navigationArray = [
    {
      supCategory: "Eletronic Devices",
      subCategory: eletronicDevices,
    },
    {
      supCategory: "Home Decoration",
      subCategory: homeDecoration,
    },
    {
      supCategory: "Clothes",
      subCategory: clothes,
    },
    {
      supCategory: "Accesories",
      subCategory: accessories,
    },
    {
      supCategory: "Skin Care",
      subCategory: skinCare,
    },
    {
      supCategory: "Vehicles",
      subCategory: vehicles,
    },
    {
      supCategory: "Grocery",
      subCategory: grocery,
    },
  ];

  // buildSidebar(categoryData);
  buildSidebar(navigationArray);
}

function recivedProductData(productData) {
  allProducts = productData.products;
  console.log(allProducts);

  //Random featured products
  featuredProductsArray.push(
    allProducts[2],
    allProducts[Math.floor(Math.random() * allProducts.length)],
    allProducts[Math.floor(Math.random() * allProducts.length)]
  );

  buildProductCard(featuredProductsArray);
}

function navigationCallBack(clickedCategory) {
  if (clickedCategory == "all") {
    buildProductCard(allProducts);
  } else if (clickedCategory == "allCategories") {
    buildCategoryCard(navigationArray);
  } else {
    let clickedSubCategoryArray = [];

    navigationArray.forEach((subCategory) => {
      if (subCategory.subCategory == clickedCategory) {
        clickedSubCategoryArray.push(subCategory);
      }
    });

    console.log(clickedSubCategoryArray);
    // buildProductCard(clickedSubCategoryArray);
    buildCategoryCard(clickedSubCategoryArray);
  }
}

function subCategoryCallback(clickedSubCategory) {
  // console.log(clickedSubCategory);
  let combinedStrings = clickedSubCategory;
  const seperator = ",";

  const seperateStringsArray = combinedStrings.split(seperator);
  // console.log(seperateStringsArray);

  let subProductsArray = [];
  allProducts.forEach((product) => {
    seperateStringsArray.forEach((subCategory) => {
      if (product.category.includes(subCategory.trim())) {
        subProductsArray.push(product);
      }
    });
  });
  // console.log(subProductsArray);
  buildProductCard(subProductsArray);
}

function cartCallback(clickedProduct) {
  // console.log(clickedProduct);
  let productToAdd = allProducts.find(
    (product) => product.id == clickedProduct
  );

  if (productToAdd) {
    updateShoppingCart(productToAdd);
  }
}

function checkShoppingCart() {
  const cartArray = getLocalStorage("cartArray");
  if (!cartArray || cartArray.length === 0) {
    displayEmptyCartMessage();
  }
}

function updateCartAmount() {
  const cartArray = getLocalStorage("cartArray");
  const cartProductCount = cartArray.length;
  cartAmount.textContent = cartProductCount;

  if (cartProductCount === 0) {
    cartAmount.textContent = "";
  }
}

function updateShoppingCart(productToAdd) {
  let shoppingCartArray = getLocalStorage("cartArray");

  shoppingCartArray.push(productToAdd);
  setLocalStorage("cartArray", shoppingCartArray);

  checkShoppingCart();
  updateCartAmount();
}

function showShoppingCart() {
  let shoppingCartArray = getLocalStorage("cartArray");
  checkShoppingCart();
  buildShoppingCart(shoppingCartArray);
}

function removeFromCart(clickedProduct) {
  let shoppingCartArray = getLocalStorage("cartArray");

  const productToRemove = shoppingCartArray.findIndex(
    (product) => product.id == clickedProduct
  );

  if (productToRemove !== -1) {
    shoppingCartArray.splice(productToRemove, 1);
    setLocalStorage("cartArray", shoppingCartArray);
    buildShoppingCart(shoppingCartArray);

    checkShoppingCart();
  }
  updateCartAmount();
}

function categoryCallback(clickedSubCategory) {
  let clickedProductCategory = [];
  allProducts.forEach((product) => {
    if (product.category == clickedSubCategory) {
      clickedProductCategory.push(product);
    }
  });
  // console.log(clickedProductCategory);
  buildProductCard(clickedProductCategory);
}

function breadcrumbCallback(breadcrumb) {
  const filteredProducts = allProducts.filter(
    (product) => product.category === breadcrumb
  );
  buildProductCard(filteredProducts);
  //#region old hardcoded code
  /*let breadcrumbArray = [];
  allProducts.forEach((product) => {
    if (product.category == breadcrumb) {
      switch (breadcrumb) {
        case "smartphones": {
          breadcrumbArray.push(product);
          buildProductCard(breadcrumbArray);
          break;
        }

        case "laptops": {
          breadcrumbArray.push(product);
          buildProductCard(breadcrumbArray);
          break;
        }

        case "fragrances": {
          breadcrumbArray.push(product);
          buildProductCard(breadcrumbArray);
          break;
        }

        case "skincare": {
          breadcrumbArray.push(product);
          buildProductCard(breadcrumbArray);
          break;
        }
      }
    }
  });
  console.log(breadcrumbArray); */
  //#endregion old code
}

function removeLoadingAnimation() {
  const loadingContainer = document.querySelector(".loading-container");
  if (loadingContainer) {
    loadingContainer.remove();
  }
}
//#endregion controller code

//#region view code

function buildLoadingAnimation() {
  //This is only temp testing
  cardsContainer.innerHTML = "";

  const loadingAnimation = `
  <div class="loading-container">
    <div class="loading"></div>
    <h2>Loading...</h2>
  </div>`;

  cardsContainer.innerHTML = loadingAnimation;
}

function buildSidebar(categoryData) {
  let topNavigation = `<input class="search-bar" type="text" placeholder="Search Product" min-length="1" max-length="32" />`;
  let subTopNavigation = `
    <span class="top-nav">
      <li class="sidebar-nav"><button onclick="buildProductCard(featuredProductsArray)">Home</button></li>
      <li class="sidebar-nav"><button onclick="navigationCallBack('allCategories')">Categories</button></li>
      <li class="sidebar-nav"><button>Login</button></li>
    </span>`;
  let navigation = `
    <li class="sidebar-category">
      <button onclick="navigationCallBack('all')">All Products</button>
    </li>`;
  mainNav.innerHTML += topNavigation;
  mainNav.innerHTML += subTopNavigation;
  mainNav.innerHTML += navigation;

  categoryData.forEach((category) => {
    let navigation = `
      <li class="sidebar-category">
        <button onclick="navigationCallBack('${category.subCategory}')">
          ${category.supCategory}
        </button>
        <ul class="sub-categories-list">
          <li class="sidebar-sub-category">
            ${category.subCategory
              .map(
                (subCat) => `
              <button onclick="subCategoryCallback('${subCat}')">
                ${subCat}
              </button>
            `
              )
              .join("")}
          </li>
        </ul>
      </li>`;

    mainNav.innerHTML += navigation;
  });
}

function displayEmptyCartMessage() {
  cardsContainer.innerHTML = "";

  let emptyMessage = `
    <article class="empty-cart-container">
      <header>
        <h3>Whoops your cart is empty!</h3>
      </header>
      <p>Check out some of our featured products</p>
      <div class="product-container">
        <button onclick="buildProductCard(featuredProductsArray)">See Products</button>
      </div>
    </article>`;
  cardsContainer.innerHTML += emptyMessage;
}

function buildShoppingCart(shoppingCart) {
  //console.log(shoppingCart);
  cardsContainer.innerHTML = "";

  checkShoppingCart();

  let shoppingCartContainer = document.createElement("div");
  shoppingCartContainer.classList.add("shopping-cart-container");

  let totalPrice = 0;
  const randRatingAmount = Math.floor(Math.random() * 3500 + 1);

  shoppingCart.forEach((product) => {
    let cartProduct = `
      <figure class="cart-product">
        <div class="header-container">
          <header class="product-header">
            <h2>${product.title}</h2>
            <span><p>${product.brand}</p></span>
          </header>
          <img src="${product.thumbnail}" alt="${product.title}" />
        </div>
        <figcaption>
          <span class="description-container">
            <h5>${product.description}</h5>
            <span class="rating-container">
                    <span class="star-amount">
                        <p>${product.rating}</p>
                        <p class="star">&starf;</p>
                    </span>
                    <p>(${randRatingAmount} reviews)</p>
                </span>
          </span>
          <span class="btn-container">
            <div class="add-subtract-container">
              <button id="subtract-btn">-</button>
              <p>1</p>
              <button id="add-btn">+</button>
            </div>
            <span class="product-price">
              <h4>${product.price} £</h4>
            </span>
            <div class="remove-container">
              <button id="remove-btn" onclick="removeFromCart('${product.id}')">-</button>
            </div>
          </span>
        </figcaption>
      </figure>
    `;
    shoppingCartContainer.innerHTML += cartProduct;

    totalPrice += parseFloat(product.price);
  });

  let cartPrice = `
      <section class="total-price-container">
       <header class="total-price">
         <h4>Vat:</h4>
         <span><p>${totalPrice} £</p></span>
        </header>
        <div class="discount-container">
          <header><h3>Add giftcard or campaign code</h3></header>
          <input type="text" placeholder="Input Code *" />
          <button type="submit" class="submit-btn">Add</button>
        </div>
        <footer class="total-price-footer">
          <h3>Total:</h3>
          <span>
            <p>${totalPrice} £</p>
          </span>
        </footer>
      </section>`;

  shoppingCartContainer.innerHTML += cartPrice;

  let checkout = `
    <footer class="checkout-container">
      <button>Checkout</button>
    </footer>`;
  shoppingCartContainer.innerHTML += checkout;
  cardsContainer.appendChild(shoppingCartContainer);
}

function buildCategoryCard(subCategories) {
  cardsContainer.innerHTML = "";
  // console.log(subCategories);

  subCategories.forEach((supCategory) => {
    let CategoryContainer = document.createElement("div");
    CategoryContainer.classList.add("category-container");
    CategoryContainer.innerHTML = `<header><h2>${supCategory.supCategory}</h2></header>`;
    cardsContainer.appendChild(CategoryContainer);

    supCategory.subCategory.forEach((subCategory) => {
      let categoryCard = `
        <div class="sub-category">
          <button class="sub-category-name" onclick="categoryCallback('${subCategory}')">
            ${subCategory}
          </button>
        </div>`;
      CategoryContainer.innerHTML += categoryCard;
    });
  });
}

function buildProductCard(featuredProducts) {
  cardsContainer.innerHTML = "";
  console.log(featuredProducts);

  featuredProducts.forEach((product) => {
    const randRatingAmount = Math.floor(Math.random() * 3500 + 1);

    let productCard = `
        <figure class="product-card" onclick="buildProductDetails(${product.id})">
            <header><h2>${product.title}</h2></header>
            <img src="${product.thumbnail}">
            <figcaption>
                <span class="rating">
                    <span class="star-amount">
                        <p>${product.rating}</p>
                        <p class="star">&starf;</p>
                    </span>
                    <p>(${randRatingAmount} reviews)</p>
                </span>
                <span class="price">
                  <h4>${product.price} £</h4>
                  <button onclick="cartCallback(${product.id})">
                    Add to cart
                  </button>
                </span>
                <h3>${product.description}</h3>
                <footer>
                    <h5>${product.stock} in stock</h5>
                </footer>
            </figcaption>
        </figure>
        `;
    cardsContainer.innerHTML += productCard;
  });
}

function buildProductDetails(productId) {
  cardsContainer.innerHTML = "";
  let clickedProduct = null;
  console.log(productId);

  allProducts.forEach((product) => {
    if (product.id == productId) {
      clickedProduct = product;
    }
  });

  console.log(clickedProduct);

  if (clickedProduct == null) {
    alert("lol");
  } else {
    buildCard(clickedProduct);
  }

  function buildCard(clickedProduct) {
    let backBtn = `<button onclick="breadcrumbCallback('${clickedProduct.category}')" class="back-btn">&larr;</button>`;

    const randRatingAmount = Math.floor(Math.random() * 3500 + 1);
    let smallProductImages = clickedProduct.images;

    let productImages = "";
    smallProductImages.forEach((img) => {
      productImages += `<img class="small-img" src="${img}">`;
    });

    let detailedProductCard = `
        <figure class="product-card product-card-details">
            <header><h2>${clickedProduct.title}</h2></header>
            <img src="${clickedProduct.thumbnail}">
            <figcaption>
                <div class="small-images">
                    ${productImages}
                </div>
                <span class="rating">
                    <span class="star-amount">
                        <p>${clickedProduct.rating}</p>
                        <p class="star">&starf;</p>
                    </span>
                    <p>(${randRatingAmount} reviews)</p>
                </span>
                <div class="product-price-container">
                  <h4>${clickedProduct.price} £</h4>
                  <span class="price">
                    <div class="amount">
                        <button id="subtract-btn">-</button>
                        <p class="amount-text">1</p>
                        <button id="add-btn">+</button>
                    </div>
                    <button onclick="cartCallback(${clickedProduct.id})">Add to cart
                    </button>
                  </span>
                  <h3>${clickedProduct.description}</h3>
                  <footer>
                    <h5>${clickedProduct.stock} in stock</h5>
                  </footer>
                </div>
            </figcaption>
        </figure>`;
    cardsContainer.innerHTML += backBtn;
    cardsContainer.innerHTML += detailedProductCard;
  }
}

//#endregion view code
