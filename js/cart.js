/**
 * LUMÉRA BEAUTY — CART & SHOPPING BAG ENGINE
 * LocalStorage management, coupon codes, tax & shipping calculations.
 */

// Coupons dictionary
const AVAILABLE_COUPONS = {
  'BEAUTY10': { discountPercent: 10, minSpend: 500, description: '10% OFF on all beauty products' },
  'GLOW20': { discountPercent: 20, minSpend: 1500, description: '20% OFF on orders above ₹1,500' },
  'WELCOME15': { discountPercent: 15, minSpend: 800, description: '15% OFF for new Luméra members' }
};

// Retrieve Cart
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('lumera_cart')) || [];
  } catch (e) {
    return [];
  }
}

// Save Cart
function saveCart(cart) {
  localStorage.setItem('lumera_cart', JSON.stringify(cart));
  if (typeof updateGlobalCounters === 'function') {
    updateGlobalCounters();
  }
}

// Add to Cart
function addToCart(productId, quantity = 1, options = {}) {
  if (typeof getProductById !== 'function') return;
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existingIndex = cart.findIndex(item => 
    item.id === product.id &&
    item.color === (options.color || null) &&
    item.size === (options.size || null)
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      quantity: quantity,
      color: options.color || (product.colors ? product.colors[0] : null),
      size: options.size || (product.sizes ? product.sizes[0] : null)
    });
  }

  saveCart(cart);
  if (typeof showToast === 'function') {
    showToast(`Added "${product.name}" to your beauty bag!`, 'success');
  }
}

// Update Quantity
function updateCartItemQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
    if (typeof showToast === 'function') {
      showToast('Item removed from cart', 'info');
    }
  }

  saveCart(cart);
  renderCartPage();
}

// Remove Item from Cart
function removeCartItem(index) {
  const cart = getCart();
  if (!cart[index]) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart(cart);
  if (typeof showToast === 'function') {
    showToast(`Removed "${removedName}" from cart`, 'info');
  }
  renderCartPage();
}

// Clear Cart
function clearCart() {
  localStorage.removeItem('lumera_cart');
  localStorage.removeItem('lumera_applied_coupon');
  if (typeof updateGlobalCounters === 'function') {
    updateGlobalCounters();
  }
}

// Render Cart Page
function renderCartPage() {
  const container = document.getElementById('cartItemsContainer');
  const emptyState = document.getElementById('cartEmptyState');
  const cartContent = document.getElementById('cartContentLayout');
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountEl = document.getElementById('cartDiscount');
  const discountRow = document.getElementById('cartDiscountRow');
  const shippingEl = document.getElementById('cartShipping');
  const taxEl = document.getElementById('cartTax');
  const totalEl = document.getElementById('cartGrandTotal');
  const couponTag = document.getElementById('appliedCouponTag');

  const cart = getCart();

  if (!cartContent || !emptyState) return;

  if (cart.length === 0) {
    cartContent.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  cartContent.style.display = 'grid';
  emptyState.style.display = 'none';

  // Populate table
  if (container) {
    container.innerHTML = cart.map((item, index) => `
      <tr>
        <td>
          <div class="cart-item-flex">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
              <span style="font-size:0.75rem; color:var(--accent-gold); font-weight:600; text-transform:uppercase;">${item.brand}</span>
              <h4><a href="product-details.html?id=${item.id}">${item.name}</a></h4>
              <span>${item.color ? 'Shade: ' + item.color : ''} ${item.size ? '| Size: ' + item.size : ''}</span>
            </div>
          </div>
        </td>
        <td><strong>₹${item.price}</strong></td>
        <td>
          <div class="quantity-stepper" style="height:38px;">
            <button class="stepper-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
            <span class="stepper-val" style="font-size:0.88rem;">${item.quantity}</span>
            <button class="stepper-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
          </div>
        </td>
        <td><strong>₹${item.price * item.quantity}</strong></td>
        <td style="text-align:right;">
          <button class="cart-remove-btn" onclick="removeCartItem(${index})" title="Remove item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Calculate financials
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Coupon
  let appliedCouponCode = localStorage.getItem('lumera_applied_coupon');
  let discountAmount = 0;

  if (appliedCouponCode && AVAILABLE_COUPONS[appliedCouponCode]) {
    const coupon = AVAILABLE_COUPONS[appliedCouponCode];
    if (subtotal >= coupon.minSpend) {
      discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
      if (couponTag) {
        couponTag.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--accent-gold-light); padding:6px 12px; border-radius:var(--radius-sm); font-size:0.8rem; color:var(--accent-gold); margin-top:8px;">
            <span><i class="fa-solid fa-tag"></i> <strong>${appliedCouponCode}</strong> applied (${coupon.discountPercent}% OFF)</span>
            <button onclick="removeCoupon()" style="color:var(--accent-rose); font-weight:bold; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
          </div>
        `;
      }
      if (discountRow) discountRow.style.display = 'flex';
      if (discountEl) discountEl.textContent = `-₹${discountAmount}`;
    } else {
      localStorage.removeItem('lumera_applied_coupon');
      if (discountRow) discountRow.style.display = 'none';
      if (couponTag) couponTag.innerHTML = '';
    }
  } else {
    if (discountRow) discountRow.style.display = 'none';
    if (couponTag) couponTag.innerHTML = '';
  }

  // Shipping (Free over ₹999)
  const shipping = subtotal >= 999 ? 0 : 99;
  
  // Tax (5% GST)
  const tax = Math.round((subtotal - discountAmount) * 0.05);

  // Grand Total
  const grandTotal = Math.max(0, (subtotal - discountAmount) + shipping + tax);

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (taxEl) taxEl.textContent = `₹${tax}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;
}

// Apply Coupon
function applyCoupon() {
  const input = document.getElementById('couponCodeInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (!code) {
    showToast('Please enter a coupon code', 'error');
    return;
  }

  const coupon = AVAILABLE_COUPONS[code];
  if (!coupon) {
    showToast('Invalid coupon code. Try BEAUTY10, GLOW20, or WELCOME15', 'error');
    return;
  }

  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (subtotal < coupon.minSpend) {
    showToast(`Coupon valid on minimum order of ₹${coupon.minSpend}`, 'error');
    return;
  }

  localStorage.setItem('lumera_applied_coupon', code);
  showToast(`Coupon "${code}" applied successfully!`, 'success');
  input.value = '';
  renderCartPage();
}

function removeCoupon() {
  localStorage.removeItem('lumera_applied_coupon');
  showToast('Coupon removed', 'info');
  renderCartPage();
}

// Initialise on Cart Page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cartItemsContainer')) {
    renderCartPage();
    const applyBtn = document.getElementById('applyCouponBtn');
    if (applyBtn) {
      applyBtn.addEventListener('click', applyCoupon);
    }
  }
});
