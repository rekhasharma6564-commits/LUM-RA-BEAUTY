/**
 * LUMÉRA BEAUTY — CHECKOUT & SHIPPING ENGINE
 * Handles customer details validation, delivery methods, and order preparation.
 */

let selectedDeliveryMethod = 'standard';

function initCheckoutPage() {
  const cart = (typeof getCart === 'function') ? getCart() : [];
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Pre-fill user profile if logged in
  try {
    const user = JSON.parse(localStorage.getItem('lumera_user'));
    if (user) {
      if (document.getElementById('checkoutFullName') && user.name) document.getElementById('checkoutFullName').value = user.name;
      if (document.getElementById('checkoutEmail') && user.email) document.getElementById('checkoutEmail').value = user.email;
      if (document.getElementById('checkoutMobile') && user.mobile) document.getElementById('checkoutMobile').value = user.mobile;
      if (document.getElementById('checkoutAddress') && user.address) document.getElementById('checkoutAddress').value = user.address;
      if (document.getElementById('checkoutCity') && user.city) document.getElementById('checkoutCity').value = user.city;
      if (document.getElementById('checkoutState') && user.state) document.getElementById('checkoutState').value = user.state;
      if (document.getElementById('checkoutPincode') && user.pincode) document.getElementById('checkoutPincode').value = user.pincode;
    }
  } catch (e) {}

  // Render items summary
  const summaryContainer = document.getElementById('checkoutItemsSummary');
  if (summaryContainer) {
    summaryContainer.innerHTML = cart.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:0.88rem;">
        <div style="display:flex; gap:10px; align-items:center;">
          <img src="${item.image}" alt="${item.name}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">
          <div>
            <strong>${item.name}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.color || ''} × ${item.quantity}</div>
          </div>
        </div>
        <span>₹${item.price * item.quantity}</span>
      </div>
    `).join('');
  }

  updateCheckoutCalculations();

  // Delivery options listener
  const deliveryCards = document.querySelectorAll('.delivery-option-card');
  deliveryCards.forEach(card => {
    card.addEventListener('click', () => {
      deliveryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedDeliveryMethod = card.getAttribute('data-method') || 'standard';
      updateCheckoutCalculations();
    });
  });

  // Form submission
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

function updateCheckoutCalculations() {
  const cart = (typeof getCart === 'function') ? getCart() : [];
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Coupon discount
  let discountAmount = 0;
  const appliedCoupon = localStorage.getItem('lumera_applied_coupon');
  if (appliedCoupon && typeof AVAILABLE_COUPONS !== 'undefined' && AVAILABLE_COUPONS[appliedCoupon]) {
    discountAmount = Math.round((subtotal * AVAILABLE_COUPONS[appliedCoupon].discountPercent) / 100);
  }

  // Shipping
  let shipping = 0;
  if (selectedDeliveryMethod === 'express') {
    shipping = 199;
  } else {
    shipping = subtotal >= 999 ? 0 : 99;
  }

  // Tax (5% GST)
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const grandTotal = Math.max(0, (subtotal - discountAmount) + shipping + tax);

  if (document.getElementById('checkoutSubtotal')) document.getElementById('checkoutSubtotal').textContent = `₹${subtotal}`;
  if (document.getElementById('checkoutDiscount')) document.getElementById('checkoutDiscount').textContent = `-₹${discountAmount}`;
  if (document.getElementById('checkoutShipping')) document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (document.getElementById('checkoutTax')) document.getElementById('checkoutTax').textContent = `₹${tax}`;
  if (document.getElementById('checkoutGrandTotal')) document.getElementById('checkoutGrandTotal').textContent = `₹${grandTotal}`;

  return { subtotal, discountAmount, shipping, tax, grandTotal };
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const fullName = document.getElementById('checkoutFullName')?.value.trim();
  const email = document.getElementById('checkoutEmail')?.value.trim();
  const mobile = document.getElementById('checkoutMobile')?.value.trim();
  const address = document.getElementById('checkoutAddress')?.value.trim();
  const city = document.getElementById('checkoutCity')?.value.trim();
  const state = document.getElementById('checkoutState')?.value.trim();
  const pincode = document.getElementById('checkoutPincode')?.value.trim();

  // Validations
  if (!fullName || !email || !mobile || !address || !city || !state || !pincode) {
    showToast('Please fill in all mandatory delivery address fields', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }

  if (mobile.length < 10) {
    showToast('Please enter a valid 10-digit mobile number', 'error');
    return;
  }

  if (pincode.length < 5) {
    showToast('Please enter a valid postal pincode', 'error');
    return;
  }

  const calcs = updateCheckoutCalculations();
  const cart = (typeof getCart === 'function') ? getCart() : [];

  const pendingOrder = {
    customer: { fullName, email, mobile, address, city, state, pincode },
    deliveryMethod: selectedDeliveryMethod,
    items: cart,
    financials: calcs,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem('lumera_pending_order', JSON.stringify(pendingOrder));

  // Forward to payment page
  window.location.href = 'payment.html';
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('checkoutForm')) {
    initCheckoutPage();
  }
});
