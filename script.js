const products = [
    {
        name: "iPhone 17",
        image: "image/Iphone17.png",
        prices: [
            { store: "Amazon", price: 999 },
            { store: "Best Buy", price: 979 },
            { store: "Apple Store", price: 1099 }
        ]
    },
    {
        name: "Samsung Galaxy S25",
        image: "image/galaxy-s25.webp",
        prices: [
            { store: "Amazon", price: 899 },
            { store: "Best Buy", price: 879 },
            { store: "Samsung Store", price: 949 }
        ]
    },
    {
        name: "MacBook Air M4 (2025)",
        image: "image/macbook-air-m4-2025.jpeg",
        prices: [
            { store: "Amazon", price: 999 },
            { store: "Best Buy", price: 979 },
            { store: "Apple Store", price: 1099 }
        ]
    },
    {
        name: "Sony WH-1000XM6 Headphones",
        image: "image/WH1000XM6.webp",
        prices: [
            { store: "Amazon", price: 449 },
            { store: "Best Buy", price: 429 },
            { store: "Sony Store", price: 479 }
        ]
    }
];

function getLowestPrice(prices) {
    return Math.min(...prices.map(p => p.price));
}

function displayProducts(filteredProducts) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (filteredProducts.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">មិនមានផលិតផលត្រូវគ្នាទេ។ សូមសាកល្បងស្វែងរកម្ដងទៀត!</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const lowest = getLowestPrice(product.prices);

        let pricesHTML = '';
        product.prices.forEach(p => {
            const isBest = p.price === lowest ? 'best-price' : '';
            pricesHTML += `<div class="price-item ${isBest}">${p.store}: $${p.price}</div>`;
        });

        const cardHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price-list">${pricesHTML}</div>
                <p><strong>តម្លៃល្អបំផុត៖ $${lowest}</strong></p>
            </div>
        `;

        resultsDiv.innerHTML += cardHTML;
    });
}

displayProducts(products);

// Search & sort events
document.getElementById('searchBtn').addEventListener('click', filterAndSort);
document.getElementById('searchInput').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') filterAndSort();
});

document.getElementById('sortSelect').addEventListener('change', filterAndSort);

function filterAndSort() {
    let filtered = products;

    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (query) {
        filtered = products.filter(p => p.name.toLowerCase().includes(query));
    }

    const sortValue = document.getElementById('sortSelect').value;
    if (sortValue === 'low') {
        filtered.sort((a, b) => getLowestPrice(a.prices) - getLowestPrice(b.prices));
    } else if (sortValue === 'high') {
        filtered.sort((a, b) => getLowestPrice(b.prices) - getLowestPrice(a.prices));
    }

    displayProducts(filtered);
}