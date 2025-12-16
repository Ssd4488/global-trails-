import { db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// The static testimonials currently in your component
const testimonials = [
  {
    id: "testimonial1",
    quote: "GlobeTrails planned the most incredible trip to Japan for us. Every detail was perfect, from the hotels to the tours. Truly a five-star experience!",
    name: "Aarav Sharma",
    location: "Mumbai, India",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop",
  },
  {
    id: "testimonial2",
    quote: "Our honeymoon in Santorini was a dream come true, all thanks to the GlobeTrails team. The recommendations were spot on. We can't wait to book our next trip!",
    name: "Priya Patel",
    location: "London, UK",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop",
  },
  {
    id: "testimonial3",
    quote: "The Kerala backwaters tour was absolutely serene and well-organized. It was the perfect relaxing getaway we needed. Highly recommended for a peaceful retreat.",
    name: "Rohan Das",
    location: "Bengaluru, India",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop",
  },
  {
    id: "testimonial4",
    quote: "I never thought I'd see the Northern Lights, but GlobeTrails made it happen! The entire trip to Norway was seamless and magical. A life-changing experience.",
    name: "Ananya Rao",
    location: "Singapore",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=461&auto=format&fit=crop",
  },
];

export async function GET() {
  try {
    const uploadPromises = testimonials.map(async (testimonial) => {
      // Upload each one to the 'testimonials' collection
      await setDoc(doc(db, "testimonials", testimonial.id), testimonial);
    });

    await Promise.all(uploadPromises);

    return NextResponse.json({
      message: "Success! 'testimonials' collection seeded with 4 reviews.",
      count: testimonials.length
    }, { status: 200 });

  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}