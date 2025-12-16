// src/app/api/seed/route.js
import { db } from "@/app/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { allPackages } from "@/app/data/packages";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const packagesRef = collection(db, "packages");

    // Loop through standard data and upload to Firestore
    const uploadPromises = allPackages.map(async (pkg) => {
      // We use the existing 'id' as the document name for easy reference
      // Converting to string because Firestore document IDs must be strings
      const docId = pkg.id.toString();
      await setDoc(doc(db, "packages", docId), {
        ...pkg,
        // Ensure numeric values remain numeric, good for sorting later
        price: Number(pkg.price),
        rating: Number(pkg.rating),
        duration: Number(pkg.duration),
      });
    });

    await Promise.all(uploadPromises);

    return NextResponse.json({
      message: "Success! Database seeded with 9 packages.",
      count: allPackages.length
    }, { status: 200 });

  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}