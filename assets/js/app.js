function getCategoryData() {
    fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(json => console.log(json))

    //recivedCategoryData(json);
}