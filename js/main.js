/**
 * LUMÉRA BEAUTY — MAIN GLOBAL JAVASCRIPT
 * Handles Theme Toggling (Light/Dark), Sticky Header, Mobile Drawer,
 * Global Cart/Wishlist Badges, Toast Notifications, and Page Loader.
 */

// --- 1. THEME SWITCHER (DARK / LIGHT MODE) ---
function initTheme() {
  const savedTheme = localStorage.getItem('lumera_theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  updateThemeToggleIcons(savedTheme);
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  const currentTheme = isDark ? 'dark' : 'light';
  localStorage.setItem('lumera_theme', currentTheme);
  updateThemeToggleIcons(currentTheme);
  showToast(`Switched to ${currentTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
}

function updateThemeToggleIcons(theme) {
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }
  });
}

// --- 2. CUSTOM TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'fa-check-circle';
  if (type === 'error') iconClass = 'fa-circle-exclamation';
  if (type === 'info') iconClass = 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// --- 3. GLOBAL BADGES (CART & WISHLIST COUNTERS) ---
function updateGlobalCounters() {
  // Cart count
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('lumera_cart')) || [];
  } catch (e) {
    cart = [];
  }
  const totalCartQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  cartBadges.forEach(badge => {
    badge.textContent = totalCartQty;
  });

  // Wishlist count
  let wishlist = [];
  try {
    wishlist = JSON.parse(localStorage.getItem('lumera_wishlist')) || [];
  } catch (e) {
    wishlist = [];
  }
  const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
  wishlistBadges.forEach(badge => {
    badge.textContent = wishlist.length;
  });
}

// --- 4. QUICK VIEW MODAL HANDLER ---
function openQuickView(productId) {
  if (typeof getProductById !== 'function') return;
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const container = document.getElementById('quickViewContent');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-gallery">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="quickview-details">
        <span class="details-brand">${product.brand}</span>
        <h2 class="details-title" style="font-size:1.6rem; margin-bottom:10px;">${product.name}</h2>
        <div class="product-rating" style="margin-bottom:14px;">
          <div class="rating-stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
            ${product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
          </div>
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>
        <div class="details-price-row" style="margin-bottom:16px;">
          <span class="details-price-current">₹${product.price}</span>
          ${product.oldPrice ? `<span class="details-price-old">₹${product.oldPrice}</span>` : ''}
          ${product.discount ? `<span class="details-discount-pill">${product.discount}% OFF</span>` : ''}
        </div>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.5;">${product.description}</p>
        
        <div style="display:flex; gap:12px; margin-top:auto;">
          <button class="btn btn-primary btn-full" id="qvAddToCartBtn">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
          <a href="product-details.html?id=${product.id}" class="btn btn-outline">
            Full Details
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach Add to Cart listener
  const btn = document.getElementById('qvAddToCartBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      if (typeof addToCart === 'function') {
        addToCart(product.id, 1);
      }
      closeQuickView();
    });
  }

  modal.classList.add('open');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

// --- 5. INITIALIZE ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  // Theme initialization
  initTheme();
  
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Global badges
  updateGlobalCounters();

  // Sticky header & Scroll Progress & Back to Top
  const header = document.querySelector('.site-header');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Progress
    if (scrollProgress && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }

    // Header class
    if (header) {
      if (scrollTop > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile drawer menu
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
  }

  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileMenu);

  // Search forms (header & mobile)
  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="text"]');
      if (input && input.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(input.value.trim())}`;
      }
    });
  });

  // Newsletter subscription
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('Thank you for subscribing to Luméra Beauty VIP letters!', 'success');
        input.value = '';
      }
    });
  });

  // Modal close handlers
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeQuickView);
  });

  const quickViewModal = document.getElementById('quickViewModal');
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        closeQuickView();
      }
    });
  }

  // Dismiss Page Loader smoothly
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 200);
  }
});
