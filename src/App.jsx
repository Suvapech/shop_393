import React, { useState } from 'react';
import ProductList from './ProductList';
import { ShoppingCartIcon } from '@heroicons/react/outline';

function App() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const shippingFee = 100;

  const products = [
    { id: 1, name: 'เสื้อผ้าแฟชั่นผู้หญิง เสื้อยืดตัวสั้นลายดอกไม้ แต่งระบายแขนพัฟแต่งลูกไม้', price: 144 , imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX5vUijp5lTsxFNXEf7k713BgCslvb_4BLWA&s' },
    { id: 2, name: 'ชุดเซ็ตสไตล์เกาหลี เสื้อผ้าแฟชั่นฤดูร้อนของผู้หญิง ชุดเสื้อแขนสั้น+กางเกงขาสั้นจั๊มเอวสุดน่ารัก', price: 97, imageUrl: 'https://down-th.img.susercontent.com/file/5a4c6032640dd356c148baa9117060f4' },
    { id: 3, name: 'เสื้อผ้าแฟชั่นผู้หญิง เสื้อยืด เสื้อ oversize สายเดี่ยว เสื้อครอป ชุดเซท มีให้เลือกมากมายหลาย', price: 79, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkFxpOV8c6b-C103m5O8Keiy8aIPhtRRP9VQ&s' },
    { id: 4, name: 'เสื้อผ้าแฟชั่น ชุดเข้าเซทเสื้อผ้าแฟชั่นผู้หญิงเสื้อแฟชั่นผู้หญิง เสื้อครอปแขนสั้น เสื้อผ้าแฟชั่นชุดเซ็ท', price: 479, imageUrl: 'https://cf.shopee.co.th/file/78a3fe99828ff581bce19529ebbb9f75' },
    { id: 5, name: 'ชุดเซ็ท 2ชิ้น เสื้อ+กางเกงขาสั้น ลายหมี แฟชั่นชุดลำลอง ลายหมีน่ารักมาก แบบสายเกาหลีมากแม่', price: 139, imageUrl: 'https://down-th.img.susercontent.com/file/15f2cbd551c89ea3fd648db6e0ade92a.webp' },
    { id: 6, name: 'ชุดนอนผ้าซาติน ซาตินเซ็กซี่ ชุดนอนไม่ได้นอนสาวอวบเดรส ชุดสายเดี่ยวเดรสกระโปรง', price: 150, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7r98p-lx9btjk1xwa859.webp' },
    { id: 7, name: 'เสื้อแฟชั่นผู้หญิง เสื้อซีฟองผู้หญิง เสื้อผู้หญิง เสื้อผู้หญิงลายดอก เสื้อสวยๆ เสื้อผ้าผญน่ารัก', price: 139, imageUrl: 'https://img.lazcdn.com/g/p/37383109c822f4c65d74324b4834ab95.jpg_720x720q80.jpg' },
    { id: 8, name: 'พร้อมส่ง เสื้อแจ็คเก็ต เสื้อคลุมผ้าร่ม ครอป ฮู้ดแขนยาว กันแดด กันลม แฟชั่นผู้หญิง ใส่สบาย', price: 173, imageUrl: 'https://img.lazcdn.com/g/ff/kf/S7ba485b0e2d6471ea8d3b48afc07e553F.jpg_720x720q80.jpg' },
    { id: 9, name: 'ชุดเซ็ท 2ชิ้น เสื้อ+กางเกงขาสั้น สวยๆน่ารักๆ แฟชั่นชุดลำลอง เสื้อแฟชั่นผู้หญิง ใส่สบาย', price: 250, imageUrl: 'https://img.lazcdn.com/g/ff/kf/S017227dba37849889b793d2e41b65406V.jpg' },
    { id: 10, name: 'เสื้อคอกลมเอวสูงสไตล์ขี้เกียจสำหรับผู้หญิงฤดูร้อนใหม่เก๋ไก๋สไตล์เกาหลีสั้น เสื้อยืดแขน ', price: 59, imageUrl: 'https://img.lazcdn.com/g/p/19d5029a585fac8bfb229315d778119b.jpg_720x720q80.jpg' },
  ];

  const couponCodes = {
    'DISCOUNT10': 10,
    'DISCOUNT20': 20,
    // เพิ่มคูปองเพิ่มเติมที่นี่
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    ));
  };

  const applyCoupon = () => {
    if (couponCodes[coupon]) {
      setDiscount(couponCodes[coupon]);
    } else {
      setDiscount(0);
      alert('คูปองไม่ถูกต้อง');
    }
    setCoupon('');
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalAfterDiscount = subtotal - (subtotal * discount / 100);
    return totalAfterDiscount + (cart.length > 0 ? shippingFee : 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('กรุณาเพิ่มสินค้าในตะกร้าก่อนทำการชำระเงิน'); // Alert if cart is empty
    } else {
      // Proceed to payment logic here
      alert(`Total amount to pay: ${calculateTotal()} บาท`); // Example action
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold my-8 text-center">Omega Shop</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Sidebar: Shopping Cart */}
          <div className="col-span-1 bg-white p-4 shadow-lg rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">ตะกร้าสินค้า</h2>
            </div>

            {cart.length > 0 && (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="border-b py-2">
                      <div className="flex justify-between items-center">
                        <span>{item.name} - {item.price} บาท x {item.quantity}</span>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="bg-red-500 text-white px-2 py-1 rounded-md">-</button>
                          <button onClick={() => updateQuantity(item.id, 1)} className="bg-green-500 text-white px-2 py-1 rounded-md">+</button>
                          <button onClick={() => removeFromCart(item.id)} className="bg-gray-500 text-white px-2 py-1 rounded-md">ลบ</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Coupon Section */}
                <div className="mt-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ใส่คูปอง"
                    className="border p-2 rounded-md w-full"
                  />
                  <button onClick={applyCoupon} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    ใช้คูปอง
                  </button>
                </div>

                {/* Shipping Fee and Total Price */}
                <div className="mt-4">
                  <h2 className="text-xl">ค่าขนส่ง: {shippingFee} บาท</h2>
                  <h2 className="text-xl font-bold mt-4">ราคารวม: {calculateTotal()} บาท</h2>
                  <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    ชำระเงิน
                  </button>
                </div>
              </>
            )}
            <h2>รายการสินค้า</h2>
          </div>

          {/* Product List */}
          <div className="col-span-2">
            <ProductList products={products} addToCart={addToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;