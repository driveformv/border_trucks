import { Metadata } from "next";
import RegistrationForm from "@/components/events/RegistrationForm";
import { Event } from "@/types/event";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";

const getEvent = async (id: string): Promise<Event | null> => {
  try {
    const eventRef = ref(db, `events/${id}`);
    const snapshot = await get(eventRef);
    const data = snapshot.val();

    if (data) {
      return {
        id,
        ...data,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
};

interface Props {
  params: {
    id: string;
  };
}

export default async function EventRegistrationPage({ params }: Props) {
  const event = await getEvent(params.id);

  if (!event) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-500">Event not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Register for Event</h1>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <div className="text-gray-600">
              <p>Date: {new Date(event.dateTime).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
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
