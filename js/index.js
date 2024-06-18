// register
function togglePasswordVisibility(inputId) {
    var input = document.getElementById(inputId);
    var icon = input.nextElementSibling;  // Assuming the icon is next to the input
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}


// login
function togglePasswordVisibility(inputId) {
    var input = document.getElementById(inputId);
    var icon = input.nextElementSibling;  // Assuming the icon is next to the input
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Products for the first row
    const products1 = [
        { name: "Bali Kintamani", weight: "500 gram", image: "image/bean1.png" },
        { name: "Java Aromanis", weight: "500 gram", image: "image/bean2.png" },
        { name: "Aceh Gayo", weight: "500 gram", image: "image/bean3.png" },
        { name: "Sidikalang", weight: "500 gram", image: "image/bean4.png" },
        { name: "Bali Kintamani", weight: "500 gram", image: "image/bean1.png" },
        { name: "Java Aromanis", weight: "500 gram", image: "image/bean2.png" },
        { name: "Aceh Gayo", weight: "500 gram", image: "image/bean3.png" },
        { name: "Sidikalang", weight: "500 gram", image: "image/bean4.png" },
        { name: "Sidikalang", weight: "500 gram", image: "image/bean4.png" },
        { name: "Aceh Gayo", weight: "500 gram", image: "image/bean3.png" },
        { name: "Java Aromanis", weight: "500 gram", image: "image/bean2.png" },
        { name: "Bali Kintamani", weight: "500 gram", image: "image/bean1.png" }
        
    ];

    // Different products for the second row
    const products2 = [
        { name: "Breville - Coffee Machine Dual", weight: "500 gram", image: "image/machine1.png" },
        { name: "Gaggia Classic 2019 - Coffe Machine", weight: "500 gram", image: "image/machine2.png" },
        { name: "Breville - The Oracle Espresso ", weight: "500 gram", image: "image/machine3.png" },
        { name: "La Marzocco - Home Espresso ", weight: "500 gram", image: "image/machine4.png" },
        { name: "La Marzocco - Home Espresso ", weight: "500 gram", image: "image/machine4.png" },
        { name: "Breville - The Oracle Espresso ", weight: "500 gram", image: "image/machine3.png" },
        { name: "Gaggia Classic 2019 - Coffe Machine", weight: "500 gram", image: "image/machine2.png" },
        { name: "Breville - Coffee Machine Dual", weight: "500 gram", image: "image/machine1.png" }
        
    ];

    initPaginationAndDisplay('productContainer1', products1, 'pagination1');
    initPaginationAndDisplay('productContainer2', products2, 'pagination2');

    function initPaginationAndDisplay(containerId, products, paginationId) {
        let currentPage = 1;
        const productsPerPage = 4;
        const totalPages = Math.ceil(products.length / productsPerPage);
        displayProducts(containerId, products, currentPage, productsPerPage);
        updatePagination(paginationId, currentPage, totalPages, containerId, products, productsPerPage);
    }

    function displayProducts(containerId, products, currentPage, productsPerPage) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        products.slice(start, end).forEach(product => {
            const card = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${product.name}
                                <span class="product-heart"><i class="fa-solid fa-heart fs-3"></i></span>
                            </h5>
                            <p class="card-text">(${product.weight})</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="#" class="btn btn-outline-dark btn-sm text-light" style="background-color:#3B2621; width:150px;">See More</a>
                                <button class="btn btn-sm btn-lg">
                                    <i class="fa-solid fa-cart-shopping fs-3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }

// ulasan
    function updatePagination(paginationId, currentPage, totalPages, containerId, products, productsPerPage) {
        const pagination = document.getElementById(paginationId);
        pagination.innerHTML = '';
    
        const createPageItem = (page, text, isActive, isDisabled) => {
            const li = document.createElement('li');
            li.className = `page-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`;
            const link = document.createElement('a');
            link.className = 'page-link';
            link.href = '#';
            link.innerText = text;
            link.addEventListener('click', (event) => {
                event.preventDefault();
                if (!isDisabled) {
                    displayProducts(containerId, products, page, productsPerPage);
                    updatePagination(paginationId, page, totalPages, containerId, products, productsPerPage);
                }
            });
            li.appendChild(link);
            return li;
        };
    
        // Previous button
        pagination.appendChild(createPageItem(currentPage - 1, '❮', false, currentPage === 1));
    
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pagination.appendChild(createPageItem(i, i, currentPage === i, false));
            }
        } else {
            // Always show the first page
            pagination.appendChild(createPageItem(1, '1', currentPage === 1, false));
            // Logic for showing the dots
            if (currentPage > 4) {
                pagination.appendChild(createPageItem(null, '...', true, true));
            }
    
            // Show the current page minus one to the current page plus one
            let startPage = currentPage > 4 ? currentPage - 1 : 2;
            let endPage = currentPage < totalPages - 3 ? currentPage + 1 : totalPages - 1;
            for (let i = startPage; i <= endPage; i++) {
                pagination.appendChild(createPageItem(i, i, currentPage === i, false));
            }
    
            // Logic to show the dots towards the end
            if (currentPage < totalPages - 3) {
                pagination.appendChild(createPageItem(null, '...', true, true));
            }
    
            // Always show the last page
            pagination.appendChild(createPageItem(totalPages, totalPages, currentPage === totalPages, false));
        }
    
        // Next button
        pagination.appendChild(createPageItem(currentPage + 1, '❯', false, currentPage === totalPages));
    }
    
});
