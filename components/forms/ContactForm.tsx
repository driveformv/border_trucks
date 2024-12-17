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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {vehicleInfo && (
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">Vehicle Information</h3>
            <p className="text-slate-700 dark:text-slate-300">
              {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
            </p>
            <p className="text-slate-600 dark:text-slate-400">
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
                <FormLabel className="text-slate-900 dark:text-slate-100">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100" 
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
                <FormLabel className="text-slate-900 dark:text-slate-100">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    {...field} 
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100" 
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
                <FormLabel className="text-slate-900 dark:text-slate-100">Phone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(555) 123-4567" 
                    {...field} 
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100" 
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
                <FormLabel className="text-slate-900 dark:text-slate-100">Company (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your company name" 
                    {...field} 
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100" 
                  />
                </FormControl>
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
              <FormLabel className="text-slate-900 dark:text-slate-100">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your needs..."
                  className="min-h-[100px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit Message"}
        </Button>
      </form>
    </Form>
  );
}
