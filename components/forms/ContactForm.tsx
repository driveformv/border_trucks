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
import { toast } from "sonner";

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
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

interface ContactFormProps {
  vehicleInfo?: {
    id: string;
    year: number;
    make: string;
    model: string;
    stockNumber: string;
  };
}

export function ContactForm({ vehicleInfo }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: vehicleInfo
        ? `I am interested in the ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model} (Stock #${vehicleInfo.stockNumber}). Please provide more information.`
        : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual form submission
      console.log(values);
      
      toast.success("Message Sent", {
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      toast.error("Error", {
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-[#1C1C1C] p-6 rounded-lg">
        {vehicleInfo && (
          <div className="bg-[#1C1C1C]/5 dark:bg-white/5 p-4 rounded-md border border-[#1C1C1C]/10 dark:border-white/10">
            <h3 className="font-semibold text-lg mb-2 text-[#1C1C1C] dark:text-white">Vehicle Information</h3>
            <p className="text-[#1C1C1C]/80 dark:text-white/80">
              {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
            </p>
            <p className="text-[#1C1C1C]/60 dark:text-white/60">
              Stock #{vehicleInfo.stockNumber}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="bg-white text-black border-white/10 placeholder:text-black/60" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    {...field} 
                    className="bg-white text-black border-white/10 placeholder:text-black/60" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    {...field} 
                    className="bg-white text-black border-white/10 placeholder:text-black/60" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Company (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Company Name" 
                    {...field} 
                    className="bg-white text-black border-white/10 placeholder:text-black/60" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Type your message here." 
                  className="min-h-[120px] bg-white text-black border-white/10 placeholder:text-black/60" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-white hover:bg-white/90 text-black font-medium"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
