"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EventImageUploader from "./EventImageUploader";
import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";
import { Event } from "@/types/event";

const TIMEZONE = "America/Denver";

interface EditEventFormProps {
  event: Event;
}

export default function EditEventForm({ event }: EditEventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(event.imageUrl || "");
  const [formData, setFormData] = useState({
    title: event.title,
    dateTime: event.dateTime,
    location: event.location,
    description: event.description,
    vendor: event.vendor,
    maxAttendees: event.maxAttendees?.toString() || "",
  });

  useEffect(() => {
    setFormData({
      title: event.title,
      dateTime: event.dateTime,
      location: event.location,
      description: event.description,
      vendor: event.vendor,
      maxAttendees: event.maxAttendees?.toString() || "",
    });
    setImageUrl(event.imageUrl || "");
  }, [event]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert to Mountain Time
      const mountainTime = moment.tz(formData.dateTime, TIMEZONE).toISOString();

      const eventRef = ref(db, `events/${event.id}`);

      await set(eventRef, {
        ...formData,
        dateTime: mountainTime,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
        imageUrl,
        currentAttendees: event.currentAttendees || 0,
      });

      // Manually update the event list in the admin page
      // by dispatching a custom event
      window.dispatchEvent(new CustomEvent('event-updated', { detail: {
        ...formData,
        id: event.id,
        dateTime: mountainTime,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
        imageUrl,
        currentAttendees: event.currentAttendees || 0,
      }}))

      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="dateTime">Date and Time</Label>
          <Input
            id="dateTime"
            name="dateTime"
            type="datetime-local"
            value={formData.dateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            id="vendor"
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="h-32"
          />
        </div>

        <div>
          <Label htmlFor="maxAttendees">Maximum Attendees</Label>
          <Input
            id="maxAttendees"
            name="maxAttendees"
            type="number"
            min="1"
            value={formData.maxAttendees}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label>Event Image</Label>
          <div className="mt-2">
            <EventImageUploader
              onUploadComplete={(url: string) => setImageUrl(url)}
              initialImageUrl={imageUrl}
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating Event..." : "Update Event"}
      </Button>
    </form>
  );
}
