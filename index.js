import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Profile from './models/Profile.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: "Me-API Playground is running!" });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API Routes

// GET /api/profile - Get profile
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/profile - Create profile
app.post('/api/profile', async (req, res) => {
  try {
    // Check if a profile already exists
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists. Use PUT to update.' });
    }
    
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: 'Error creating profile', error: error.message });
  }
});

// PUT /api/profile - Update profile
app.put('/api/profile', async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
});

// GET /api/projects - Get projects with optional skill filter
app.get('/api/projects', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const { skill } = req.query;
    let projects = profile.projects;
    
    if (skill) {
      // Filter projects that include the skill in title or description (case-insensitive)
      const skillRegex = new RegExp(skill, 'i');
      projects = projects.filter(project => 
        skillRegex.test(project.title) || 
        skillRegex.test(project.description) ||
        profile.skills.some(profileSkill => skillRegex.test(profileSkill))
      );
    }
    
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/search - General search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
    }
    
    const searchRegex = new RegExp(q, 'i');
    
    // Search in name
    const nameMatch = searchRegex.test(profile.name);
    
    // Search in skills
    const matchedSkills = profile.skills.filter(skill => searchRegex.test(skill));
    
    // Search in projects (title and description)
    const matchedProjects = profile.projects.filter(project => 
      searchRegex.test(project.title) || searchRegex.test(project.description)
    );
    
    res.json({
      query: q,
      nameMatch,
      matchedSkills,
      matchedProjects
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
