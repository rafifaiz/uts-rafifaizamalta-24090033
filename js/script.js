
// Data Dummy untuk Dashboard dan Produk

const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

// Logic Utama (DOM Load Event)

document.addEventListener('DOMContentLoaded', () => {
    handleLogin();
    handleDashboard();
    handleProductList();
});

// Halaman Login (index.html) Logic

function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim(); // Ini adalah NIM mahasiswa

            errorMessage.textContent = ''; 
            errorMessage.style.display = 'none';

            if (email === '' || password === '') {
                errorMessage.textContent = 'Email dan Password (NIM) tidak boleh kosong!';
                errorMessage.style.display = 'block';
            } else {
                alert('Login berhasil! Redirecting ke dashboard...');
                window.location.href = 'dashboard.html';
            }
        });
    }
}

// Halaman Dashboard

function handleDashboard() {
    const summaryCardsContainer = document.getElementById('summaryCards');
    const viewProductsBtn = document.getElementById('viewProductsBtn');

    if (summaryCardsContainer) {
        const formatRupiah = (number) => {
            return 'Rp ' + number.toLocaleString('id-ID'); 
        };

        const cardData = [
            { title: "Total Products", icon: "📦", value: summary.totalProducts.toString(), class: "products" },
            { title: "Total Sales", icon: "🛒", value: summary.totalSales.toString(), class: "sales" },
            { title: "Total Revenue", icon: "$", value: formatRupiah(summary.totalRevenue), class: "revenue" }
        ];

        cardData.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('summary-card', item.class);
            card.innerHTML = `
                <div class="card-icon">${item.icon}</div>
                <div class="card-title">${item.title}</div>
                <div class="card-value">${item.value}</div>
            `;
            summaryCardsContainer.appendChild(card);
        });
    }
    
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }
}

// Halaman List Data Produk

function handleProductList() {
    const productTableBody = document.getElementById('productTableBody');

    if (productTableBody) {
        const renderProducts = () => {
            productTableBody.innerHTML = '';

            products.forEach((product, index) => {
                const row = productTableBody.insertRow();
                row.setAttribute('data-id', product.id); 

                row.insertCell().textContent = index + 1;
                row.insertCell().textContent = product.name;
                row.insertCell().textContent = product.price.toLocaleString('id-ID');
                row.insertCell().textContent = product.stock;
                
                const actionCell = row.insertCell();
                actionCell.classList.add('action-cell');

                const editButton = document.createElement('button');
                editButton.classList.add('action-btn', 'edit-btn');
                editButton.innerHTML = '✏️';
                editButton.addEventListener('click', () => {
                    alert(`✏️ Edit produk: ${product.name}`);
                });
                actionCell.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('action-btn', 'delete-btn');
                deleteButton.innerHTML = '🗑️';
                deleteCell = actionCell.appendChild(deleteButton);
                
                deleteButton.addEventListener('click', () => {
                    if (confirm(`Yakin hapus produk **${product.name}** ini?`)) {
                        const indexToRemove = products.findIndex(p => p.id === product.id);
                        if (indexToRemove !== -1) {
                            products.splice(indexToRemove, 1);
                        }
                        row.remove();
                        renderProducts(); 
                    }
                });
            });
        };

        renderProducts(); 
    }
}