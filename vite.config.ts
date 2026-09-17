import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          shop: path.resolve(__dirname, 'shop.html'),
          products: path.resolve(__dirname, 'products.html'),
          makeup: path.resolve(__dirname, 'makeup.html'),
          skincare: path.resolve(__dirname, 'skincare.html'),
          haircare: path.resolve(__dirname, 'haircare.html'),
          fragrance: path.resolve(__dirname, 'fragrance.html'),
          bodycare: path.resolve(__dirname, 'bodycare.html'),
          lipcare: path.resolve(__dirname, 'lipcare.html'),
          newArrivals: path.resolve(__dirname, 'new-arrivals.html'),
          bestSellers: path.resolve(__dirname, 'best-sellers.html'),
          offers: path.resolve(__dirname, 'offers.html'),
          productDetails: path.resolve(__dirname, 'product-details.html'),
          search: path.resolve(__dirname, 'search.html'),
          wishlist: path.resolve(__dirname, 'wishlist.html'),
          cart: path.resolve(__dirname, 'cart.html'),
          checkout: path.resolve(__dirname, 'checkout.html'),
          payment: path.resolve(__dirname, 'payment.html'),
          orderSuccess: path.resolve(__dirname, 'order-success.html'),
          myOrders: path.resolve(__dirname, 'my-orders.html'),
          orderTracking: path.resolve(__dirname, 'order-tracking.html'),
          account: path.resolve(__dirname, 'account.html'),
          login: path.resolve(__dirname, 'login.html'),
          signup: path.resolve(__dirname, 'signup.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          enquiry: path.resolve(__dirname, 'enquiry.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          shippingPolicy: path.resolve(__dirname, 'shipping-policy.html'),
          returnPolicy: path.resolve(__dirname, 'return-policy.html')
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
