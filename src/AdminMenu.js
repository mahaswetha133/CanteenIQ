import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AdminMenu() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", image: "" });
  const [editId, setEditId] = useState(null);

  const menuRef = collection(db, "menuItems");

  // Fetch items on load
  useEffect(() => {
  const fetchMenu = async () => {
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    setMenuItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  fetchMenu();
}, []);

  const fetchMenu = async () => {
    const snapshot = await getDocs(menuRef);
    setMenuItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing item
      const itemRef = doc(db, "menuItems", editId);
      await updateDoc(itemRef, {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        image: form.image,
      });
      setEditId(null);
    } else {
      // Add new item
      await addDoc(menuRef, {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        image: form.image,
      });
    }
    setForm({ name: "", category: "", price: "", image: "" });
    fetchMenu();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "menuItems", id));
    fetchMenu();
  };

  return (
    <div className="container py-5">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)} // <-- Goes back to previous page
      >
        ← Back
      </button>
      <h2 className="fw-bold text-warning mb-4">🍽️ Manage Menu</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </div>
          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-success">
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Items List */}
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow">
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>Category:</strong> {item.category} <br />
                  <strong>Price:</strong> ₹{item.price}
                </p>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMenu;
