"use client";

import { useState } from "react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  attendeeName: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  numberOfAttendees: z.number().min(1, "Must have at least 1 attendee").max(10, "Maximum 10 attendees per registration"),
  specialRequirements: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  event: Event;
}

export default function RegistrationForm({ event }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/event-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          eventId: event.id,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit registration");
      }

      toast.success("Registration submitted successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to submit registration. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="attendeeName">Full Name</Label>
          <Input
            id="attendeeName"
            {...register("attendeeName")}
            className={errors.attendeeName ? "border-red-500" : ""}
          />
          {errors.attendeeName && (
            <p className="text-red-500 text-sm mt-1">{errors.attendeeName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            {...register("companyName")}
            className={errors.companyName ? "border-red-500" : ""}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            {...register("jobTitle")}
            className={errors.jobTitle ? "border-red-500" : ""}
          />
          {errors.jobTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="numberOfAttendees">Number of Attendees</Label>
          <Input
            id="numberOfAttendees"
            type="number"
            min="1"
            max="10"
            {...register("numberOfAttendees", { valueAsNumber: true })}
            className={errors.numberOfAttendees ? "border-red-500" : ""}
          />
          {errors.numberOfAttendees && (
            <p className="text-red-500 text-sm mt-1">{errors.numberOfAttendees.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea
            id="specialRequirements"
            {...register("specialRequirements")}
            placeholder="Any dietary requirements or special accommodations needed?"
            className={errors.specialRequirements ? "border-red-500" : ""}
          />
          {errors.specialRequirements && (
            <p className="text-red-500 text-sm mt-1">{errors.specialRequirements.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Registration"}
      </Button>
    </form>
  );
}
