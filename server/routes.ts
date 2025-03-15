import express from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDisasterSchema, 
  insertNewsSchema, 
  insertVolunteerSchema, 
  insertHelpRequestSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Get all disasters for the map
  apiRouter.get("/disasters", async (req, res) => {
    try {
      const disasters = await storage.getDisasters();
      res.json(disasters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch disasters" });
    }
  });
  
  // Get a specific disaster
  apiRouter.get("/disasters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const disaster = await storage.getDisaster(id);
      
      if (!disaster) {
        return res.status(404).json({ message: "Disaster not found" });
      }
      
      res.json(disaster);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch disaster" });
    }
  });
  
  // Create a new disaster
  apiRouter.post("/disasters", async (req, res) => {
    try {
      const disasterData = insertDisasterSchema.parse(req.body);
      const disaster = await storage.createDisaster(disasterData);
      res.status(201).json(disaster);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create disaster" });
    }
  });
  
  // Get all news items
  apiRouter.get("/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });
  
  // Get a specific news item
  apiRouter.get("/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsItem = await storage.getNewsItem(id);
      
      if (!newsItem) {
        return res.status(404).json({ message: "News item not found" });
      }
      
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news item" });
    }
  });
  
  // Create a new news item
  apiRouter.post("/news", async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNewsItem(newsData);
      res.status(201).json(newsItem);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create news item" });
    }
  });
  
  // Register a volunteer
  apiRouter.post("/volunteers", async (req, res) => {
    try {
      const volunteerData = insertVolunteerSchema.parse(req.body);
      const volunteer = await storage.createVolunteer(volunteerData);
      res.status(201).json(volunteer);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to register volunteer" });
    }
  });
  
  // Submit a help request
  apiRouter.post("/help-requests", async (req, res) => {
    try {
      const helpRequestData = insertHelpRequestSchema.parse(req.body);
      const helpRequest = await storage.createHelpRequest(helpRequestData);
      res.status(201).json(helpRequest);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to submit help request" });
    }
  });
  
  // Update help request status
  apiRouter.patch("/help-requests/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["pending", "assigned", "resolved"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      
      const updatedRequest = await storage.updateHelpRequestStatus(id, status);
      
      if (!updatedRequest) {
        return res.status(404).json({ message: "Help request not found" });
      }
      
      res.json(updatedRequest);
    } catch (error) {
      res.status(500).json({ message: "Failed to update help request status" });
    }
  });

  // Register all API routes under /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
