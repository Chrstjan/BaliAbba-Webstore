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
    .then(json => console.log(json))

    //recivedProductData(json);
}

function recivedCategoryData(categoryData) {
    console.log(categoryData);
}