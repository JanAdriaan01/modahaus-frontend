import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../components/OrderContext';
import { 
  PRODUCT_LIBRARY, 
  GLASS_MULTIPLIER, 
  FINISH_MULTIPLIER, 
  parseSku, 
  findProductByPrefix,
  PRODUCT_REVIEWS 
} from '../data/catalog';
import { sendOrderEmail } from '../utils/emailService';
import ProductReviews from '../components/ProductReviews';

function ProductDetails() {
  const { code: rawSku } = useParams();
  const sku = decodeURIComponent(rawSku || "");
  const navigate = useNavigate();
  const { addItem } = useOrder();

  const { prefix, size: initialSize } = parseSku(sku);
  const productEntry = findProductByPrefix(prefix);
  const productType = productEntry ? productEntry[0] : null;
  const product = productEntry ? productEntry[1] : null;

  const reviews = PRODUCT_REVIEWS[sku] || [];
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const [config, setConfig] = useState({
    size: initialSize || (product ? Object.keys(product.sizes)[0] : ""),
    glazing: "clear",
    colour: "white",
    quantity: 1,
  });

  const showCustomerInfoPopup = () => {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      `;

      const popup = document.createElement('div');
      popup.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
      `;

      popup.innerHTML = `
        <h3 class="text-xl font-bold mb-4">Order Confirmation</h3>
        <p class="text-zinc-600 mb-4">Enter your details to receive order confirmation:</p>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-zinc-700 mb-1">Full Name *</label>
            <input type="text" id="customerName" 
              class="w-full px-3 py-2 border border-zinc-300 rounded-lg" 
              placeholder="Your full name" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-zinc-700 mb-1">Email Address *</label>
            <input type="email" id="customerEmail" 
              class="w-full px-3 py-2 border border-zinc-300 rounded-lg" 
              placeholder="your.email@example.com" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-zinc-700 mb-1">Phone Number</label>
            <input type="tel" id="customerPhone" 
              class="w-full px-3 py-2 border border-zinc-300 rounded-lg" 
              placeholder="+27 ...">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-zinc-700 mb-1">Site Address</label>
            <textarea id="customerAddress" 
              class="w-full px-3 py-2 border border-zinc-300 rounded-lg" 
              placeholder="Installation address" rows="2"></textarea>
          </div>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button type="button" id="cancelBtn" 
            class="flex-1 px-4 py-2 border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-50">
            Skip Email
          </button>
          <button type="button" id="submitBtn" 
            class="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800">
            Confirm & Email
          </button>
        </div>
      `;

      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      const submitBtn = popup.querySelector('#submitBtn');
      const cancelBtn = popup.querySelector('#cancelBtn');

      const submitForm = () => {
        const name = popup.querySelector('#customerName').value.trim();
        const email = popup.querySelector('#customerEmail').value.trim();
        const phone = popup.querySelector('#customerPhone').value.trim();
        const address = popup.querySelector('#customerAddress').value.trim();

        if (!name || !email) {
          alert('Please fill in at least your name and email address.');
          return;
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        document.body.removeChild(overlay);
        resolve({
          name,
          email: email || 'info@modahaus.co.za',
          phone: phone || 'Not provided',
          address: address || 'Not provided',
          source: 'Product Details Page'
        });
      };

      const cancelForm = () => {
        document.body.removeChild(overlay);
        resolve(null);
      };

      submitBtn.addEventListener('click', submitForm);
      cancelBtn.addEventListener('click', cancelForm);

      popup.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitForm();
      });
    });
  };

  const handleAdd = async () => {
    if (!base) {
      alert("Please select a valid size.");
      return;
    }
    
    const item = {
      system: product.codePrefix,
      systemName: `${productType} ${config.size}`,
      size: config.size,
      glazing: config.glazing,
      finish: config.colour,
      quantity: config.quantity,
      price,
      subtotal: price * config.quantity,
      timestamp: new Date().toISOString()
    };
    
    addItem(item);
    
    const customerInfo = await showCustomerInfoPopup();
    
    if (customerInfo) {
      try {
        await sendOrderEmail(item, customerInfo);
        console.log('✅ Order notification sent');
        
        if (customerInfo.email && customerInfo.email !== "orders@modahaus.co.za") {
          alert(`${productType} added to order! Confirmation sent to ${customerInfo.email}`);
        } else {
          alert(`${productType} added to order! We'll contact you shortly.`);
        }
      } catch (error) {
        console.warn('❌ Email notification failed:', error);
        alert(`${productType} added to order! (Email notification failed)`);
      }
    } else {
      alert(`${productType} added to order!`);
    }
  };

  const base = product?.sizes[config.size] || 0;
  const price = base ?
    Math.round(
      base *
        (GLASS_MULTIPLIER[config.glazing] || 1) *
        (FINISH_MULTIPLIER[config.colour] || 1) / 10
    ) * 10 : 0;

  if (!product) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:underline">
          ← Back
        </button>
        <div className="text-zinc-600">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:underline">
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden border border-zinc-200">
          <img src={product.image} alt={productType} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{productType}</h1>
          <div className="text-zinc-600 mt-1">{product.description}</div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="font-medium text-sm text-zinc-700">Select Size</label>
              <select
                value={config.size}
                onChange={(e) => setConfig({ ...config, size: e.target.value })}
                className="block w-full border border-zinc-300 rounded-lg mt-1 p-2"
              >
                {Object.keys(product.sizes).map((sz) => (
                  <option key={sz} value={sz}>{sz} mm</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-medium text-sm text-zinc-700">Glazing</label>
              <select
                value={config.glazing}
                onChange={(e) => setConfig({ ...config, glazing: e.target.value })}
                className="block w-full border border-zinc-300 rounded-lg mt-1 p-2"
              >
                <option value="clear">Clear</option>
                <option value="tinted">Tinted</option>
                <option value="laminated">Laminated</option>
                <option value="lowe">Low-E</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-sm text-zinc-700">Frame Colour</label>
              <select
                value={config.colour}
                onChange={(e) => setConfig({ ...config, colour: e.target.value })}
                className="block w-full border border-zinc-300 rounded-lg mt-1 p-2"
              >
                <option value="white">Powder Coat — White</option>
                <option value="charcoal">Powder Coat — Charcoal</option>
                <option value="black">Powder Coat — Black</option>
                <option value="bronze">Anodised — Bronze</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-sm text-zinc-700">Quantity</label>
              <input
                type="number"
                min="1"
                value={config.quantity}
                onChange={(e) => setConfig({ ...config, quantity: Number(e.target.value) || 1 })}
                className="block w-full border border-zinc-300 rounded-lg mt-1 p-2"
              />
            </div>
          </div>

          <div className="mt-6 text-2xl font-semibold">
            {base ? `Price: R ${price.toLocaleString()}` : "Select size to see price"}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleAdd}
              disabled={!base}
              className={`px-6 py-3 rounded-2xl text-base font-medium transition ${
                base
                  ? "bg-zinc-900 text-white hover:bg-zinc-800"
                  : "bg-zinc-300 text-zinc-600 cursor-not-allowed"
              }`}
            >
              🛒 Add to Order & Confirm
            </button>
          </div>
          
          <div className="mt-6 text-sm text-zinc-500">
            Lead times from 10 working days depending on finish and glazing.
          </div>
        </div>
      </div>
 
      <ProductReviews sku={sku} reviews={reviews} averageRating={averageRating} />
    </div>
  );
}

export default ProductDetails;