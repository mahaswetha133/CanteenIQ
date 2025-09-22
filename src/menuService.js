// menuService.js
import { db } from "./firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// 🔹 Listen for category items (real-time)
export const listenCategoryItems = (category, callback) => {
  const q = query(collection(db, "menuItems"), where("category", "==", category));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};

// 🔹 Add new menu item
export const addMenuItem = async (category, item) => {
  await addDoc(collection(db, "menuItems"), {
    ...item,
    category,
    createdAt: serverTimestamp(),
  });
};

// 🔹 Update item
export const updateMenuItem = async (id, newData) => {
  const itemRef = doc(db, "menuItems", id);
  await updateDoc(itemRef, newData);
};

// 🔹 Delete item
export const deleteMenuItem = async (id) => {
  await deleteDoc(doc(db, "menuItems", id));
};
