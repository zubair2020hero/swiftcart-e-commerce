const loadCategory = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((json) => {
            displayCategory(json);
            loadAllProducts();
        });
};

loadCategory();

const displayCategory = (categories) => {
    const productsTab = document.getElementById("products-tab");
    productsTab.innerHTML = "";

    const allBtnDiv = document.createElement("div");
    allBtnDiv.innerHTML = `
        <button onclick="loadAllProducts()" class="btn btn-outline btn-primary capitalize">All</button>
    `;
    productsTab.append(allBtnDiv);

    for (let category of categories) {
       
        const categoryBtn = document.createElement("div");
        categoryBtn.innerHTML = `
            <button id="${category}" onclick="loadLevelcategory('${category}')" class="btn btn-outline btn-primary capitalize">${category}</button>
        `;

        productsTab.append(categoryBtn);
    }
};

const loadAllProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => displayProducts(data));
};

const loadLevelcategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => displayProducts(data));
};

const displayProducts = (products) => {
    const productsCart = document.getElementById("products-cart");
    productsCart.innerHTML = "";

    products.forEach(product => {
        const cart = document.createElement("div");
        cart.className = "card bg-base-100 shadow-md";

        cart.innerHTML = `
            <div class="trending-item rounded-md">
                    <div class="trending-item-img grid justify-center p-5 rounded-t-lg">
                        <img src="${product.image}" alt="">
                    </div>
                    <div class="trending-item-text p-7 rounded-b-lg">
                        <div class="flex justify-between pb-5">
                            <span class="py-1 px-2 bg-slate-400 rounded-3xl text-xs font-semibold text-sky-700">${product.category}</span>
                            <span class="text-xs"><i class="fa-solid fa-star text-yellow-300"></i> 3.9 (120)</span>
                        </div>
                        <h5 class="font-medium pb-1">${product.title}</h5>
                        <h4 class="font-bold text-xl">$ ${product.price}</h4>
                        <div class="pt-7 grid grid-cols-2 gap-2">
                            <button class="btn btn-outline btn-primary px-13"><i class="fa-regular fa-eye"></i>
                                Details</button>
                            <button class="btn btn-outline btn-primary px-13"><i
                                    class="fa-solid fa-cart-shopping"></i>Add</button>
                    </div>
                </div>
            </div> <!-- end -->
        `;

        productsCart.appendChild(cart);
    });
};