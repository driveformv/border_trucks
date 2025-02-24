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

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [maxAttendees, setMaxAttendees] = useState<string>("");

  useEffect(() => {
    loadEvents();
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

  const updateEventCapacity = async (eventId: string) => {
    try {
      const max = parseInt(maxAttendees);
      if (isNaN(max) || max < 1) {
        throw new Error("Please enter a valid number");
      }

      await update(ref(db, `events/${eventId}`), {
        maxAttendees: max,
      });

      // Update local state
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, maxAttendees: max }
          : event
      ));

      setMaxAttendees("");
    } catch (error) {
      console.error("Error updating capacity:", error);
      alert(error instanceof Error ? error.message : "Failed to update capacity");
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
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {selectedEvent ? (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time</p>
                    <p>{selectedEvent.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p>{selectedEvent.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Vendor</p>
                    <p>{selectedEvent.vendor}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      min="1"
                      value={maxAttendees}
                      onChange={(e) => setMaxAttendees(e.target.value)}
                      placeholder={selectedEvent.maxAttendees?.toString() || "No limit"}
                    />
                  </div>
                  <Button onClick={() => updateEventCapacity(selectedEvent.id)}>
                    Update Capacity
                  </Button>
                </div>
              </div>

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
