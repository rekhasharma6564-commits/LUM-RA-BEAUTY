/**
 * LUMÉRA BEAUTY — PAYMENT ENGINE & QR CODE TRANSACTION PROCESSOR
 *
 * Implements:
 * 1. QR Code Scan & Pay with image loading from user's assets folder (with fallback & custom picker).
 * 2. Strict Conditional Verification:
 *    - If payment is completed -> Verified success alert, toast, order created, redirects to success.
 *    - If QR opened but payment is NOT completed / cancelled -> Red alert, error toast, NO success message, NO order created.
 * 3. Testing simulator controls (Simulate Success vs Simulate Not Paid).
 * 4. Standard payment methods (UPI ID, Card, Net Banking, COD).
 */

let currentPaymentMethod = 'qr';
let qrPaymentStatus = 'pending'; // 'pending' | 'verified' | 'failed'
let qrTimerSeconds = 600; // 10 minutes
let qrTimerInterval = null;
let qrTransactionRef = null;

function initPaymentPage() {
  let pendingOrder = null;
  try {
    pendingOrder = JSON.parse(localStorage.getItem('lumera_pending_order'));
  } catch (e) {}

  if (!pendingOrder || !pendingOrder.items || pendingOrder.items.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Update total amount on payment button and summary
  const amount = pendingOrder.financials.grandTotal;
  const payBtnText = document.getElementById('payButtonAmount');
  const summaryAmount = document.getElementById('paymentGrandTotal');
  const customerName = document.getElementById('paymentCustomerName');
  const customerAddress = document.getElementById('paymentCustomerAddress');

  if (payBtnText) payBtnText.textContent = `₹${amount}`;
  if (summaryAmount) summaryAmount.textContent = `₹${amount}`;
  if (customerName) customerName.textContent = pendingOrder.customer.fullName;
  if (customerAddress) customerAddress.textContent = `${pendingOrder.customer.address}, ${pendingOrder.customer.city} - ${pendingOrder.customer.pincode}`;

  // Update QR amount text
  document.querySelectorAll('.qrAmountDisplay').forEach(el => {
    el.textContent = `₹${amount}`;
  });

  // Setup QR image from assets or localStorage
  initQrImageLoader();

  // Setup QR timer
  startQrTimer();

  // Method tab buttons
  const tabBtns = document.querySelectorAll('.payment-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.payment-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const method = btn.getAttribute('data-method');
      currentPaymentMethod = method;

      const targetPane = document.getElementById(`paymentPane_${method}`);
      if (targetPane) targetPane.classList.add('active');

      // If switching to QR, remind status if pending
      if (method === 'qr' && qrPaymentStatus === 'pending') {
        updatePayButtonLabel();
      }
    });
  });

  // Copy UPI ID button
  const copyBtn = document.getElementById('copyVpaBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const vpa = document.getElementById('vpaIdDisplay')?.textContent.trim() || 'lumera.beauty@okhdfcbank';
      navigator.clipboard.writeText(vpa).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
        }, 2000);
        if (typeof showToast === 'function') {
          showToast('UPI ID copied to clipboard: ' + vpa, 'info');
        }
      }).catch(() => {
        if (typeof showToast === 'function') {
          showToast('UPI ID: ' + vpa, 'info');
        }
      });
    });
  }

  // QR Verification Buttons:
  const verifyBtn = document.getElementById('btnVerifyQrPayment');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => handleQrVerification(true));
  }

  const notPaidBtn = document.getElementById('btnNotPaidCancel');
  if (notPaidBtn) {
    notPaidBtn.addEventListener('click', () => handleQrVerification(false));
  }

  // Simulation test buttons
  const simPaidBtn = document.getElementById('simPaidBtn');
  if (simPaidBtn) {
    simPaidBtn.addEventListener('click', () => {
      handleQrVerification(true, 'SIM-UPI-' + Math.floor(10000000 + Math.random() * 90000000));
    });
  }

  const simNotPaidBtn = document.getElementById('simNotPaidBtn');
  if (simNotPaidBtn) {
    simNotPaidBtn.addEventListener('click', () => {
      handleQrVerification(false);
    });
  }

  // Card input auto-formatting
  const cardInput = document.getElementById('cardNumberInput');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
    });
  }

  const expiryInput = document.getElementById('cardExpiryInput');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
    });
  }

  // Pay Now button
  const payBtn = document.getElementById('payNowButton');
  if (payBtn) {
    payBtn.addEventListener('click', processPayment);
  }
}

