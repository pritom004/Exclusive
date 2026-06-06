import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/order/");
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="p-4 text-center text-gray-500">You have no previous orders.</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

      {orders.map((order) => (
        <div key={order._id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          
    
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 text-sm">
            <div className="flex gap-6">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Order Placed</p>
                <p className="font-medium text-gray-800">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total</p>
                <p className="font-medium text-gray-800">${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Order # {order._id}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize
                ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                  order.paymentStatus === 'unpaid' ? 'bg-red-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {order.paymentStatus}
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize
                ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' : 
                  order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {order.orderStatus}
              </span>
            </div>
          </div>

          <div className="px-6 py-4 space-y-4">
          
            <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] text-xs font-semibold text-gray-500 uppercase tracking-wider border-b pb-2">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Subtotal</span>
            </div>

            {order.items.map((item) => (
              <div
                key={item.productId?._id || item.productId}
                className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] items-center gap-4 py-2"
              >
            
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 shrink-0 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                    {item.image?.url ? (
                      <img className="w-full h-full object-cover" src={item.image.url} alt={item.image.alt || "Product image"} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </div>
                  <div>
                    
                    <h4 className="font-medium text-gray-800">{item.productId?.name || item.name}</h4>
                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                      </p>
                    )}
                  </div>
                </div>

               
                <div className="md:text-center text-gray-600">
                  <span className="md:hidden font-medium text-gray-500 text-sm">Price: </span>
                  ${item.price.toFixed(2)}
                </div>
                
                <div className="md:text-center text-gray-600">
                  <span className="md:hidden font-medium text-gray-500 text-sm">Qty: </span>
                  {item.quantity}
                </div>
                
                <div className="md:text-right font-medium text-gray-800">
                  <span className="md:hidden font-medium text-gray-500 text-sm">Subtotal: </span>
                  ${item.subTotal.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;