import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [wish, setWish] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = collection(db, "wishlists");
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWishlist(data);
    });
    return () => unsub();
  }, []);

  const addWish = async () => {
    if (!wish) return;
    await addDoc(collection(db, "wishlists"), {
      item: wish,
      user: auth.currentUser.uid,
      addedBy: auth.currentUser.displayName || auth.currentUser.email, // Add this
      createdAt: new Date(),
    });
    setWish("");
  };

  const removeWish = async (id) => {
    await deleteDoc(doc(db, "wishlists", id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h1 className="text-xl font-semibold text-center mb-4">Your Wishlist</h1>
      <input
        className="input"
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        placeholder="Add item..."
      />
      <button
        className="btn w-full mt-2 cursor-pointer bg-gray-300"
        onClick={addWish}
      >
        Add
      </button>
      <ul className="mt-4">
        {wishlist.map((item) => (
          <li
            key={item.id}
            className="flex flex-col bg-gray-100 p-2 rounded mb-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.item}</span>
              <button
                className="text-red-500 cursor-pointer"
                onClick={() => removeWish(item.id)}
              >
                🗑
              </button>
            </div>
            <p className="text-sm text-gray-500">Added by: {item.addedBy}</p>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 btn bg-red-500 hover:bg-red-600 cursor-pointer"
        onClick={() => {
          signOut(auth);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