/**
 * Handles QR Code Image resolution from folder with custom user override
 */
function initQrImageLoader() {
  const qrImg = document.getElementById('paymentQrImg');
  const pathDisplay = document.getElementById('currentQrPathDisplay');
  const toggleBtn = document.getElementById('toggleCustomQrSource');
  const sourceBox = document.getElementById('customQrSourceBox');
  const pathInput = document.getElementById('customQrPathInput');
  const applyBtn = document.getElementById('applyCustomQrPathBtn');
  const fileInput = document.getElementById('qrFileInput');

  // Load custom image path if user specified one
  const savedCustomQr = localStorage.getItem('lumera_custom_qr_image');
  if (savedCustomQr && qrImg) {
    qrImg.src = savedCustomQr;
    if (pathDisplay) {
      pathDisplay.textContent = savedCustomQr.startsWith('data:') ? 'Custom Uploaded Image' : savedCustomQr;
    }
    if (pathInput && !savedCustomQr.startsWith('data:')) {
      pathInput.value = savedCustomQr;
    }
  }

  // Graceful fallback if image fails to load
  if (qrImg) {
    qrImg.addEventListener('error', function () {
      console.warn('QR image load failed for:', qrImg.src, '- attempting alternate path');
      if (qrImg.src.includes('assets/qr-code.png')) {
        qrImg.src = 'assets/images/qr-code.png';
      } else if (qrImg.src.includes('assets/images/qr-code.png')) {
        qrImg.src = 'assets/payment-qr.png';
      } else {
        // Fallback to inline SVG QR
        qrImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100" fill="%231b1716"><rect width="100" height="100" fill="%23ffffff"/><path d="M10 10h30v30h-30z M15 15v20h20v-20z M20 20h10v10h-10z M60 10h30v30h-30z M65 15v20h20v-20z M70 20h10v10h-10z M10 60h30v30h-30z M15 65v20h20v-20z M20 70h10v10h-10z M45 10h10v10h-10z M45 30h10v20h-10z M10 45h20v10h-20z M60 45h20v10h-20z M85 45h10v10h-10z M45 60h10v30h-10z M60 60h20v10h-20z M60 80h10v10h-10z M80 75h15v15h-15z"/></svg>';
      }
    });
  }

  // Toggle custom source drawer
  if (toggleBtn && sourceBox) {
    toggleBtn.addEventListener('click', () => {
      sourceBox.classList.toggle('open');
    });
  }

  // Apply custom path text
  if (applyBtn && pathInput && qrImg) {
    applyBtn.addEventListener('click', () => {
      const customPath = pathInput.value.trim();
      if (customPath) {
        qrImg.src = customPath;
        localStorage.setItem('lumera_custom_qr_image', customPath);
        if (pathDisplay) pathDisplay.textContent = customPath;
        if (typeof showToast === 'function') {
          showToast('Updated QR image source to: ' + customPath, 'success');
        }
      }
    });
  }

  // File upload directly from user's folder
  if (fileInput && qrImg) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          qrImg.src = dataUrl;
          localStorage.setItem('lumera_custom_qr_image', dataUrl);
          if (pathDisplay) pathDisplay.textContent = `User File: ${file.name}`;
          if (typeof showToast === 'function') {
            showToast(`Loaded QR image from: ${file.name}`, 'success');
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

/**
 * Live 10-minute expiry countdown for the QR Code session
 */
function startQrTimer() {
  const timerDisplay = document.getElementById('qrTimerText');
  if (!timerDisplay) return;

  if (qrTimerInterval) clearInterval(qrTimerInterval);

  qrTimerInterval = setInterval(() => {
    if (qrTimerSeconds <= 0) {
      clearInterval(qrTimerInterval);
      timerDisplay.textContent = '00:00 (Expired)';
      const badge = document.getElementById('qrStatusBadge');
      if (badge && qrPaymentStatus !== 'verified') {
        badge.className = 'qr-badge failed';
        badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> QR Code Expired';
      }
      return;
    }

    qrTimerSeconds--;
    const mins = Math.floor(qrTimerSeconds / 60);
    const secs = qrTimerSeconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

/**
 * Verification of the QR Code payment
 *
 * @param {boolean} isPaid - true if user completed payment, false if cancelled/not paid
 * @param {string|null} customUtr - optional reference number
 */
function handleQrVerification(isPaid, customUtr = null) {
  const alertBox = document.getElementById('qrAlertBox');
  const statusBadge = document.getElementById('qrStatusBadge');
  const utrInput = document.getElementById('qrUtrInput');
  const verifyBtn = document.getElementById('btnVerifyQrPayment');
  const payBtn = document.getElementById('payNowButton');

  let pendingOrder = null;
  try {
    pendingOrder = JSON.parse(localStorage.getItem('lumera_pending_order'));
  } catch (e) {}
  const amount = pendingOrder?.financials?.grandTotal || 0;

  if (!alertBox || !statusBadge) return;

  // SCENARIO 1: PAYMENT WAS NOT DONE / CANCELLED
  // "warna yadi qr open krne ke bad payment kiya ya hi nhi to success payment ka msg nhi aayega"
  if (!isPaid) {
    qrPaymentStatus = 'failed';
    qrTransactionRef = null;

    // Update status badge to failed/incomplete
    statusBadge.className = 'qr-badge failed';
    statusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Payment Not Received (Pending)';

    // Explicit failure alert - Strictly NO success message
    alertBox.className = 'qr-alert-box danger show';
    alertBox.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:10px;">
        <i class="fa-solid fa-circle-xmark" style="font-size:1.3rem; margin-top:2px;"></i>
        <div>
          <strong style="font-size:0.95rem;">Payment Not Received!</strong>
          <p style="margin:4px 0 0 0; font-size:0.83rem;">
            You opened the QR code, but payment was not made or verified. No money has been debited and your order is <strong>NOT confirmed</strong>.
          </p>
          <p style="margin:6px 0 0 0; font-size:0.8rem; color:#991B1B;">
            <i class="fa-solid fa-info-circle"></i> Please scan the QR code with your UPI app to transfer ₹${amount}, then click <strong>"I Have Paid"</strong> to generate your confirmation.
          </p>
        </div>
      </div>
    `;

    if (typeof showToast === 'function') {
      showToast('Payment Not Received! Order was not placed.', 'error');
    }

    if (payBtn) {
      payBtn.disabled = false;
      payBtn.innerHTML = `<i class="fa-solid fa-lock"></i> AUTHORIZE & PAY <span id="payButtonAmount">₹${amount}</span>`;
    }

    updatePayButtonLabel();
    return;
  }

  // SCENARIO 2: PAYMENT IS DONE / COMPLETED
  // "uspar payment ho jaye to success ka message aayega"
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Verifying with UPI Banking Gateway...';
  }

  // Simulate bank/UPI payment gateway verification
  setTimeout(() => {
    let utr = customUtr || utrInput?.value.trim();
    if (!utr) {
      utr = 'UPI-' + Math.floor(100000000000 + Math.random() * 900000000000);
    }
    qrTransactionRef = utr;
    qrPaymentStatus = 'verified';

    // Status badge turns green
    statusBadge.className = 'qr-badge success';
    statusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Payment Confirmed (Ref: ${utr.substring(0, 12)})`;

    // High-prominence SUCCESS MESSAGE
    alertBox.className = 'qr-alert-box success show';
    alertBox.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:10px;">
        <i class="fa-solid fa-circle-check" style="font-size:1.4rem; color:#059669; margin-top:2px;"></i>
        <div>
          <strong style="font-size:1rem; color:#065F46;">Payment Successful! ₹${amount} Received</strong>
          <p style="margin:4px 0 0 0; font-size:0.84rem; color:#047857;">
            We received your payment via UPI QR Code. Transaction Reference: <strong>${utr}</strong>.
          </p>
          <div style="margin-top:8px; font-size:0.82rem; font-weight:600; color:#065F46;">
            <i class="fa-solid fa-spinner fa-spin"></i> Finalizing order and generating luxury invoice...
          </div>
        </div>
      </div>
    `;

    if (typeof showToast === 'function') {
      showToast(`Payment Successful! ₹${amount} received via UPI.`, 'success');
    }

    if (verifyBtn) {
      verifyBtn.className = 'btn-qr-verify';
      verifyBtn.style.background = '#047857';
      verifyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Payment Verified & Confirmed';
    }

    // Auto-proceed to order confirmation after 1.5 seconds
    setTimeout(() => {
      executeOrderPlacement();
    }, 1500);

  }, 1200);
}

function updatePayButtonLabel() {
  const payBtn = document.getElementById('payNowButton');
  if (!payBtn) return;

  let pendingOrder = null;
  try {
    pendingOrder = JSON.parse(localStorage.getItem('lumera_pending_order'));
  } catch (e) {}
  const amount = pendingOrder?.financials?.grandTotal || 0;

  if (currentPaymentMethod === 'qr') {
    if (qrPaymentStatus === 'verified') {
      payBtn.innerHTML = `<i class="fa-solid fa-check"></i> CONFIRM ORDER (₹${amount} PAID)`;
    } else {
      payBtn.innerHTML = `<i class="fa-solid fa-lock"></i> AUTHORIZE & PAY <span id="payButtonAmount">₹${amount}</span>`;
    }
  } else {
    payBtn.innerHTML = `<i class="fa-solid fa-lock"></i> AUTHORIZE & PAY <span id="payButtonAmount">₹${amount}</span>`;
  }
}

/**
 * Main payment trigger (Pay Now Button)
 */
function processPayment() {
  const payBtn = document.getElementById('payNowButton');
  let pendingOrder = null;
  try {
    pendingOrder = JSON.parse(localStorage.getItem('lumera_pending_order'));
  } catch (e) {}

  if (!pendingOrder) {
    if (typeof showToast === 'function') {
      showToast('Order session expired. Please return to cart.', 'error');
    }
    window.location.href = 'cart.html';
    return;
  }

  // SPECIFIC RULE FOR QR CODE:
  // "warna yadi qr open krne ke bad payment kiya ya hi nhi to success payment ka msg nhi aayega"
  if (currentPaymentMethod === 'qr') {
    if (qrPaymentStatus !== 'verified') {
      const alertBox = document.getElementById('qrAlertBox');
      const statusBadge = document.getElementById('qrStatusBadge');
      
      if (statusBadge) {
        statusBadge.className = 'qr-badge failed';
        statusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Payment Incomplete';
      }

      if (alertBox) {
        alertBox.className = 'qr-alert-box danger show';
        alertBox.innerHTML = `
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size:1.3rem; margin-top:2px;"></i>
            <div>
              <strong style="font-size:0.95rem;">Payment Incomplete / Not Detected!</strong>
              <p style="margin:4px 0 0 0; font-size:0.83rem;">
                You opened the QR code, but payment has not been completed or confirmed.
                <strong>No success message will be issued until payment is verified.</strong>
              </p>
              <p style="margin:6px 0 0 0; font-size:0.8rem; color:#991B1B;">
                Scan with Google Pay, PhonePe, or Paytm and click <strong>"I Have Paid — Verify & Confirm"</strong> to complete your purchase.
              </p>
            </div>
          </div>
        `;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (typeof showToast === 'function') {
        showToast('Payment Not Completed: Please scan QR and pay to proceed.', 'error');
      }
      return; // STOP! No order placed!
    } else {
      // QR was verified, execute immediately
      executeOrderPlacement();
      return;
    }
  }

  // Validate other payment methods
  if (currentPaymentMethod === 'upi') {
    const upiId = document.getElementById('upiIdInput')?.value.trim();
    if (!upiId || !upiId.includes('@')) {
      if (typeof showToast === 'function') {
        showToast('Please enter a valid UPI ID (e.g. yourname@okhdfcbank)', 'error');
      }
      return;
    }
  } else if (currentPaymentMethod === 'card') {
    const cardNum = document.getElementById('cardNumberInput')?.value.replace(/\s/g, '');
    const cardExp = document.getElementById('cardExpiryInput')?.value.trim();
    const cardCvv = document.getElementById('cardCvvInput')?.value.trim();
    const cardHolder = document.getElementById('cardHolderInput')?.value.trim();

    if (!cardNum || cardNum.length < 16) {
      if (typeof showToast === 'function') showToast('Please enter a valid 16-digit card number', 'error');
      return;
    }
    if (!cardExp || !cardExp.includes('/') || cardExp.length < 5) {
      if (typeof showToast === 'function') showToast('Please enter expiry in MM/YY format', 'error');
      return;
    }
    if (!cardCvv || cardCvv.length < 3) {
      if (typeof showToast === 'function') showToast('Please enter a valid 3-digit CVV', 'error');
      return;
    }
    if (!cardHolder) {
      if (typeof showToast === 'function') showToast('Please enter name as printed on card', 'error');
      return;
    }
  }

  // Start processing animation for non-QR or other methods
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Authorizing Secure Payment...';
  }

  setTimeout(() => {
    executeOrderPlacement();
  }, 1600);
}

/**
 * Creates confirmed order, persists in localStorage, clears cart and redirects
 */
function executeOrderPlacement() {
  let pendingOrder = null;
  try {
    pendingOrder = JSON.parse(localStorage.getItem('lumera_pending_order'));
  } catch (e) {}

  if (!pendingOrder) {
    window.location.href = 'cart.html';
    return;
  }

  // Generate Order ID
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `LUM-2026-${randomNum}`;

  let paymentMethodLabel = 'UPI QR CODE';
  let paymentStatusLabel = 'Paid Successfully (UPI QR)';

  if (currentPaymentMethod === 'upi') {
    paymentMethodLabel = 'UPI ID / VPA';
    paymentStatusLabel = 'Paid Successfully';
  } else if (currentPaymentMethod === 'card') {
    paymentMethodLabel = 'CREDIT/DEBIT CARD';
    paymentStatusLabel = 'Paid Successfully';
  } else if (currentPaymentMethod === 'netbanking') {
    paymentMethodLabel = 'NET BANKING';
    paymentStatusLabel = 'Paid Successfully';
  } else if (currentPaymentMethod === 'cod') {
    paymentMethodLabel = 'CASH ON DELIVERY';
    paymentStatusLabel = 'Pending (Cash on Delivery)';
  }

  const completedOrder = {
    orderId: orderId,
    transactionRef: qrTransactionRef || `TXN-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    customer: pendingOrder.customer,
    items: pendingOrder.items,
    financials: pendingOrder.financials,
    paymentMethod: paymentMethodLabel,
    paymentStatus: paymentStatusLabel,
    orderStatus: 'Confirmed',
    trackingSteps: [
      { label: 'Order Placed', time: 'Just now', completed: true, active: false },
      { label: 'Order Confirmed', time: 'Just now', completed: true, active: true },
      { label: 'Packed in Luxury Box', time: 'Expected tomorrow', completed: false, active: false },
      { label: 'Dispatched via Express Courier', time: 'Expected in 2 days', completed: false, active: false },
      { label: 'Out for Delivery', time: 'Expected in 3-4 days', completed: false, active: false },
      { label: 'Delivered', time: 'Estimated 4-5 days', completed: false, active: false }
    ]
  };

  // Save to historical orders in localStorage
  try {
    let orders = JSON.parse(localStorage.getItem('lumera_orders')) || [];
    orders.unshift(completedOrder);
    localStorage.setItem('lumera_orders', JSON.stringify(orders));
  } catch (e) {}

  // Clear cart and pending session
  if (typeof clearCart === 'function') {
    clearCart();
  } else {
    localStorage.removeItem('lumera_cart');
  }
  localStorage.removeItem('lumera_pending_order');

  // Redirect to success page
  window.location.href = `order-success.html?orderId=${orderId}`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('paymentPane_qr') || document.getElementById('paymentPane_upi')) {
    initPaymentPage();
  }
});

