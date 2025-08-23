
// // client/src/pages/AdminOrders.jsx
// import React, { useEffect, useState } from "react";
// import API from "../utils/api";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("adminToken");

//   const fetchOrders = async () => {
//     try {
//       const res = await API.get("/admin/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching orders", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (id, status) => {
//     await API.put(
//       `/admin/orders/${id}/status`,
//       { status },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchOrders();
//   };

//   const handleDelete = async (id) => {
//     await API.delete(`/admin/orders/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchOrders();
//   };

//   return (
//     <div className="container py-5">
//       <h2>Manage Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover align-middle">
//             <thead className="table-dark">
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer</th>
//                 <th>Contact</th>
//                 <th>Address</th>
//                 <th>Items</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((o) => (
//                 <tr key={o._id}>
//                   <td>{o.orderId}</td>
//                   <td>{o.customer?.name}</td>
//                   <td>{o.customer?.phone} <br /> {o.customer?.email}</td>
//                   <td>{o.customer?.address}</td>
//                   <td>
//                     {o.items.map((item, idx) => (
//                       <div key={idx}>
//                         {item.name} × {item.quantity} = ₹{item.price * item.quantity}
//                       </div>
//                     ))}
//                   </td>
//                   <td><strong>₹{o.total}</strong></td>
//                   <td>
//                     <select
//                       className="form-select"
//                       value={o.status}
//                       onChange={(e) => handleStatusChange(o._id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Accepted">Accepted</option>
//                       <option value="Delivered">Delivered</option>
//                     </select>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(o._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;


import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await API.put(
      `/admin/orders/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchOrders();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrders();
  };

  return (
    <div className="admin-orders-container">
      <h2 className="admin-orders-title">Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.orderId}</td>
                  <td>{o.customer?.name}</td>
                  <td>
                    {o.customer?.phone} <br /> {o.customer?.email}
                  </td>
                  <td>{o.customer?.address}</td>
                  <td className="admin-orders-items">
                    {o.items.map((item, idx) => (
                      <div key={idx}>
                        {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    <strong>₹{o.total}</strong>
                  </td>
                  <td>
                    <select
                      className="admin-orders-status"
                      value={o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="admin-orders-btn admin-orders-btn-delete"
                      onClick={() => handleDelete(o._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
