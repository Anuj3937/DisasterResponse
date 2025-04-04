import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const helpRequestFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(5, "Please provide a detailed location"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  emergencyType: z.string({
    required_error: "Please select the type of emergency",
  }),
  details: z.string().min(10, "Please provide more details about your situation"),
  people: z.number().min(1, "Number of people must be at least 1"),
});

type HelpRequestFormValues = z.infer<typeof helpRequestFormSchema>;

interface HelpRequestFormProps {
  onClose: () => void;
}

const emergencyTypes = [
  "Medical Emergency",
  "Trapped/Stranded",
  "Fire",
  "Flood",
  "Building Collapse",
  "Food/Water Shortage",
  "Missing Person",
  "Other"
];

export function HelpRequestForm({ onClose }: HelpRequestFormProps) {
  const { toast } = useToast();
  
  const form = useForm<HelpRequestFormValues>({
    resolver: zodResolver(helpRequestFormSchema),
    defaultValues: {
      name: "",
      location: "",
      phone: "",
      emergencyType: "",
      details: "",
      people: 1,
    },
  });

  function onSubmit(data: HelpRequestFormValues) {
    // Here you would typically submit to an API endpoint
    console.log("Help request submitted:", data);
    
    toast({
      title: "Emergency Help Request Submitted",
      description: "Your request has been received with HIGH priority. Help is on the way.",
      variant: "destructive",
    });
    
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter precise location" {...field} />
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="emergencyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of emergency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {emergencyTypes.map(type => (
                    <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of People Needing Help: {field.value}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  max={20}
                  min={1}
                  step={1}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details of Emergency</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your emergency situation in detail" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="destructive">Submit Emergency Request</Button>
        </div>
      </form>
    </Form>
  );
}