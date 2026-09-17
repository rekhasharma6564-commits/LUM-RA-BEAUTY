/**
 * LUMÉRA BEAUTY — PRODUCTS RENDERING & FILTERING MODULE
 * Dynamic rendering for product grids, shop filters, sort, search, and product details.
 */

// Helper to generate star icons
function getStarsHTML(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  let stars = '';
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalf) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="fa-regular fa-star"></i>';
  }
  return stars;
}

// Generate single product card HTML
function renderProductCard(product) {
  let wishlist = [];
  try {
    wishlist = JSON.parse(localStorage.getItem('lumera_wishlist')) || [];
  } catch (e) {
    wishlist = [];
  }
  const isWishlisted = wishlist.includes(product.id);

  let badgeHTML = '';
  if (product.badge) {
    let badgeClass = '';
    if (product.badge === 'Best Seller') badgeClass = 'badge-best';
    if (product.badge === 'Sale' || product.discount >= 25) badgeClass = 'badge-sale';
    badgeHTML = `<span class="product-badge ${badgeClass}">${product.badge}</span>`;
  }

  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-brand="${product.brand}" data-price="${product.price}">
      <div class="product-thumb-wrap">
        ${badgeHTML}
        <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" onclick="handleWishlistClick(event, ${product.id})" aria-label="Add to Wishlist">
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <button class="btn-quickview" onclick="openQuickView(${product.id})">
          <i class="fa-regular fa-eye"></i> Quick View
        </button>
      </div>
      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <div class="rating-stars">${getStarsHTML(product.rating)}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price-row">
          <span class="price-current">₹${product.price}</span>
          ${product.oldPrice ? `<span class="price-old">₹${product.oldPrice}</span>` : ''}
          ${product.discount ? `<span class="price-discount">${product.discount}% OFF</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn btn-primary btn-full" onclick="handleAddToCartClick(event, ${product.id})">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global click handlers
function handleAddToCartClick(e, productId) {
  e.preventDefault();
  e.stopPropagation();
  if (typeof addToCart === 'function') {
    addToCart(productId, 1);
  }
}

function handleWishlistClick(e, productId) {
  e.preventDefault();
  e.stopPropagation();
  if (typeof toggleWishlist === 'function') {
    const isAdded = toggleWishlist(productId);
    const btn = e.currentTarget;
    if (btn) {
      if (isAdded) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    }
  }
}

// --- POPULATE HOMEPAGE PRODUCT GRIDS ---
function initHomePage() {
  const featuredGrid = document.getElementById('featuredProductsGrid');
  if (featuredGrid && typeof getFeaturedProducts === 'function') {
    const items = getFeaturedProducts(8);
    featuredGrid.innerHTML = items.map(p => renderProductCard(p)).join('');
  }

  const bestSellerGrid = document.getElementById('bestSellersGrid');
  if (bestSellerGrid && typeof getBestSellers === 'function') {
    const items = getBestSellers(8);
    bestSellerGrid.innerHTML = items.map(p => renderProductCard(p)).join('');
  }

  const newArrivalsGrid = document.getElementById('newArrivalsGrid');
  if (newArrivalsGrid && typeof getNewArrivals === 'function') {
    const items = getNewArrivals(8);
    newArrivalsGrid.innerHTML = items.map(p => renderProductCard(p)).join('');
  }
}

// --- SHOP & ALL PRODUCTS FILTERING ---
function initShopFilterEngine(defaultCategory = null, defaultBadge = null) {
  const grid = document.getElementById('shopProductsGrid');
  const countEl = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (!grid || typeof getAllProducts !== 'function') return;

  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category') || defaultCategory;
  const paramSort = urlParams.get('sort');
  const paramSearch = urlParams.get('q');
  const paramBadge = urlParams.get('badge') || defaultBadge;

  // Set selected category checkboxes if from URL
  if (paramCategory) {
    const catCheckbox = document.querySelector(`input[name="filterCategory"][value="${paramCategory}"]`);
    if (catCheckbox) catCheckbox.checked = true;
  }

  function applyFilters() {
    let list = getAllProducts().slice();

    // 1. Category filter
    const selectedCats = Array.from(document.querySelectorAll('input[name="filterCategory"]:checked')).map(cb => cb.value);
    if (selectedCats.length > 0) {
      list = list.filter(p => selectedCats.includes(p.category));
    } else if (paramCategory && !document.querySelector('input[name="filterCategory"]')) {
      list = list.filter(p => p.category.toLowerCase() === paramCategory.toLowerCase());
    }

    // 2. Brand filter
    const selectedBrands = Array.from(document.querySelectorAll('input[name="filterBrand"]:checked')).map(cb => cb.value);
    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand));
    }

    // 3. Price filter
    const minPriceInput = document.getElementById('minPriceInput');
    const maxPriceInput = document.getElementById('maxPriceInput');
    const minVal = minPriceInput ? parseFloat(minPriceInput.value) || 0 : 0;
    const maxVal = maxPriceInput ? parseFloat(maxPriceInput.value) || 99999 : 99999;
    list = list.filter(p => p.price >= minVal && p.price <= maxVal);

    // 4. Rating filter
    const selectedRatings = Array.from(document.querySelectorAll('input[name="filterRating"]:checked')).map(cb => parseFloat(cb.value));
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      list = list.filter(p => p.rating >= minRating);
    }

    // 5. Discount filter
    const selectedDiscounts = Array.from(document.querySelectorAll('input[name="filterDiscount"]:checked')).map(cb => parseInt(cb.value, 10));
    if (selectedDiscounts.length > 0) {
      const minDiscount = Math.min(...selectedDiscounts);
      list = list.filter(p => (p.discount || 0) >= minDiscount);
    }

    // 6. Badge filter
    if (paramBadge) {
      if (paramBadge === 'best') {
        list = list.filter(p => p.badge === 'Best Seller' || p.rating >= 4.9);
      } else if (paramBadge === 'new') {
        list = list.filter(p => p.badge === 'New' || p.badge === 'Trending' || p.id > 35);
      } else if (paramBadge === 'offers') {
        list = list.filter(p => p.discount >= 24);
      }
    }

    // 7. Search query filter
    if (paramSearch) {
      const q = paramSearch.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 8. Sorting
    const sortVal = sortSelect ? sortSelect.value : (paramSort || 'featured');
    if (sortVal === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortVal === 'newest') {
      list.sort((a, b) => b.id - a.id);
    } else if (sortVal === 'bestselling') {
      list.sort((a, b) => b.reviews - a.reviews);
    }

    // Render count
    if (countEl) {
      countEl.innerHTML = `Showing <strong>${list.length}</strong> ${list.length === 1 ? 'Product' : 'Products'}`;
    }

    // Render results
    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 16px;"></i>
          <h3 style="font-size: 1.5rem; margin-bottom: 8px;">No Products Found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">Try adjusting your search criteria or clear active filters.</p>
          <button class="btn btn-outline" onclick="resetAllFilters()">Reset All Filters</button>
        </div>
      `;
    } else {
      grid.innerHTML = list.map(p => renderProductCard(p)).join('');
    }
  }

  // Bind change listeners
  const filterInputs = document.querySelectorAll('.filter-sidebar input');
  filterInputs.forEach(input => {
    input.addEventListener('change', applyFilters);
    input.addEventListener('input', applyFilters);
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      resetAllFilters();
    });
  }

  window.resetAllFilters = function() {
    filterInputs.forEach(input => {
      if (input.type === 'checkbox') input.checked = false;
      if (input.type === 'number') input.value = '';
    });
    if (sortSelect) sortSelect.value = 'featured';
    applyFilters();
  };

  // Initial run
  applyFilters();
}

