"use client";

import { useState } from "react";
import { Event, EventRegistration } from "@/types/event";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";

interface EventRegistrationsTableProps {
  event: Event;
}

export default function EventRegistrationsTable({ event }: EventRegistrationsTableProps) {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRegistrations = async () => {
    setLoading(true);
    try {
      const registrationsRef = ref(db, "eventRegistrations");
      const snapshot = await get(registrationsRef);
      const data = snapshot.val();
      
      // Filter registrations for this event and convert to array
      const eventRegistrations = data ? 
        Object.values(data).filter((reg: any) => reg.eventId === event.id) :
        [];
      
      setRegistrations(eventRegistrations as EventRegistration[]);
    } catch (error) {
      console.error("Error loading registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Attendee Name",
      "Company Name",
      "Email",
      "Phone",
      "Job Title",
      "Number of Attendees",
      "Special Requirements",
      "Registration Date"
    ].join(",");

    const rows = registrations.map(reg => [
      reg.attendeeName,
      reg.companyName,
      reg.email,
      reg.phone,
      reg.jobTitle,
      reg.numberOfAttendees,
      reg.specialRequirements || "",
      new Date(reg.createdAt).toLocaleDateString()
    ].map(field => `"${field}"`).join(","));

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title}-registrations.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Registrations</h2>
        <div className="space-x-2">
          <Button onClick={loadRegistrations} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
          <Button onClick={exportToCSV} disabled={registrations.length === 0}>
            Export to CSV
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Attendee Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead className="text-right"># Attendees</TableHead>
              <TableHead>Special Requirements</TableHead>
              <TableHead>Registration Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow key={reg.id}>
                <TableCell>{reg.attendeeName}</TableCell>
                <TableCell>{reg.companyName}</TableCell>
                <TableCell>{reg.email}</TableCell>
                <TableCell>{reg.phone}</TableCell>
                <TableCell>{reg.jobTitle}</TableCell>
                <TableCell className="text-right">{reg.numberOfAttendees}</TableCell>
                <TableCell>{reg.specialRequirements || "-"}</TableCell>
                <TableCell>{new Date(reg.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {registrations.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No registrations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Event Capacity</h3>
        <p>
          Total Registered: {registrations.reduce((sum, reg) => sum + reg.numberOfAttendees, 0)}
          {event.maxAttendees && ` / ${event.maxAttendees}`}
        </p>
      </div>
    </div>
  );
}
