import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ApiNews } from "@/lib/types";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const RollingNewsSection = () => {
  const { data: newsItems, isLoading } = useQuery<ApiNews[]>({
    queryKey: ["/api/news"],
  });

  // Double the news items array for continuous scrolling
  const duplicatedNews = newsItems ? [...newsItems, ...newsItems] : [];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Latest Updates
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Breaking news and critical information about ongoing disasters
        </motion.p>
        
        <Card className="bg-white rounded-xl shadow-lg overflow-hidden h-80 relative">
          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white to-transparent h-12"></div>
          
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-white to-transparent h-12"></div>
          
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div 
              className="py-4 px-6 overflow-hidden h-full"
              style={{ 
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            >
              <motion.div
                className="news-scroll py-4"
                animate={{
                  y: [0, -50 * (newsItems?.length || 1) + "%"],
                }}
                transition={{
                  duration: 30 * (newsItems?.length || 1),
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{ willChange: "transform" }}
              >
                {duplicatedNews.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`} 
                    className={`news-item mb-6 border-l-4 pl-4 py-2`}
                    style={{ borderLeftColor: getBorderColor(item.category) }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-lg">{item.title}</span>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{item.content}</p>
                    <a href="#" className="text-blue-600 hover:underline font-medium inline-flex items-center">
                      Read more <ChevronRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

// Helper function to determine border color based on category
const getBorderColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'wildfire':
      return '#dc2626'; // red
    case 'hurricane':
      return '#dc2626'; // red  
    case 'earthquake':
      return '#f59e0b'; // amber
    case 'flood':
      return '#f59e0b'; // amber
    default:
      return '#6b7280'; // gray
  }
};

export default RollingNewsSection;
