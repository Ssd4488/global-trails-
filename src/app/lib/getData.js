import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export async function getAllPackages() {
  try {
    const querySnapshot = await getDocs(collection(db, "packages"));
    // Convert the snapshot into a clean array of objects
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // Return empty array on error so the app doesn't crash
  }
}

// --- NEW: Fetch a single package by ID ---
export async function getPackageById(id) {
  try {
    const docRef = doc(db, "packages", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such package!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching package:", error);
    return null;
  }
}