const cardsContainer = document.getElementById("cardsContainer");

getCategoryData();
getProductData();

function getCategoryData() {
    fetch('https://dummyjson.com/products/categories?limit=0')
    .then(response => {
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
        return response.json()
     })
    .then(json => {
        recivedCategoryData(json);
    })
    .catch(error => {
        console.log('Error fetching category data:', error);
    });
}

function getProductData() {
    fetch('https://dummyjson.com/products?limit=0')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } 
        return response.json() 
     })

    .then(json => {
        recivedProductData(json);
    })

    .catch(error => {
        console.log('Error fetching product data:', error);
    });
}

function recivedCategoryData(categoryData) {
    const categoryArray = categoryData.map(category => [category]);
    console.log(categoryArray);
}

function recivedProductData(productData) {
    const allProducts = productData.products;
    console.log(allProducts);

    //Random featured products
    const featuredProductsArray = [];
    featuredProductsArray.push(
     allProducts[Math.floor(Math.random() * allProducts.length)],
     allProducts[Math.floor(Math.random() * allProducts.length)], 
     allProducts[Math.floor(Math.random() * allProducts.length)]
     );

     buildProductCard(featuredProductsArray);
}

function buildProductCard(featuredProducts) {
    console.log(featuredProducts);

    featuredProducts.forEach((product) => {
        const randRatingAmount = Math.floor(Math.random() * 3500 + 1)

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
        `
        ;
        cardsContainer.innerHTML += productCard;
    });
}

function buildProductDetails(productData) {
    cardsContainer.innerHTML = "";

    console.log(productData);
}