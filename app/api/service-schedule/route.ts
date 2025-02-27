import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Format the services array into a readable string
    const servicesString = data.services.map((serviceId: string) => {
      const serviceMap: { [key: string]: string } = {
        warranty: "Warranty Work",
        mobile: "24/7 Mobile Maintenance",
        oil_change: "Oil Change/Preventive Maintenance",
        engine: "Engine Repair/Replacement",
        exhaust: "Exhaust/Emissions/DPF Filter",
        air_brake: "Air and Brake System",
        transmission: "Transmission/Clutch",
        heating: "Heating/Cooling",
        ignition: "Ignition/Electrical System",
        steering: "Steering/Suspension",
        other: "Other"
      };
      return serviceMap[serviceId] || serviceId;
    }).join(", ");

    // Format the date
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Save to Firebase
    const serviceRequestRef = ref(db, "serviceRequests");
    const newRequest = {
      ...data,
      services: servicesString,
      date: formattedDate,
      status: "pending",
      createdAt: serverTimestamp(),
    };
    
    await push(serviceRequestRef, newRequest);

    // Create a custom message for the service request
    const serviceMessage = `
Service Request Details:
- Name: ${data.firstName} ${data.lastName}
- ZIP Code: ${data.zipCode}
- Preferred Date: ${formattedDate}
- Services Requested: ${servicesString}
- Additional Notes: ${data.notes || "None"}
    `;

    // Send email using the existing contact email type
    await sendEmail({
      type: "contact",
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      message: serviceMessage
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service schedule error:", error);
    return NextResponse.json(
      { error: "Failed to submit service request" },
      { status: 500 }
    );
  }
}
