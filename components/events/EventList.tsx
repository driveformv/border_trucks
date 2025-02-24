"use client";

import { Event } from "@/types/event";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsRef = ref(db, "events");
        const snapshot = await get(eventsRef);
        const data = snapshot.val();
        
        if (data) {
          const eventsList = Object.entries(data)
            .map(([id, event]: [string, any]) => ({
              id,
              ...event,
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          setEvents(eventsList);
        }
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No upcoming events at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
