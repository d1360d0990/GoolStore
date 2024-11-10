async function fetchProducts() {
    const response = await fetch('./products');
    const products = await response.json();

    const block1 = document.getElementById('block1');
    const block2 = document.getElementById('block2');

    products.slice(0, 5).forEach(product => {
      block1.innerHTML += `
        <div class="card">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p><strong>Precio:</strong> $${product.price}</p>
        </div>
      `;
    });

    products.slice(5, 10).forEach(product => {
      block2.innerHTML += `
        <div class="card">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p><strong>Precio:</strong> $${product.price}</p>
        </div>
      `;
    });
  }

  fetchProducts();