"use client";

import CreateEventForm from "@/components/events/CreateEventForm";

export default function CreateEventPage() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
        <CreateEventForm />
      </div>
    </div>
  );
}
