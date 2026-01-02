export const dynamic = "force-dynamic";

import { db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// The 3 slides we want to upload
const slides = [
  {
    id: "slide1",
    order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
    microTagline: "Discover • Experience • Remember",
    headline: 'Your Journey Begins Here',
    subtext: 'Discover breathtaking destinations and create unforgettable memories.',
  },
  {
    id: "slide2",
    order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=2070&auto=format&fit=crop',
    microTagline: "Iconic City of Light",
    headline: 'Experience the Magic of Paris',
    subtext: 'Walk through charming streets and witness iconic landmarks.',
  },
  {
    id: "slide3",
    order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop',
    microTagline: "Ancient Tradition, Modern Wonder",
    headline: 'Explore the Wonders of Tokyo',
    subtext: 'A perfect blend of ancient tradition and futuristic technology.',
  },
];

export async function GET() {
  try {
    const uploadPromises = slides.map(async (slide) => {
      // This saves each slide into the 'heroSlides' collection in Firebase
      await setDoc(doc(db, "heroSlides", slide.id), slide);
    });

    await Promise.all(uploadPromises);

    return NextResponse.json({
      message: "Success! 'heroSlides' collection seeded with 3 slides.",
      count: slides.length
    }, { status: 200 });

  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}