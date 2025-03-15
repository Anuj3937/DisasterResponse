import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Phone, Map, Stethoscope } from "lucide-react";

const resources = [
  {
    icon: <Phone className="text-white text-xl" />,
    title: "Emergency Contacts",
    description: "Access critical emergency numbers and direct contact information for rescue services.",
    link: "#",
    linkText: "View emergency numbers",
    bgColor: "bg-primary",
  },
  {
    icon: <Map className="text-white text-xl" />,
    title: "Evacuation Routes",
    description: "Find the safest evacuation routes and nearby shelter locations for your area.",
    link: "#",
    linkText: "Find evacuation routes",
    bgColor: "bg-blue-600",
  },
  {
    icon: <Stethoscope className="text-white text-xl" />,
    title: "First Aid Guidelines",
    description: "Access quick reference first aid information for common emergency situations.",
    link: "#",
    linkText: "View first aid guides",
    bgColor: "bg-yellow-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
    },
  }),
};

const EmergencyResourcesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Emergency Resources
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <Card className="bg-gray-50 p-6 h-full">
                <div className={`w-12 h-12 ${resource.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a 
                  href={resource.link} 
                  className={`font-medium hover:underline text-${resource.bgColor === 'bg-primary' ? 'primary' : (resource.bgColor === 'bg-blue-600' ? 'blue-600' : 'yellow-500')}`}
                >
                  {resource.linkText} →
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyResourcesSection;
