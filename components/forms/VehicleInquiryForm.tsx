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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: "general",
      timeframe: "no_rush",
      message: `I am interested in the ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model} (Stock #${vehicleInfo.stockNumber}). Please provide more information.`,
    },
  });

  const onSubmit = async (data: FormData) => {
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

      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'event_category': 'Vehicle Inquiry',
          'event_label': `${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`,
          'value': 1
        });
      }

      // Show success message before redirect
      toast.success("Thank you! Redirecting to confirmation page...");
      
      // Short delay before redirect to show the success message
      setTimeout(() => {
        router.push('/thank-you');
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#1C1C1C]/5 dark:bg-white/5 p-4 rounded-md border border-[#1C1C1C]/10 dark:border-white/10">
          <h3 className="font-semibold text-lg mb-2 text-[#1C1C1C] dark:text-white">Vehicle Information</h3>
          <p className="text-[#1C1C1C]/80 dark:text-white/80">
            {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
          </p>
          <p className="text-[#1C1C1C]/60 dark:text-white/60">
            Stock #{vehicleInfo.stockNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="bg-white dark:bg-[#2C2C2C] border-[#1C1C1C]/10 dark:border-white/10 text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40" 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    {...field} 
                    className="bg-white dark:bg-[#2C2C2C] border-[#1C1C1C]/10 dark:border-white/10 text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40" 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white">Phone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(555) 123-4567" 
                    {...field} 
                    className="bg-white dark:bg-[#2C2C2C] border-[#1C1C1C]/10 dark:border-white/10 text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40" 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white">Company (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your company name" 
                    {...field} 
                    className="bg-white dark:bg-[#2C2C2C] border-[#1C1C1C]/10 dark:border-white/10 text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40" 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
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
                <FormLabel className="text-[#1C1C1C] dark:text-white">Inquiry Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#2C2C2C] border-white/10 text-white">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#2C2C2C] border-white/10">
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="purchase">Purchase Information</SelectItem>
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="test_drive">Schedule Test Drive</SelectItem>
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="trade_in">Trade-In Valuation</SelectItem>
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="financing">Financing Options</SelectItem>
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1C1C1C] dark:text-white">Purchase Timeframe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#2C2C2C] border-white/10 text-white">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#2C2C2C] border-white/10">
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="immediate">Ready to Purchase</SelectItem>
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="this_week">Within 1 Week</SelectItem>
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="this_month">Within 1 Month</SelectItem>
                    <SelectItem className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" value="no_rush">Still Researching</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1C1C1C] dark:text-white">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your needs..."
                  className="min-h-[100px] bg-white dark:bg-[#2C2C2C] border-[#1C1C1C]/10 dark:border-white/10 text-[#1C1C1C] dark:text-white placeholder:text-[#1C1C1C]/40 dark:placeholder:text-white/40"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-white hover:bg-white/90 text-[#1C1C1C] font-semibold" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </Button>
      </form>
    </Form>
  );
}
