"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EventRegistrationsTable from "@/components/admin/EventRegistrationsTable";
import { ref, get, update } from "firebase/database";
import { db } from "@/lib/firebase";
import EditEventForm from "@/components/events/EditEventForm";

interface CustomEventDetail {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  description: string;
  vendor: string;
  maxAttendees: number | null | undefined;
  imageUrl: string;
  currentAttendees: number;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();

    const handleEventUpdated = (event: CustomEvent<CustomEventDetail>) => {
      const updatedEvent = event.detail;
      setEvents(prevEvents => {
        return prevEvents.map(e => {
          if (e.id === updatedEvent.id) {
            return { ...e, ...updatedEvent };
          } else {
            return e;
          }
        }) as Event[];
      });
      setSelectedEvent(prevSelectedEvent => {
        if (prevSelectedEvent && prevSelectedEvent.id === updatedEvent.id) {
          return { ...prevSelectedEvent, ...updatedEvent } as Event;
        }
        return prevSelectedEvent;
      });
    };

    window.addEventListener('event-updated', handleEventUpdated as EventListener);

    return () => {
      window.removeEventListener('event-updated', handleEventUpdated as EventListener);
    };
  }, []);

  const loadEvents = async () => {
    try {
      const eventsRef = ref(db, "events");
      const snapshot = await get(eventsRef);
      const data = snapshot.val();
      
      if (data) {
        const eventsList = Object.entries(data).map(([id, event]: [string, any]) => ({
          id,
          ...event,
        }));
        setEvents(eventsList);
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Link href="/admin/events/create">
          <Button>
            Create Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Events</h2>
            <div className="space-y-2">
              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full text-left p-2 rounded ${
                    selectedEvent?.id === event.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(event.dateTime).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {selectedEvent ? (
            <div className="space-y-6">
              <EditEventForm event={selectedEvent} />
              <EventRegistrationsTable event={selectedEvent} />
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed text-center">
              <p className="text-gray-500">Select an event to view details and registrations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
