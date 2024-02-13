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
    const cardsContainer = document.getElementById("cardsContainer");

    console.log(featuredProducts);

    featuredProducts.forEach((product) => {

        const appendChildren = ((parent, elements) => {
            elements.forEach((element) => {
                parent.appendChild(element);
            });
        });

        const cardContainer = document.createElement("div");
        const cardHeaderText = document.createElement("h2");
        cardHeaderText.textContent = product.title;

        const cardThumbnail = document.createElement("img");
        cardThumbnail.src = product.thumbnail;

        const cardRatingContainer = document.createElement("span");

        const cardStarRating = document.createElement("p");
        cardStarRating.textContent = product.rating;

        const randRatingAmount = Math.floor(Math.random() * 300 + 1)

        const cardRatingAmount = document.createElement("p");
        cardRatingAmount.textContent = `(${randRatingAmount} reviews)`;

        appendChildren(cardRatingContainer, [
            cardStarRating,
            cardRatingAmount
        ]);

        appendChildren(cardContainer, [
            cardContainer.appendChild(cardHeaderText),
            cardContainer.appendChild(cardThumbnail),
            cardContainer.appendChild(cardRatingContainer)
        ]);
        
        cardsContainer.appendChild(cardContainer);
    })
}