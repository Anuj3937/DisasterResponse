import { 
  users, type User, type InsertUser,
  disasters, type Disaster, type InsertDisaster,
  news, type News, type InsertNews,
  volunteers, type Volunteer, type InsertVolunteer,
  helpRequests, type HelpRequest, type InsertHelpRequest
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Disaster methods
  getDisasters(): Promise<Disaster[]>;
  getDisaster(id: number): Promise<Disaster | undefined>;
  createDisaster(disaster: InsertDisaster): Promise<Disaster>;
  
  // News methods
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNewsItem(newsItem: InsertNews): Promise<News>;
  
  // Volunteer methods
  getVolunteers(): Promise<Volunteer[]>;
  getVolunteer(id: number): Promise<Volunteer | undefined>;
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  
  // Help request methods
  getHelpRequests(): Promise<HelpRequest[]>;
  getHelpRequest(id: number): Promise<HelpRequest | undefined>;
  createHelpRequest(helpRequest: InsertHelpRequest): Promise<HelpRequest>;
  updateHelpRequestStatus(id: number, status: string): Promise<HelpRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private disasters: Map<number, Disaster>;
  private newsItems: Map<number, News>;
  private volunteers: Map<number, Volunteer>;
  private helpRequests: Map<number, HelpRequest>;
  
  private userId: number = 1;
  private disasterId: number = 1;
  private newsId: number = 1;
  private volunteerId: number = 1;
  private helpRequestId: number = 1;

  constructor() {
    this.users = new Map();
    this.disasters = new Map();
    this.newsItems = new Map();
    this.volunteers = new Map();
    this.helpRequests = new Map();
    
    // Add initial sample data
    this.initSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Disaster methods
  async getDisasters(): Promise<Disaster[]> {
    return Array.from(this.disasters.values());
  }
  
  async getDisaster(id: number): Promise<Disaster | undefined> {
    return this.disasters.get(id);
  }
  
  async createDisaster(insertDisaster: InsertDisaster): Promise<Disaster> {
    const id = this.disasterId++;
    const disaster: Disaster = { ...insertDisaster, id };
    this.disasters.set(id, disaster);
    return disaster;
  }
  
  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.newsItems.values());
  }
  
  async getNewsItem(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }
  
  async createNewsItem(insertNews: InsertNews): Promise<News> {
    const id = this.newsId++;
    const timestamp = new Date();
    const news: News = { ...insertNews, id, timestamp };
    this.newsItems.set(id, news);
    return news;
  }
  
  // Volunteer methods
  async getVolunteers(): Promise<Volunteer[]> {
    return Array.from(this.volunteers.values());
  }
  
  async getVolunteer(id: number): Promise<Volunteer | undefined> {
    return this.volunteers.get(id);
  }
  
  async createVolunteer(insertVolunteer: InsertVolunteer): Promise<Volunteer> {
    const id = this.volunteerId++;
    const volunteer: Volunteer = { ...insertVolunteer, id };
    this.volunteers.set(id, volunteer);
    return volunteer;
  }
  
  // Help request methods
  async getHelpRequests(): Promise<HelpRequest[]> {
    return Array.from(this.helpRequests.values());
  }
  
  async getHelpRequest(id: number): Promise<HelpRequest | undefined> {
    return this.helpRequests.get(id);
  }
  
  async createHelpRequest(insertHelpRequest: InsertHelpRequest): Promise<HelpRequest> {
    const id = this.helpRequestId++;
    const timestamp = new Date();
    const status = "pending";
    const helpRequest: HelpRequest = { ...insertHelpRequest, id, status, timestamp };
    this.helpRequests.set(id, helpRequest);
    return helpRequest;
  }
  
  async updateHelpRequestStatus(id: number, status: string): Promise<HelpRequest | undefined> {
    const helpRequest = await this.getHelpRequest(id);
    if (!helpRequest) return undefined;
    
    const updatedRequest: HelpRequest = { ...helpRequest, status };
    this.helpRequests.set(id, updatedRequest);
    return updatedRequest;
  }
  
  // Initialize with sample data
  private initSampleData() {
    // Sample disasters
    const sampleDisasters: InsertDisaster[] = [
      { lat: "34.05" as any, lng: "-118.24" as any, type: 'Wildfire', severity: 'high', details: 'Wildfire in Los Angeles County' },
      { lat: "29.76" as any, lng: "-95.36" as any, type: 'Flood', severity: 'critical', details: 'Flooding in Houston metropolitan area' },
      { lat: "40.71" as any, lng: "-74.00" as any, type: 'Storm', severity: 'medium', details: 'Severe thunderstorm warning' },
      { lat: "33.44" as any, lng: "-112.07" as any, type: 'Heat Wave', severity: 'high', details: 'Extreme heat advisory' },
      { lat: "47.60" as any, lng: "-122.33" as any, type: 'Earthquake', severity: 'low', details: 'Minor seismic activity detected' },
      { lat: "25.76" as any, lng: "-80.19" as any, type: 'Hurricane', severity: 'critical', details: 'Hurricane warning issued for Miami' },
      { lat: "41.85" as any, lng: "-87.65" as any, type: 'Tornado', severity: 'medium', details: 'Tornado watch in effect' },
      { lat: "39.95" as any, lng: "-75.16" as any, type: 'Power Outage', severity: 'low', details: 'Localized power disruptions' }
    ];
    
    // Sample news
    const sampleNews: InsertNews[] = [
      {
        title: 'Wildfire Update: Northern Region',
        content: 'Containment has reached 45% as additional fire crews arrive from neighboring states. Evacuation orders remain in effect for Riverdale County.',
        category: 'Wildfire'
      },
      {
        title: 'Hurricane Warning: Coastal Areas',
        content: 'Category 3 hurricane expected to make landfall Friday evening. Mandatory evacuations issued for zones A through C.',
        category: 'Hurricane'
      },
      {
        title: 'Earthquake Relief: Southern Province',
        content: 'Relief supplies being airlifted to remote villages. Medical teams have established field hospitals in the most affected areas.',
        category: 'Earthquake'
      },
      {
        title: 'Flood Recovery: Eastern Districts',
        content: 'Water levels beginning to recede in most areas. Clean-up crews deployed to assist with removal of debris and restoration of essential services.',
        category: 'Flood'
      }
    ];
    
    // Add sample data to storage
    sampleDisasters.forEach(disaster => this.createDisaster(disaster));
    sampleNews.forEach(item => this.createNewsItem(item));
  }
}

export const storage = new MemStorage();
