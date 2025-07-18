document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    loader.style.display = 'none';

    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
            loader.style.display = 'none';
        });


    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price.toLocaleString()} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Inefficient Search
    searchInput.addEventListener('keyup', () => {
        // เป็นอันนี้ทำการตัดช่องเวลา Dev B
        // 1.ปรับปรุงการค้นหา
        // const searchTerm = searchInput.value.toLowerCase(); ทำการแก้ไข
        //เป็นอันนี้
        const searchTerm = searchInput.value.trim().toLowerCase();

        // 2.เพิ่ม Validation (จำลอง)
        if (searchTerm === "") {
            displayProducts(allProducts); // แสดงสินค้าทั้งหมด
            return;
        }

        const filteredProducts = allProducts.filter(product => {
            // Simple search, not very efficient
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });
});
