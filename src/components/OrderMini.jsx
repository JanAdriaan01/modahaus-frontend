import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from './OrderContext';

function OrderMini() {
  const { items } = useOrder();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/order")}
      className="px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-sm"
    >
      Order <span className="opacity-80">({items.length})</span>
    </button>
  );
}

export default OrderMini;