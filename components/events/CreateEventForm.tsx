"use client";

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EventImageUploader from "./EventImageUploader";
import { ref, push, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";

const TIMEZONE = "America/Denver";

export default function CreateEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    location: "",
    description: "",
    vendor: "",
    maxAttendees: "",
  });

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

      const eventsRef = ref(db, "events");
      const newEventRef = push(eventsRef);

      await set(newEventRef, {
        ...formData,
        dateTime: mountainTime,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
        imageUrl,
        currentAttendees: 0,
      });

      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
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
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating Event..." : "Create Event"}
      </Button>
    </form>
  );
}
