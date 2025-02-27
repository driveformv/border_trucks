"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceTypes = [
  { id: "warranty", label: "Warranty Work" },
  { id: "mobile", label: "24/7 Mobile Maintenance" },
  { id: "oil_change", label: "Oil Change/Preventive Maintenance" },
  { id: "engine", label: "Engine Repair/Replacement" },
  { id: "exhaust", label: "Exhaust/Emissions/DPF Filter" },
  { id: "air_brake", label: "Air and Brake System" },
  { id: "transmission", label: "Transmission/Clutch" },
  { id: "heating", label: "Heating/Cooling" },
  { id: "ignition", label: "Ignition/Electrical System" },
  { id: "steering", label: "Steering/Suspension" },
  { id: "other", label: "Other" },
];

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  zipCode: z.string().min(5, {
    message: "Please enter a valid ZIP code.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  services: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one service.",
  }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ServiceScheduleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
      services: [],
      notes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/service-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit service request");
      }

      toast.success("Your service request has been submitted successfully!");
      form.reset();
      router.push("/thank-you");
    } catch (error) {
      toast.error("Failed to submit service request. Please try again.");
      console.error("Service schedule error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">First Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John" 
                    {...field} 
                    className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                  />
                </FormControl>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Last Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Doe" 
                    {...field} 
                    className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                  />
                </FormControl>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    {...field} 
                    className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                  />
                </FormControl>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Phone</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    {...field} 
                    className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                  />
                </FormControl>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">ZIP Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="12345" 
                    {...field} 
                    className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                  />
                </FormControl>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Preferred Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "h-12 w-full pl-3 text-left font-normal bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Service(s) Required</FormLabel>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceTypes.map((service) => (
                  <FormField
                    key={service.id}
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={service.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, service.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== service.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-[#1C1C1C] dark:text-white font-normal cursor-pointer">
                            {service.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage className="text-[#FF2A00] mt-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide any additional details about your service needs" 
                  className="min-h-[120px] bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-[#FF2A00]" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 bg-white border-2 border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white font-medium rounded-lg transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
