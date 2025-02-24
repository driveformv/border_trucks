import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";
import { sendEmail } from "@/lib/email";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Save to Firebase under contacts
    const contactsRef = ref(db, "contacts");
    const newContactRef = push(contactsRef);
    await set(newContactRef, {
      ...data,
      id: newContactRef.key,
      createdAt: new Date().toISOString()
    });

    // Send email using centralized email system
    await sendEmail({
      type: "contact",
      email: data.email,
      name: data.name,
      phone: data.phone,
      message: data.message
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
