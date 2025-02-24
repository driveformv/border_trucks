import { NextResponse } from "next/server";
import { sendEmail, EmailData } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data: EmailData = await request.json();

    await sendEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
