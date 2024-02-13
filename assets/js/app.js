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
}