// --- SINGLE PRODUCT DETAILS PAGE BUILDER ---
function initProductDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 1;
  const product = getProductById(productId);

  if (!product) {
    const mainWrap = document.querySelector('.product-details-wrap');
    if (mainWrap) {
      mainWrap.innerHTML = `
        <div class="container" style="text-align:center; padding:80px 20px;">
          <h2 style="font-size:2rem; margin-bottom:16px;">Product Not Found</h2>
          <p style="color:var(--text-secondary); margin-bottom:24px;">The beauty product you are looking for does not exist or has been discontinued.</p>
          <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
    }
    return;
  }

  // Update Page Title
  document.title = `${product.name} | Luméra Beauty`;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  const breadcrumbProduct = document.getElementById('breadcrumbProduct');
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = product.category;
    breadcrumbCategory.href = `${product.category.toLowerCase().replace(/\s+/g, '')}.html`;
  }
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = product.name;
  }

  // Save to Recently Viewed in localStorage (Max 8)
  try {
    let recent = JSON.parse(localStorage.getItem('lumera_recently_viewed')) || [];
    recent = recent.filter(id => id !== product.id);
    recent.unshift(product.id);
    if (recent.length > 8) recent = recent.slice(0, 8);
    localStorage.setItem('lumera_recently_viewed', JSON.stringify(recent));
  } catch (e) {}

  // Main Image & Gallery Thumbnails
  const mainImage = document.getElementById('detailsMainImage');
  const thumbContainer = document.getElementById('detailsThumbnails');
  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  if (thumbContainer && product.images && product.images.length > 0) {
    thumbContainer.innerHTML = product.images.map((imgUrl, index) => `
      <div class="thumb-item ${index === 0 ? 'active' : ''}" onclick="switchDetailsImage('${imgUrl}', this)">
        <img src="${imgUrl}" alt="${product.name} View ${index + 1}">
      </div>
    `).join('');
  }

  // Details Info
  const brandEl = document.getElementById('detailsBrand');
  const titleEl = document.getElementById('detailsTitle');
  const ratingStarsEl = document.getElementById('detailsRatingStars');
  const reviewsCountEl = document.getElementById('detailsReviewsCount');
  const priceCurrentEl = document.getElementById('detailsPriceCurrent');
  const priceOldEl = document.getElementById('detailsPriceOld');
  const discountEl = document.getElementById('detailsDiscountPill');
  const stockEl = document.getElementById('detailsStock');
  const descEl = document.getElementById('detailsDescription');

  if (brandEl) brandEl.textContent = product.brand;
  if (titleEl) titleEl.textContent = product.name;
  if (ratingStarsEl) ratingStarsEl.innerHTML = getStarsHTML(product.rating);
  if (reviewsCountEl) reviewsCountEl.textContent = `(${product.reviews} verified customer reviews)`;
  if (priceCurrentEl) priceCurrentEl.textContent = `₹${product.price}`;
  if (priceOldEl) priceOldEl.textContent = product.oldPrice ? `₹${product.oldPrice}` : '';
  if (discountEl) discountEl.textContent = product.discount ? `${product.discount}% OFF` : '';
  if (stockEl) {
    if (product.stock > 5) {
      stockEl.className = 'stock-status stock-in';
      stockEl.textContent = `In Stock (${product.stock} units available)`;
    } else {
      stockEl.className = 'stock-status stock-low';
      stockEl.textContent = `Only ${product.stock} left in stock!`;
    }
  }
  if (descEl) descEl.textContent = product.description;

  // Swatches (Color & Size)
  const colorContainer = document.getElementById('detailsColorSwatches');
  if (colorContainer) {
    if (product.colors && product.colors.length > 0) {
      colorContainer.innerHTML = `
        <label class="option-label">Select Shade / Color:</label>
        <div class="color-swatches">
          ${product.colors.map((c, i) => `
            <button class="color-swatch-btn ${i === 0 ? 'active' : ''}" onclick="selectSwatch(this)">${c}</button>
          `).join('')}
        </div>
      `;
    } else {
      colorContainer.innerHTML = '';
    }
  }

  const sizeContainer = document.getElementById('detailsSizeSwatches');
  if (sizeContainer) {
    if (product.sizes && product.sizes.length > 0) {
      sizeContainer.innerHTML = `
        <label class="option-label">Select Volume / Size:</label>
        <div class="size-swatches">
          ${product.sizes.map((s, i) => `
            <button class="size-swatch-btn ${i === 0 ? 'active' : ''}" onclick="selectSwatch(this)">${s}</button>
          `).join('')}
        </div>
      `;
    } else {
      sizeContainer.innerHTML = '';
    }
  }

  // Tabs Content
  const tabDesc = document.getElementById('tabDescContent');
  const tabIng = document.getElementById('tabIngredientsContent');
  const tabBen = document.getElementById('tabBenefitsContent');
  const tabUsage = document.getElementById('tabUsageContent');

  if (tabDesc) tabDesc.innerHTML = `<p>${product.description}</p>`;
  if (tabIng) tabIng.innerHTML = `<p><strong>Key Ingredients:</strong> ${product.ingredients || 'Dermatologically tested clean formulation.'}</p>`;
  if (tabBen) tabBen.innerHTML = `<p><strong>Proven Benefits:</strong> ${product.benefits || 'Restores natural radiance and nourishes deeply.'}</p>`;
  if (tabUsage) tabUsage.innerHTML = `<p><strong>Recommended Ritual:</strong> ${product.usage || 'Apply gently onto clean skin as required.'}</p>`;

  // Tab switching
  const tabBtns = document.querySelectorAll('.tab-nav-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Quantity stepper
  let currentQty = 1;
  const qtyVal = document.getElementById('detailsQtyValue');
  const qtyMinus = document.getElementById('detailsQtyMinus');
  const qtyPlus = document.getElementById('detailsQtyPlus');

  if (qtyMinus && qtyPlus && qtyVal) {
    qtyMinus.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyVal.textContent = currentQty;
      }
    });
    qtyPlus.addEventListener('click', () => {
      if (currentQty < (product.stock || 20)) {
        currentQty++;
        qtyVal.textContent = currentQty;
      }
    });
  }

  // Add to Cart / Buy Now
  const addBtn = document.getElementById('detailsAddToCartBtn');
  const buyNowBtn = document.getElementById('detailsBuyNowBtn');
  const wishlistBtn = document.getElementById('detailsWishlistBtn');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const activeColor = document.querySelector('.color-swatch-btn.active')?.textContent || null;
      const activeSize = document.querySelector('.size-swatch-btn.active')?.textContent || null;
      addToCart(product.id, currentQty, { color: activeColor, size: activeSize });
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      const activeColor = document.querySelector('.color-swatch-btn.active')?.textContent || null;
      const activeSize = document.querySelector('.size-swatch-btn.active')?.textContent || null;
      addToCart(product.id, currentQty, { color: activeColor, size: activeSize });
      window.location.href = 'checkout.html';
    });
  }

  if (wishlistBtn) {
    let wishlist = [];
    try {
      wishlist = JSON.parse(localStorage.getItem('lumera_wishlist')) || [];
    } catch (e) {}
    if (wishlist.includes(product.id)) {
      wishlistBtn.classList.add('active');
      wishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i> In Wishlist';
    }

    wishlistBtn.addEventListener('click', () => {
      const isAdded = toggleWishlist(product.id);
      if (isAdded) {
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i> In Wishlist';
      } else {
        wishlistBtn.classList.remove('active');
        wishlistBtn.innerHTML = '<i class="fa-regular fa-heart"></i> Add to Wishlist';
      }
    });
  }

  // Related Products Grid
  const relatedGrid = document.getElementById('relatedProductsGrid');
  if (relatedGrid) {
    const related = getAllProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.map(p => renderProductCard(p)).join('');
  }

  // Recently Viewed Grid
  const recentGrid = document.getElementById('recentlyViewedGrid');
  if (recentGrid) {
    try {
      const recentIds = JSON.parse(localStorage.getItem('lumera_recently_viewed')) || [];
      const recentProducts = recentIds.map(id => getProductById(id)).filter(p => p && p.id !== product.id).slice(0, 4);
      if (recentProducts.length > 0) {
        recentGrid.innerHTML = recentProducts.map(p => renderProductCard(p)).join('');
      } else {
        document.getElementById('recentlyViewedSection')?.remove();
      }
    } catch (e) {}
  }
}

// Image switcher in Details
function switchDetailsImage(url, el) {
  const mainImage = document.getElementById('detailsMainImage');
  if (mainImage) {
    mainImage.src = url;
  }
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
}

// Swatch selector in Details
function selectSwatch(btn) {
  const parent = btn.parentElement;
  if (parent) {
    parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  }
  btn.classList.add('active');
}
