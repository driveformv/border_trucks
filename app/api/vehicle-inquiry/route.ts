import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";
import { sendEmail } from "@/lib/email";

interface VehicleInquiry {
  name: string;
  email: string;
  phone: string;
  company?: string;
  inquiryType: "purchase" | "test_drive" | "trade_in" | "financing" | "general";
  timeframe: "immediate" | "this_week" | "this_month" | "no_rush";
  message: string;
  vehicleId: string;
  vehicleInfo: {
    id: string;
    year: number;
    make: string;
    model: string;
    stockNumber: string;
  };
}

export async function POST(request: Request) {
  try {
    const data: VehicleInquiry = await request.json();

    // Save to Firebase under inquiries
    const inquiriesRef = ref(db, `inquiries/${data.vehicleId}`);
    const newInquiryRef = push(inquiriesRef);
    await set(newInquiryRef, {
      ...data,
      id: newInquiryRef.key,
      createdAt: new Date().toISOString()
    });

    // Send emails using centralized email system
    await sendEmail({
      type: "vehicle",
      email: data.email,
      name: data.name,
      phone: data.phone,
      vehicleId: data.vehicleId,
      message: data.message
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vehicle inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process vehicle inquiry" },
      { status: 500 }
    );
  }
}
