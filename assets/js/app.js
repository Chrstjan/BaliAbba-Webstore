const cardsContainer = document.getElementById("cardsContainer");
const hamburgerElement = document.getElementById("hamburger");

let allProducts = null;

getCategoryData();
getProductData();

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
    })

    .catch((error) => {
      console.log("Error fetching product data:", error);
    });
}

function recivedCategoryData(categoryData) {
  // const categoryArray = categoryData.map(category => [category]);
  console.log(categoryData);

  buildSidebar(categoryData);
}

function recivedProductData(productData) {
  allProducts = productData.products;
  console.log(allProducts);

  //Random featured products
  const featuredProductsArray = [];
  featuredProductsArray.push(
    allProducts[2],
    allProducts[Math.floor(Math.random() * allProducts.length)],
    allProducts[Math.floor(Math.random() * allProducts.length)]
  );

  buildProductCard(featuredProductsArray);
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
                <span class="rating"><p>${product.rating}</p><p>(${randRatingAmount} reviews)</p></span>
                <span class="price"><h4>${product.price} £</h4><button>Add to cart</button></span>
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
    const randRatingAmount = Math.floor(Math.random() * 3500 + 1);
    let smallProductImages = clickedProduct.images;

    let productImages = "";
    smallProductImages.forEach((img) => {
      productImages += `<img class="small-img" src="${img}">`;
    });

    let detailedProductCard = `
        <figure class="product-card">
            <header>${clickedProduct.title}</header>
            <img src="${clickedProduct.thumbnail}">
            <figcaption>
                <div class="small-images">
                    ${productImages}
                </div>
                <span class="rating">
                    <p>${clickedProduct.rating}</p>
                    <p>(${randRatingAmount} reviews)</p>
                </span>
                <h4>${clickedProduct.price}</h4>
                <span class="price">
                    <div class="amount">
                        <button id="subtract-btn">-</button>
                        <p class="amount-text">0</p>
                        <button id="add-btn">+</button>
                    </div>
                    <button>Add to cart</button>
                </span>
                <h3>${clickedProduct.description}</h3>
                <footer>
                    <h5>${clickedProduct.stock} in stock</h5>
                </footer>
            </figcaption>
        </figure>`;
    cardsContainer.innerHTML = detailedProductCard;
  }
}

//Temp navigation
function buildSidebar(categoryData) {
  //Code is temp will be remade later
  let navigation = `<button onclick="navigationCallBack('all')">All</button>`;
  hamburgerElement.innerHTML += navigation;

  categoryData.forEach((category) => {
    let navigation = `<button onclick="navigationCallBack('${category}')">${category}</button>`;

    hamburgerElement.innerHTML += navigation;
  });
}

function navigationCallBack(clickedCategory) {
  if (clickedCategory == "all") {
    buildProductCard(allProducts);
  } else {
    let clickedSubCategoryArray = [];

    allProducts.forEach((product) => {
      if (product.category == clickedCategory) {
        clickedSubCategoryArray.push(product);
      }
    });

    buildProductCard(clickedSubCategoryArray);
  }
}
