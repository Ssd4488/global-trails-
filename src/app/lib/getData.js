// src/app/lib/getData.js
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

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