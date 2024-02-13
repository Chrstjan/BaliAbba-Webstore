getCategoryData();
getProductData();

function getCategoryData() {
    fetch('https://dummyjson.com/products/categories?limit=0')
    .then(response => response.json())
    .then(json => {
        recivedCategoryData(json);
    })
}

function getProductData() {
    fetch('https://dummyjson.com/products?limit=0')
    .then(response => response.json())
    .then(json => {
        recivedProductData(json);
    })
}

function recivedCategoryData(categoryData) {
    console.log(categoryData);
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
}