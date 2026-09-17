/**
 * LUMÉRA BEAUTY — AUTHENTICATION & USER PROFILE ENGINE
 * Handles login, registration, password validation, and user dashboard state.
 */

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('lumera_user')) || null;
  } catch (e) {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem('lumera_user', JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem('lumera_user');
  showToast('Logged out successfully', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// Signup handler
function handleSignup(e) {
  e.preventDefault();

  const fullName = document.getElementById('signupName')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const mobile = document.getElementById('signupMobile')?.value.trim();
  const password = document.getElementById('signupPassword')?.value;
  const confirmPassword = document.getElementById('signupConfirmPassword')?.value;

  if (!fullName || !email || !mobile || !password || !confirmPassword) {
    showToast('Please fill in all registration fields', 'error');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }

  const newUser = {
    name: fullName,
    email: email,
    mobile: mobile,
    address: '',
    city: '',
    state: '',
    pincode: '',
    joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  };

  saveUser(newUser);
  showToast('Account created successfully! Welcome to Luméra Beauty.', 'success');
  
  setTimeout(() => {
    window.location.href = 'account.html';
  }, 1000);
}

// Login handler
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;

  if (!email || !password) {
    showToast('Please enter your email and password', 'error');
    return;
  }

  // Create demo user session
  let user = getCurrentUser();
  if (!user || user.email !== email) {
    user = {
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      mobile: '+91 98879 72121',
      address: '24 Park Avenue, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
      joinedDate: 'Aug 2026'
    };
    saveUser(user);
  }

  showToast('Welcome back to Luméra Beauty!', 'success');
  setTimeout(() => {
    window.location.href = 'account.html';
  }, 800);
}

// Account page loader
function initAccountPage() {
  const user = getCurrentUser();
  const notLoggedInView = document.getElementById('accountNotLoggedIn');
  const loggedInView = document.getElementById('accountLoggedIn');

  if (!user) {
    if (notLoggedInView) notLoggedInView.style.display = 'block';
    if (loggedInView) loggedInView.style.display = 'none';
    return;
  }

  if (notLoggedInView) notLoggedInView.style.display = 'none';
  if (loggedInView) loggedInView.style.display = 'block';

  // Profile data
  if (document.getElementById('profileDisplayName')) document.getElementById('profileDisplayName').textContent = user.name;
  if (document.getElementById('profileDisplayEmail')) document.getElementById('profileDisplayEmail').textContent = user.email;
  if (document.getElementById('profileDisplayMobile')) document.getElementById('profileDisplayMobile').textContent = user.mobile;
  if (document.getElementById('profileInputName')) document.getElementById('profileInputName').value = user.name;
  if (document.getElementById('profileInputEmail')) document.getElementById('profileInputEmail').value = user.email;
  if (document.getElementById('profileInputMobile')) document.getElementById('profileInputMobile').value = user.mobile;

  // Render recent orders in account
  const ordersContainer = document.getElementById('accountRecentOrders');
  if (ordersContainer) {
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('lumera_orders')) || [];
    } catch (e) {}

    if (orders.length === 0) {
      ordersContainer.innerHTML = `
        <div style="text-align:center; padding:30px; color:var(--text-secondary);">
          <i class="fa-solid fa-box-open" style="font-size:2rem; color:var(--accent-gold); margin-bottom:10px;"></i>
          <p>No orders placed yet.</p>
          <a href="shop.html" class="btn btn-outline btn-sm" style="margin-top:10px;">Explore Collection</a>
        </div>
      `;
    } else {
      ordersContainer.innerHTML = orders.slice(0, 3).map(order => `
        <div style="background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:16px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong>Order #${order.orderId}</strong>
            <span class="stock-status stock-in" style="font-size:0.75rem;">${order.orderStatus}</span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">
            Placed on ${order.date} • Total: <strong>₹${order.financials.grandTotal}</strong>
          </div>
          <div style="display:flex; gap:8px;">
            <a href="order-tracking.html?orderId=${order.orderId}" class="btn btn-primary btn-sm">Track Package</a>
          </div>
        </div>
      `).join('');
    }
  }

  // Profile update form
  const profileForm = document.getElementById('profileUpdateForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      user.name = document.getElementById('profileInputName')?.value || user.name;
      user.mobile = document.getElementById('profileInputMobile')?.value || user.mobile;
      saveUser(user);
      showToast('Profile updated successfully', 'success');
      initAccountPage();
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const signupForm = document.getElementById('signupForm');
  if (signupForm) signupForm.addEventListener('submit', handleSignup);

  if (document.getElementById('accountLoggedIn')) {
    initAccountPage();
  }
});
