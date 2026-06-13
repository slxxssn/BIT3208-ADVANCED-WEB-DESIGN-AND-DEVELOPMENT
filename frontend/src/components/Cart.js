// frontend/src/components/Cart.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';
import { FaMobileAlt, FaCreditCard, FaMoneyBillWave, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'info' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInput, setPaymentInput] = useState({
    phone: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [paymentError, setPaymentError] = useState('');

  const userId = localStorage.getItem('userId');

  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
      showPopup('Failed to load cart', 'error');
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId, fetchCart]);

  const showPopup = (message, type = 'info') => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: '', type: 'info' });
    }, 2500);
  };

  const handleRemoveClick = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/cart/${selectedId}`);
      setShowConfirm(false);
      fetchCart();
      showPopup('Item removed', 'success');
    } catch (err) {
      console.log(err);
      showPopup('Error removing item', 'error');
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const placeOrder = async (paymentValue = null) => {
    try {
      await axios.post(`${BASE_URL}/api/orders`, {
        user_id: userId,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        payment_method: paymentMethod,
        payment_value: paymentValue
      });

      await axios.delete(`${BASE_URL}/api/cart/clear/${userId}`);
      fetchCart();

      if (paymentMethod === 'card') {
        setShowPaymentModal(false);
        showPopup('Card payment successful!', 'success');
      } else if (paymentMethod === 'cod') {
        setShowPaymentModal(false);
        showPopup('Order placed successfully!', 'success');
      }

    } catch (err) {
      console.log(err);
      showPopup('Checkout failed', 'error');
    }
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;

    if (paymentMethod === 'cod') {
      placeOrder();
    } else {
      setPaymentInput({ phone:'', cardNumber:'', cardName:'', expiry:'', cvv:'' });
      setPaymentError('');
      setShowPaymentModal(true);
    }
  };

  // ✅ FIXED M-PESA FLOW (YOUR REQUEST)
  const handleMpesaConfirm = async () => {
    if (!paymentInput.phone.match(/^07\d{8}$/)) {
      setPaymentError('Enter a valid Kenyan phone number (07XXXXXXXX)');
      return;
    }

    if (total <= 0) {
      setPaymentError('Cart total must be greater than 0');
      return;
    }

    setPaymentError('');

    // CLOSE MODAL FIRST
    setShowPaymentModal(false);

    // SHOW REALISTIC MESSAGE
    showPopup(
      'M-Pesa payment request initiated successfully. Check your phone to complete payment.',
      'success'
    );

    await placeOrder({ phone: paymentInput.phone });
  };

  const handleCardConfirm = () => {
    const { cardNumber, cardName, expiry, cvv } = paymentInput;

    if (!cardName.trim()) { setPaymentError('Enter cardholder name'); return; }
    if (!cardNumber.match(/^\d{16}$/)) { setPaymentError('Enter a valid 16-digit card number'); return; }
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) { setPaymentError('Enter expiry in MM/YY'); return; }
    if (!cvv.match(/^\d{3}$/)) { setPaymentError('Enter a valid 3-digit CVV'); return; }

    setPaymentError('');
    showPopup('Card payment successful!', 'success');

    placeOrder({ cardNumber, cardName, expiry, cvv });
  };

  return (
    <div className="space-y-6 relative min-h-screen bg-[#0b0f19] text-white px-4 sm:px-6 md:px-10 py-6">

      {cartItems.length === 0 && (
        <div className="flex items-center justify-center min-h-[50vh] text-center">
          <p className="text-gray-400 text-xl md:text-2xl font-semibold">
            Your Cart is Empty
          </p>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-lg
                           hover:scale-[1.03] hover:shadow-[0_0_20px_#38bdf8]
                           transition flex flex-col justify-between"
              >
                <div className="w-full h-48 rounded-lg overflow-hidden bg-black/30 mb-3">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{item.description || ''}</p>
                  <p className="text-cyan-400 font-bold">${item.price}</p>
                  <p className="text-gray-300 text-sm">Qty: {item.quantity}</p>
                  <p className="text-white font-semibold">
                    Total: ${item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveClick(item.id)}
                  className="mt-3 w-full py-2 rounded-lg bg-red-500/20 border border-red-500
                             text-red-300 hover:bg-red-500/40 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg
                          flex flex-col md:flex-row justify-between gap-6 items-center">

            <div>
              <p className="text-lg font-semibold">
                Grand Total: <span className="text-cyan-400">${total}</span>
              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer
                  ${paymentMethod === 'mpesa'
                    ? 'border-green-400 bg-green-500/10'
                    : 'border-white/10 bg-white/5'}`}>
                  <input type="radio" hidden checked={paymentMethod === 'mpesa'}
                    onChange={() => setPaymentMethod('mpesa')} />
                  <FaMobileAlt className="text-green-400" />
                  M-Pesa
                </label>

                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer
                  ${paymentMethod === 'card'
                    ? 'border-blue-400 bg-blue-500/10'
                    : 'border-white/10 bg-white/5'}`}>
                  <input type="radio" hidden checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')} />
                  <FaCreditCard className="text-blue-400" />
                  Card
                </label>

                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer
                  ${paymentMethod === 'cod'
                    ? 'border-yellow-400 bg-yellow-500/10'
                    : 'border-white/10 bg-white/5'}`}>
                  <input type="radio" hidden checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')} />
                  <FaMoneyBillWave className="text-yellow-400" />
                  COD
                </label>

              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600
                         hover:scale-105 transition font-semibold shadow-lg"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-80 p-6 rounded-xl bg-[#0b0f19] border border-white/10 backdrop-blur-lg">

            <h2 className="text-lg font-semibold mb-3 text-center">
              {paymentMethod === 'mpesa' ? 'M-Pesa Payment' : 'Card Payment'}
            </h2>

            {paymentError && (
              <div className="mb-3 text-red-400 text-sm">{paymentError}</div>
            )}

            {paymentMethod === 'mpesa' ? (
              <input
                className="w-full p-2 rounded bg-white/5 border border-white/10 text-white"
                placeholder="07XXXXXXXX"
                value={paymentInput.phone}
                onChange={(e) =>
                  setPaymentInput(prev => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <div className="space-y-2">
                <input className="w-full p-2 rounded bg-white/5 border border-white/10 text-white"
                  placeholder="Card Name"
                  value={paymentInput.cardName}
                  onChange={(e) =>
                    setPaymentInput(prev => ({ ...prev, cardName: e.target.value }))
                  }
                />
                <input className="w-full p-2 rounded bg-white/5 border border-white/10 text-white"
                  placeholder="Card Number"
                  value={paymentInput.cardNumber}
                  onChange={(e) =>
                    setPaymentInput(prev => ({ ...prev, cardNumber: e.target.value }))
                  }
                />
                <div className="flex gap-2">
                  <input className="w-1/2 p-2 rounded bg-white/5 border border-white/10 text-white"
                    placeholder="MM/YY"
                    value={paymentInput.expiry}
                    onChange={(e) =>
                      setPaymentInput(prev => ({ ...prev, expiry: e.target.value }))
                    }
                  />
                  <input className="w-1/2 p-2 rounded bg-white/5 border border-white/10 text-white"
                    placeholder="CVV"
                    value={paymentInput.cvv}
                    onChange={(e) =>
                      setPaymentInput(prev => ({ ...prev, cvv: e.target.value }))
                    }
                  />
                </div>
              </div>
            )}

            <button
              onClick={paymentMethod === 'mpesa' ? handleMpesaConfirm : handleCardConfirm}
              className="w-full mt-4 py-2 rounded-lg bg-green-500/20 border border-green-400
                         hover:bg-green-500/30 transition"
            >
              Pay Now
            </button>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full mt-2 py-2 rounded-lg bg-white/10 border border-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0b0f19] border border-white/10 p-6 rounded-xl text-center">
            <p className="mb-4">Remove this item?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={confirmRemove} className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg">
                Yes
              </button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-black/70 border border-white/10">
            {popup.type === 'success' && <FaCheckCircle className="text-green-400" />}
            {popup.type === 'error' && <FaExclamationCircle className="text-red-400" />}
            <span>{popup.message}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;