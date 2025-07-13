import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertLeadSubmissionSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const leadData = insertLeadSubmissionSchema.parse(req.body);
      const leadSubmission = await storage.createLeadSubmission(leadData);
      res.status(201).json({ 
        success: true, 
        message: "Lead submission received successfully", 
        id: leadSubmission.id 
      });
    } catch (error) {
      console.error("Error creating lead submission:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const leads = await storage.getLeadSubmissions();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 