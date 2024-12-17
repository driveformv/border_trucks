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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  company: z.string().optional(),
  inquiryType: z.enum(["purchase", "test_drive", "trade_in", "financing", "general"]),
  timeframe: z.enum(["immediate", "this_week", "this_month", "no_rush"]),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

interface VehicleInquiryFormProps {
  vehicleInfo: {
    id: string;
    year: number;
    make: string;
    model: string;
    stockNumber: string;
  };
}

type FormData = z.infer<typeof formSchema>;

export function VehicleInquiryForm({ vehicleInfo }: VehicleInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const defaultMessage = vehicleInfo 
    ? `I am interested in the ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model} (Stock #${vehicleInfo.stockNumber}). Please provide more information.`
    : "I am interested in this vehicle. Please provide more information.";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: "general",
      timeframe: "no_rush",
      message: defaultMessage,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!vehicleInfo) {
      toast.error("Vehicle information is missing");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/vehicle-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          vehicleId: vehicleInfo.id,
          vehicleInfo: {
            id: vehicleInfo.id,
            year: vehicleInfo.year,
            make: vehicleInfo.make,
            model: vehicleInfo.model,
            stockNumber: vehicleInfo.stockNumber,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry");
      }

      toast.success("Your inquiry has been submitted successfully!");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit inquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white dark:bg-[#2C2C2C] p-6 rounded-lg shadow-sm border border-[#1C1C1C]/10 dark:border-white/10">
          <h3 className="text-xl font-bold mb-3 text-[#1C1C1C] dark:text-white">Vehicle Information</h3>
          {vehicleInfo ? (
            <div>
              <p className="text-lg font-medium text-[#1C1C1C] dark:text-white">
                {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
              </p>
              <p className="text-[#1C1C1C]/70 dark:text-white/70 mt-1">
                Stock #{vehicleInfo.stockNumber}
              </p>
            </div>
          ) : (
            <p className="text-[#1C1C1C]/70 dark:text-white/70">
              No vehicle information available
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
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
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Company (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Company Name" 
                    {...field} 
                    className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                  />
                </FormControl>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="inquiryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Inquiry Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10">
                    <SelectItem value="purchase" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">Purchase</SelectItem>
                    <SelectItem value="test_drive" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">Test Drive</SelectItem>
                    <SelectItem value="trade_in" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">Trade-In</SelectItem>
                    <SelectItem value="financing" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">Financing</SelectItem>
                    <SelectItem value="general" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Purchase Timeframe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10">
                    <SelectItem value="immediate" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">Immediate</SelectItem>
                    <SelectItem value="this_week" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">This Week</SelectItem>
                    <SelectItem value="this_month" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">This Month</SelectItem>
                    <SelectItem value="no_rush" className="text-[#1C1C1C] dark:text-white hover:bg-[#FF2A00]/10">No Rush</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#FF2A00]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1C1C1C] dark:text-white font-medium">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Type your message here" 
                  {...field} 
                  className="min-h-[120px] bg-white dark:bg-[#2C2C2C] border-2 border-[#1C1C1C]/10 dark:border-white/10 rounded-lg text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40 focus:border-[#FF2A00] focus:ring-1 focus:ring-[#FF2A00] transition-all" 
                />
              </FormControl>
              <FormMessage className="text-[#FF2A00]" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 bg-[#1C1C1C] hover:bg-[#FF2A00] text-white font-medium rounded-lg transition-colors"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
