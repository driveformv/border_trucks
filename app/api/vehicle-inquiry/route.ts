import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the inquiry data for now
    console.log("Received vehicle inquiry:", body);

    // Always return success for now
    return NextResponse.json(
      { message: "Inquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing vehicle inquiry:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
