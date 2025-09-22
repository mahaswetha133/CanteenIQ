const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require(process.env.FIREBASE_ADMIN_KEY_PATH);
// 🔑 Import service account
//const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ------------------ MENU ITEMS API ------------------

// ✅ GET all menu items
app.get("/api/menuItems", async (req, res) => {
  try {
    const snapshot = await db.collection("menuItems").get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ POST add new menu item
app.post("/api/menuItems", async (req, res) => {
  try {
    const newItem = req.body; // {name, category, price, image}
    const docRef = await db.collection("menuItems").add(newItem);
    res.json({ id: docRef.id, ...newItem });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ PUT update menu item
app.put("/api/menuItems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await db.collection("menuItems").doc(id).update(updates);
    res.json({ id, ...updates });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ DELETE menu item
app.delete("/api/menuItems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("menuItems").doc(id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------ ORDERS API (example) ------------------

// ✅ GET all orders
app.get("/api/orders", async (req, res) => {
  try {
    const snapshot = await db.collection("orders").get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ POST new order
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = req.body; // {userId, items, status}
    const docRef = await db.collection("orders").add(newOrder);
    res.json({ id: docRef.id, ...newOrder });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ PUT update order status
app.put("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await db.collection("orders").doc(id).update(updates);
    res.json({ id, ...updates });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ DELETE order
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("orders").doc(id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------ SERVER ------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
