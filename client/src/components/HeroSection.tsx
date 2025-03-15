import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, HandHelping, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { toast } = useToast();
  const [currentAlert] = useState({
    message: "ALERT: Flash flood warnings active in eastern regions. Please avoid coastal areas."
  });

  const handleVolunteerRequest = () => {
    toast({
      title: "Volunteer Registration",
      description: "Thank you for your interest! A registration form will be sent to your email.",
    });
  };

  const handleHelpRequest = () => {
    toast({
      title: "Help Request Submitted",
      description: "Your help request has been received. Help is on the way!",
      variant: "destructive",
    });
  };

  // Wave animation variants
  const waveVariants = {
    animate: {
      scaleY: [0.2, 1.5, 0.2],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gray-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-20 bg-primary origin-bottom"
          variants={waveVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-yellow-500 origin-bottom"
          variants={waveVariants}
          animate="animate"
          style={{ animationDelay: "0.5s" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-12 bg-blue-600 origin-bottom"
          variants={waveVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
      </div>
      
      {/* Foreground content */}
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="mb-4 inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
              EMERGENCY RESPONSE
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Immediate Disaster Response & Management System
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Coordinating relief efforts and providing critical information during emergencies
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="px-8 py-7 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white shadow-lg transition-colors"
                  onClick={handleVolunteerRequest}
                >
                  <HandHelping className="mr-2 h-5 w-5" /> Join as Volunteer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Volunteer Registration</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <p>Thank you for your interest in volunteering. Our team will contact you shortly with more information.</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="destructive"
                  className="px-8 py-7 rounded-lg font-semibold shadow-lg"
                  onClick={handleHelpRequest}
                >
                  <AlertCircle className="mr-2 h-5 w-5" /> Ask for Help
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Emergency Help</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <p>Your emergency request has been submitted. Help is on the way.</p>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
      
      {/* Alert banner */}
      <div className="bg-yellow-500 py-3 px-4 text-center relative z-10">
        <p className="font-semibold flex items-center justify-center">
          <Bell className="mr-2 h-5 w-5 animate-pulse" />
          <span>{currentAlert.message}</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
