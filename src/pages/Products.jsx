import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_LIBRARY, ROOM_PRESETS, makeSku } from '../data/catalog';
import ReviewSummary from '../components/ReviewSummary';

function Products() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const presetSizes = room ? ROOM_PRESETS[room] || [] : null;

  const gridItems = useMemo(() => {
    const items = [];
    Object.entries(PRODUCT_LIBRARY).forEach(([type, product]) => {
      if (typeFilter && type !== typeFilter) return;

      Object.entries(product.sizes).forEach(([size, basePrice]) => {
        if (presetSizes && !presetSizes.includes(size)) return;
        const sku = makeSku(product.codePrefix, size);
        items.push({
          sku,
          type,
          size,
          name: `${type} ${size}`,
          image: product.image,
          price: basePrice,
        });
      });
    });
    return items;
  }, [room, typeFilter]);

  return (
    <div className="grid lg:grid-cols-[280px,1fr] gap-8">
      <aside className="space-y-6 bg-white border border-zinc-200 rounded-2xl p-4 h-max sticky top-24">
        <h2 className="font-semibold text-zinc-800">Filters</h2>

        <div>
          <div className="font-medium text-sm text-zinc-800 mb-1">Room</div>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm"
          >
            <option value="">All rooms</option>
            <option>Bathroom</option>
            <option>Bedroom</option>
            <option>Kitchen</option>
            <option value="LivingRoom">Living Room</option>
          </select>
          <div className="text-xs text-zinc-500 mt-1">
            Presets: {room ? (ROOM_PRESETS[room] || []).join(", ") : "–"}
          </div>
        </div>

        <div>
          <div className="font-medium text-sm text-zinc-800 mb-1">Window Type</div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm"
          >
            <option value="">All types</option>
            {Object.keys(PRODUCT_LIBRARY).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-zinc-500">
          Prices shown are for **clear glass & white frame**. Adjust on the product page.
        </div>
      </aside>

      <div>
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        {gridItems.length === 0 ? (
          <div className="text-sm text-zinc-600">No products match your filters.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gridItems.map((item) => (
              <div key={item.sku} className="rounded-2xl border border-zinc-200 overflow-hidden bg-white">
                <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" />
                <div className="p-4">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-zinc-600">{item.type}</div>
                  <ReviewSummary sku={item.sku} />
                  <div className="mt-1 font-bold">R {item.price.toLocaleString()}</div>
                  <button
                    onClick={() => navigate(`/products/${encodeURIComponent(item.sku)}`)}
                    className="mt-3 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
