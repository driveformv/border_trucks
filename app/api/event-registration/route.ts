import { NextResponse } from "next/server";
import { EventRegistration } from "@/types/event";
import { db } from "@/lib/firebase";
import { ref, push, set, get, runTransaction } from "firebase/database";

export async function POST(request: Request) {
  try {
    const data: EventRegistration = await request.json();

    // Check event capacity
    const eventRef = ref(db, `events/${data.eventId}`);
    const eventSnapshot = await get(eventRef);
    const event = eventSnapshot.val();

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (event.maxAttendees) {
      // Use transaction to safely update attendee count
      const result = await runTransaction(ref(db, `events/${data.eventId}/currentAttendees`), (currentAttendees) => {
        const newCount = (currentAttendees || 0) + data.numberOfAttendees;
        if (newCount > event.maxAttendees) {
          // Signal that the transaction should be aborted
          return;
        }
        return newCount;
      });

      if (!result.committed) {
        return NextResponse.json(
          { error: "Event is at capacity" },
          { status: 400 }
        );
      }
    }

    // Save to Firebase under events
    const registrationsRef = ref(db, `events/${data.eventId}/registrations`);
    const newRegistrationRef = push(registrationsRef);
    await set(newRegistrationRef, {
      ...data,
      id: newRegistrationRef.key,
      createdAt: new Date().toISOString()
    });

    // Send emails using centralized email system
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "event",
        email: data.email,
        attendeeName: data.attendeeName,
        companyName: data.companyName,
        numberOfAttendees: data.numberOfAttendees,
        eventId: data.eventId,
        phone: data.phone,
        jobTitle: data.jobTitle,
        specialRequirements: data.specialRequirements,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
