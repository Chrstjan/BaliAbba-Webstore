getCategoryData();
getProductData();

function getCategoryData() {
    fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(json => console.log(json))

    //recivedCategoryData(json);
}

function getProductData() {
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(json => console.log(json))

    //recivedProductData(json);
}