import React, { useState, useEffect } from 'react';

const Payment = ({ amount: propAmount }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [payClicked, setPayClicked] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [amount, setAmount] = useState(0);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (propAmount) {
      setAmount(propAmount);
    } else {
      const storedAmount = localStorage.getItem('amountToPay');
      if (storedAmount) {
        setAmount(Number(storedAmount));
      } else {
        setAmount(0);
      }
    }
  }, [propAmount]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPayClicked(false);
    setUpiId('');
    setCardDetails({ number: '', expiry: '', cvv: '' });
  };

  const handlePayNow = () => {
    if (selectedMethod === 'UPI' && !upiId) return alert('Please enter UPI ID');
    if (
      selectedMethod === 'Debit/Credit Card' &&
      (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)
    )
      return alert('Please fill all card details');

    setPayClicked(true);
  };

  const handleConfirm = () => {
    if (isQRMethod) {
      setScanning(true);
      setTimeout(() => {
        setScanning(false);
        alert(`✅ Payment of ₹${amount} successful via ${selectedMethod}!`);
        handleCancel();
      }, 3000);
    } else {
      alert(`✅ Payment of ₹${amount} successful via ${selectedMethod}!`);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setSelectedMethod('');
    setPayClicked(false);
    setUpiId('');
    setCardDetails({ number: '', expiry: '', cvv: '' });
    setScanning(false);
  };

  const methods = [
    {
      name: 'Google Pay',
      icon: '🟢',
      logo: 'https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/436/Google_Pay_GPay_Logo-1024.png',
    },
    {
      name: 'PhonePe',
      icon: '🔵',
      logo: 'https://www.phonepe.com/icons/icon-144x144.png?v=1e5c98f168b1aeec4e1d02c0739fa229',
    },
    {
      name: 'Paytm',
      icon: '🔷',
      logo: 'https://assetscdn1.paytm.com/images/catalog/view_item/2832559/1725599834382.png',
    },
    {
      name: 'UPI',
      icon: '💸',
      logo: 'https://i.pinimg.com/736x/6c/44/82/6c44822612d9b38b097f6d067451ee98.jpg',
    },
    {
      name: 'Debit/Credit Card',
      icon: '💳',
    },
  ];

  const scannerImages = {
    'Google Pay': 'src\\assets\\Gpay.jpg',
    'PhonePe': 'src\\assets\\phonepe.jpg',
    'Paytm': 'src\\assets\\Paytm.jpg',
  };

  const isQRMethod = ['Google Pay', 'PhonePe', 'Paytm'].includes(selectedMethod);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-600">
          Choose Payment Method
        </h1>

        <div className="grid gap-4">
          {methods.map((method) => (
            <button
              key={method.name}
              onClick={() => handleMethodSelect(method.name)}
              className={`flex items-center justify-between p-3 rounded border transition-all ${
                selectedMethod === method.name
                  ? 'bg-green-100 border-green-500 font-bold'
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {method.logo ? (
                  <img src={method.logo} alt={method.name} className="w-6 h-6" />
                ) : (
                  <span className="text-xl">{method.icon}</span>
                )}
                <span>{method.name}</span>
              </div>
              <span className="text-sm text-gray-700 font-semibold">₹{amount}</span>
            </button>
          ))}
        </div>

        {/* UPI Input */}
        {selectedMethod === 'UPI' && (
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">Enter UPI ID</label>
            <input
              type="text"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {/* Card Input */}
        {selectedMethod === 'Debit/Credit Card' && (
          <div className="mt-4 grid gap-3">
            <input
              type="text"
              placeholder="Card Number"
              maxLength={16}
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="CVV"
              maxLength={3}
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {/* Show Scanner Immediately */}
        {isQRMethod && (
          <div className="mt-6 flex flex-col gap-4 items-center">
            <img
              src={scannerImages[selectedMethod]}
              alt={`${selectedMethod} QR`}
              className="w-48 h-48 object-contain"
            />
          </div>
        )}

        {/* Simulate Scanning */}
        {scanning && (
          <div className="flex flex-col items-center mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
              alt="Scanning..."
              className="w-20 h-20 animate-pulse"
            />
            <p className="text-sm text-gray-600 mt-2">Scanning QR Code...</p>
          </div>
        )}

        {/* Pay Button */}
        {selectedMethod && !payClicked && (
          <button
            onClick={handlePayNow}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Pay ₹{amount} with {selectedMethod}
          </button>
        )}

        {/* Confirm and Cancel */}
        {payClicked && !scanning && (
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={handleConfirm}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 w-full"
            >
              ✅ Confirm Payment of ₹{amount}
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white py-2 rounded hover:bg-red-700 w-full"
            >
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
