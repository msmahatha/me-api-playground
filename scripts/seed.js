import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from '../models/Profile.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

// Sample profile data
const sampleProfile = {
  name: "Madhusudan Mahatha",
  email: "madhusudanmahatha14@gmail.com",
  education: [
    {
      institution: "Brainware University",
      degree: "Bachelor of Technology - Computer Science and Engineering (AI & ML)",
      year: "2022 - 2026 (Expected)"
    }
  ],
  skills: [
    // Programming Languages
    "JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS",
    
    // Frontend Technologies
    "React.js", "Next.js", "Vite", "Tailwind CSS", "WebSockets",
    
    // Backend Technologies
    "Node.js", "Express.js", "Spring Boot", "Flask", "Maven",
    
    // Databases & Storage
    "MongoDB", "Mongoose", "Firebase", "Firebase Storage", "Firebase Auth", "SQLite", "Supabase",
    
    // AI/ML & Data Science
    "TensorFlow", "LSTM", "scikit-learn", "Pandas", "NumPy", "OpenCV", "Dlib", "Stable Diffusion", "Llama", "Mistral", "Google Gemini API",
    
    // DevOps & Deployment
    "Docker", "Netlify", "Vercel", "Streamlit", "Jupyter Notebook",
    
    // APIs & Authentication
    "OAuth2", "Spotify API", "YouTube API", "OpenWeather API", "Swagger",
    
    // Specialized Technologies
    "Manim", "2D Animation", "Computer Vision", "Facial Recognition", "Real-time Collaboration", "WebRTC"
  ],
  projects: [
    {
      title: "Agrokart",
      description: "A dynamic website for agricultural solutions and goods. Features a marketplace for farmers to buy and sell products. Provides resources and solutions for common agricultural challenges. Technologies: Next.js, TypeScript, Tailwind CSS, Firebase",
      links: ["https://agrokart.netlify.app/"]
    },
    {
      title: "Cursor for 2D Animation",
      description: "Engineered full-stack application converting natural language prompts into animated videos using AI-powered code generation. Integrated Google Gemini API for intelligent Python/Manim code generation from user input. Optimized rendering pipeline for faster video creation. Technologies: Python, Manim, React.js, Node.js, Express.js, Google Gemini API",
      links: ["https://github.com/msmahatha/Cursor-for-2d-animation", "https://2danimator.netlify.app/"]
    },
    {
      title: "YouTube → Spotify Playlist Converter",
      description: "Built a REST API to convert YouTube playlists into Spotify playlists with OAuth2 authentication, async processing, and Swagger docs; deployed using Maven and Docker support. Technologies: Java, Spring Boot, Spotify API, YouTube API",
      links: ["https://github.com/msmahatha/youtubePlaylistToSportifyPlaylist"]
    },
    {
      title: "Website Cloner",
      description: "Leverages AI for a self-healing backend. Provides real-time analysis of any website's HTML, CSS, and JavaScript. Smart fetching strategies bypass common hurdles like CORS. A next-generation tool for developers, designers, and SEO analysts. Technologies: Next.js, AI/ML, HTML, CSS, JavaScript",
      links: ["https://github.com/msmahatha/Website-Creator", "https://websitecreator007.netlify.app/"]
    },
    {
      title: "Love Calculator",
      description: "Calculates love compatibility based on WhatsApp chat analysis. Analyzes message frequency, time patterns, emoji use, and conversational dynamics. Inspired by a viral reel to create a romantic and intelligent web app. Technologies: JavaScript, HTML, CSS, Netlify",
      links: ["https://love-calculator007.netlify.app/"]
    },
    {
      title: "Whiteboard",
      description: "A feature-rich, collaborative whiteboard application similar to Excalidraw. Built with React, TypeScript, and modern web technologies. Features real-time collaboration with enhanced functionality. Technologies: React, TypeScript, Next.js, WebSockets, Tailwind CSS",
      links: ["https://github.com/msmahatha/Whiteboard", "https://whiteboardmsm.netlify.app/"]
    }
  ],
  work: [
    {
      company: "Zoca AI",
      role: "AI Automation Intern (Remote)",
      duration: "March 2025 - July 2025"
    }
  ],
  links: {
    github: "https://github.com/madhusudan",
    linkedin: "https://linkedin.com/in/madhusudan-mahatha",
    portfolio: "https://madhusudanmahatha14@gmail.com"
  }
};

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Delete all existing profiles
    await Profile.deleteMany({});
    console.log('Existing profiles deleted');
    
    // Create new profile
    const newProfile = new Profile(sampleProfile);
    await newProfile.save();
    
    console.log('Sample profile created successfully');
    console.log('Database seeding completed!');
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding script
seedDatabase();
