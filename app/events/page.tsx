import { Metadata } from "next";
import EventList from "@/components/events/EventList";

export const metadata: Metadata = {
  title: "Training & Events | Border Trucks",
  description: "Join our vendor-hosted training sessions and events to learn about the latest products and technologies in the trucking industry.",
};

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Training & Events</h1>
        <p className="text-gray-600 mb-8">
          Join our vendor-hosted training sessions to enhance your knowledge and skills
        </p>
        <EventList />
      </div>
    </main>
  );
}
