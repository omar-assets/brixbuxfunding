import { users, leadSubmissions, type User, type InsertUser, type LeadSubmission, type InsertLeadSubmission } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLeadSubmission(leadSubmission: InsertLeadSubmission): Promise<LeadSubmission>;
  getLeadSubmissions(): Promise<LeadSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leadSubmissions: Map<number, LeadSubmission>;
  private currentUserId: number;
  private currentLeadId: number;

  constructor() {
    this.users = new Map();
    this.leadSubmissions = new Map();
    this.currentUserId = 1;
    this.currentLeadId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLeadSubmission(insertLeadSubmission: InsertLeadSubmission): Promise<LeadSubmission> {
    const id = this.currentLeadId++;
    const leadSubmission: LeadSubmission = { 
      ...insertLeadSubmission, 
      id, 
      submittedAt: new Date() 
    };
    this.leadSubmissions.set(id, leadSubmission);
    return leadSubmission;
  }

  async getLeadSubmissions(): Promise<LeadSubmission[]> {
    return Array.from(this.leadSubmissions.values());
  }
}

export const storage = new MemStorage();
