import { Metadata } from "next";
import RegistrationForm from "@/components/events/RegistrationForm";
import { Event } from "@/types/event";

// TODO: Replace with actual data fetching
const getEvent = async (id: string): Promise<Event> => {
  // Mock data for now
  return {
    id,
    title: "HVAC System Maintenance Training",
    date: "2024-03-15",
    time: "9:00 AM",
    location: "El Paso Dealership",
    description: "Comprehensive training on maintaining and troubleshooting HVAC systems in commercial trucks.",
    vendor: "ThermoKing",
    imageUrl: "/assets/events/hvac-training.jpg",
    maxAttendees: 30,
    currentAttendees: 12,
  };
};

export const metadata: Metadata = {
  title: "Event Registration | Border Trucks",
  description: "Register for our training events and workshops",
};

interface Props {
  params: {
    id: string;
  };
}

export default async function EventRegistrationPage({ params }: Props) {
  const event = await getEvent(params.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Register for Event</h1>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <div className="text-gray-600">
              <p>Date: {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Hosted by: {event.vendor}</p>
            </div>
          </div>
        </div>
        
        <RegistrationForm event={event} />
      </div>
    </main>
  );
}
