// Disaster interfaces
export interface ApiDisaster {
  id: number;
  lat: number;
  lng: number;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  details: string;
}

// News interfaces
export interface ApiNews {
  id: number;
  title: string;
  content: string;
  category: string;
  timestamp: string;
}

// Form interfaces
export interface VolunteerForm {
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
}

export interface HelpRequestForm {
  name: string;
  location: string;
  phone: string;
  emergencyType: string;
  details: string;
  people: number;
}
