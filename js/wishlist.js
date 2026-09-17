/**
 * LUMÉRA BEAUTY — WISHLIST ENGINE
 * Manages favorites, localStorage persistence, and move-to-cart operations.
 */

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('lumera_wishlist')) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem('lumera_wishlist', JSON.stringify(wishlist));
  if (typeof updateGlobalCounters === 'function') {
    updateGlobalCounters();
  }
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let isAdded = false;

  if (index > -1) {
    wishlist.splice(index, 1);
    if (typeof showToast === 'function') {
      showToast('Removed product from your wishlist', 'info');
    }
  } else {
    wishlist.push(productId);
    isAdded = true;
    if (typeof showToast === 'function') {
      showToast('Added product to your wishlist ❤️', 'success');
    }
  }

  saveWishlist(wishlist);
  
  // Re-render if on wishlist page
  if (document.getElementById('wishlistProductsGrid')) {
    renderWishlistPage();
  }

  return isAdded;
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  saveWishlist(wishlist);
  if (typeof showToast === 'function') {
    showToast('Product removed from wishlist', 'info');
  }
  renderWishlistPage();
}

function moveWishlistToCart(productId) {
  if (typeof addToCart === 'function') {
    addToCart(productId, 1);
  }
  removeFromWishlist(productId);
}

function renderWishlistPage() {
  const grid = document.getElementById('wishlistProductsGrid');
  const emptyState = document.getElementById('wishlistEmptyState');
  const countHeader = document.getElementById('wishlistCountHeader');

  if (!grid || !emptyState || typeof getProductById !== 'function') return;

  const wishlist = getWishlist();
  const products = wishlist.map(id => getProductById(id)).filter(p => p !== undefined);

  if (countHeader) {
    countHeader.textContent = `(${products.length} Items)`;
  }

  if (products.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  emptyState.style.display = 'none';

  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-thumb-wrap">
        <button class="btn-wishlist active" onclick="removeFromWishlist(${product.id})" aria-label="Remove from Wishlist">
          <i class="fa-solid fa-heart"></i>
        </button>
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
      </div>
      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-price-row">
          <span class="price-current">₹${product.price}</span>
          ${product.oldPrice ? `<span class="price-old">₹${product.oldPrice}</span>` : ''}
          ${product.discount ? `<span class="price-discount">${product.discount}% OFF</span>` : ''}
        </div>
        <div class="product-actions" style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn btn-primary btn-full" onclick="moveWishlistToCart(${product.id})">
            <i class="fa-solid fa-bag-shopping"></i> Move to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('wishlistProductsGrid')) {
    renderWishlistPage();
  }
});
