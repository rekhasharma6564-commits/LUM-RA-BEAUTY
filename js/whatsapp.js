/**
 * LUMÉRA BEAUTY — WHATSAPP AUTOMATION ENGINE
 * Generates structured, URL-encoded WhatsApp messages for orders and enquiries.
 * Target Business Number: +91 9887972121
 */

const LUMERA_WHATSAPP_NUMBER = "919887972121";

// 1. Send Product / Wholesale Enquiry via WhatsApp
function sendWhatsAppEnquiry(e) {
  if (e && e.preventDefault) e.preventDefault();

  const name = document.getElementById('enquiryName')?.value.trim();
  const mobile = document.getElementById('enquiryMobile')?.value.trim();
  const email = document.getElementById('enquiryEmail')?.value.trim();
  const product = document.getElementById('enquiryProduct')?.value.trim();
  const quantity = document.getElementById('enquiryQuantity')?.value.trim();
  const budget = document.getElementById('enquiryBudget')?.value.trim();
  const message = document.getElementById('enquiryMessage')?.value.trim();

  if (!name || !mobile || !email || !message) {
    if (typeof showToast === 'function') {
      showToast('Please fill in all mandatory enquiry fields', 'error');
    }
    return;
  }

  const textLines = [
    "💄 *NEW BEAUTY PRODUCT ENQUIRY — LUMÉRA BEAUTY*",
    "",
    `👤 *Name:* ${name}`,
    `📱 *Mobile:* ${mobile}`,
    `✉️ *Email:* ${email}`,
    `📦 *Product Name:* ${product || 'General / Bulk Catalogue'}`,
    `🔢 *Quantity:* ${quantity || '1'}`,
    `💰 *Budget:* ${budget || 'Flexible'}`,
    "",
    `📝 *Message:*`,
    `${message}`,
    "",
    "✨ _Sent from Luméra Beauty Web Portal_"
  ];

  const fullText = textLines.join("\n");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${LUMERA_WHATSAPP_NUMBER}&text=${encodeURIComponent(fullText)}`;

  if (typeof showToast === 'function') {
    showToast('Redirecting to WhatsApp to send your enquiry...', 'success');
  }

  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 600);
}

// 2. Send Order Confirmation Message via WhatsApp
function sendWhatsAppOrder(orderId) {
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('lumera_orders')) || [];
  } catch (e) {}

  const order = orders.find(o => o.orderId === orderId) || orders[0];

  if (!order) {
    if (typeof showToast === 'function') {
      showToast('Order details not found', 'error');
    }
    return;
  }

  const itemsList = order.items.map(item => 
    `• ${item.name} (${item.color ? item.color + ', ' : ''}Qty: ${item.quantity}) — ₹${item.price * item.quantity}`
  ).join("\n");

  const textLines = [
    "🛍️ *NEW ORDER — LUMÉRA BEAUTY*",
    "",
    `🏷️ *Order ID:* ${order.orderId}`,
    `👤 *Customer Name:* ${order.customer.fullName}`,
    `📱 *Mobile:* ${order.customer.mobile}`,
    `✉️ *Email:* ${order.customer.email}`,
    `📍 *Delivery Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode} (${order.customer.state})`,
    "",
    "📦 *PRODUCTS:*",
    itemsList,
    "",
    `💵 *Subtotal:* ₹${order.financials.subtotal}`,
    `🏷️ *Discount:* -₹${order.financials.discountAmount || 0}`,
    `🚚 *Shipping:* ${order.financials.shipping === 0 ? 'FREE' : '₹' + order.financials.shipping}`,
    `🏛️ *Tax (GST):* ₹${order.financials.tax || 0}`,
    `⭐ *TOTAL AMOUNT:* ₹${order.financials.grandTotal}`,
    "",
    `💳 *Payment Method:* ${order.paymentMethod}`,
    `✅ *Payment Status:* ${order.paymentStatus}`,
    "",
    "💖 _Thank you for shopping with Luméra Beauty!_"
  ];

  const fullText = textLines.join("\n");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${LUMERA_WHATSAPP_NUMBER}&text=${encodeURIComponent(fullText)}`;

  window.open(whatsappUrl, '_blank');
}

// Event listener for enquiry page form
document.addEventListener('DOMContentLoaded', () => {
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', sendWhatsAppEnquiry);
  }
});
