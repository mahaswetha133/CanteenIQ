import React from "react";

function AdminDashboard() {
  return (
    <div className="container py-5 text-white bg-dark vh-100">
      <h2 className="text-warning text-center">⚡ Admin Dashboard</h2>
      <p className="text-center">Manage Menu and Track Orders</p>

      {/* Example sections */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card bg-secondary p-3 shadow">
            <h5 className="text-warning">📋 Manage Menu</h5>
            <button className="btn btn-sm btn-light mt-2">Add Item</button>
            <button className="btn btn-sm btn-light mt-2">Edit Item</button>
            <button className="btn btn-sm btn-danger mt-2">Delete Item</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-secondary p-3 shadow">
            <h5 className="text-warning">🚚 Update Orders</h5>
            <button className="btn btn-sm btn-success mt-2">Mark as Delivered</button>
            <button className="btn btn-sm btn-warning mt-2">Update Status</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
