import React, { useEffect, useState } from "react";
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Admin() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    available: true,
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchMenu = async () => {
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    setMenuItems(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (imageFile) {
      // upload to Firebase Storage
      const imageRef = ref(storage, `menuImages/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "menuItems"), {
      ...newItem,
      price: Number(newItem.price),
      imageUrl,
    });

    setNewItem({ name: "", price: "", category: "", available: true });
    setImageFile(null);
    fetchMenu(); // refresh
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, "menuItems", id));
    fetchMenu(); // refresh
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">👨‍🍳 Admin Dashboard</h2>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          className="form-control mb-2"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="form-control mb-2"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
        />

        <button type="submit" className="btn btn-warning w-100">
          Add Item
        </button>
      </form>

      {/* Item List */}
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="card-img-top mb-2"
                  style={{ height: "150px", objectFit: "cover" }}
                />
              )}
              <h5>{item.name}</h5>
              <p>₹{item.price} | {item.category}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
