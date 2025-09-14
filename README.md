# Me-API Playground

A personal API playground showcasing my profile data, skills, and projects. This full-stack application demonstrates modern web development practices with a RESTful API backend and a responsive React frontend.

## 🚀 Live Demo

- **Frontend:** [Your Live Demo](https://api-me.netlify.app/) 
- **API:** [Your API](https://me-api-playground-v3mx.onrender.com) 

## 📋 Project Overview

This project serves as a comprehensive example of a personal portfolio API, featuring:
- Complete CRUD operations for profile management
- Advanced search and filtering capabilities
- RESTful API design principles
- Modern React frontend with component-based architecture
- MongoDB Atlas database integration
- Professional project structure and documentation

## 🛠️ Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- CORS enabled
- Environment variable configuration

**Frontend:**
- React (built with Vite)
- Modern CSS with glassmorphism effects
- Responsive design
- Component-based architecture

## 📁 Project Structure
```
me-api-playground/
├── config/
│   └── db.js                 # Database connection configuration
├── models/
│   └── Profile.js            # Mongoose schema and model
├── scripts/
│   └── seed.js               # Database seeding script
├── me-api-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Profile.jsx   # Profile display component
│   │   │   └── Projects.jsx  # Projects with search functionality
│   │   └── App.jsx           # Main application component
├── index.js                  # Main Express server
├── package.json              # Backend dependencies
├── .env                      # Environment variables
└── README.md                 # Project documentation
```

## Setup Instructions (Local)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd me-api-playground
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the example environment file and update with your MongoDB connection:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your MongoDB connection string:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/me-api-playground
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:3001`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd me-api-frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

## API Endpoints

| HTTP Method | Path | Description | Sample cURL Request |
|-------------|------|-------------|---------------------|
| GET | `/` | Root endpoint - API status | `curl http://localhost:3001/` |
| GET | `/health` | Health check endpoint | `curl http://localhost:3001/health` |
| GET | `/api/profile` | Fetch the main profile | `curl http://localhost:3001/api/profile` |
| POST | `/api/profile` | Create a new profile | `curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","skills":["JavaScript"]}' http://localhost:3001/api/profile` |
| PUT | `/api/profile` | Update existing profile | `curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Name"}' http://localhost:3001/api/profile` |
| GET | `/api/projects` | Get all projects | `curl http://localhost:3001/api/projects` |
| GET | `/api/projects?skill=<skill>` | Filter projects by skill | `curl http://localhost:3001/api/projects?skill=React` |
| GET | `/api/search?q=<query>` | Search across name, skills, and projects | `curl http://localhost:3001/api/search?q=JavaScript` |

### API Response Examples

**GET /api/profile:**
```json
{
  "_id": "...",
  "name": "Madhusudan Mahatha",
  "email": "madhusudan.mahatha@example.com",
  "skills": ["JavaScript", "Node.js", "React"],
  "projects": [...],
  "education": [...],
  "work": [...],
  "links": {...},
  "createdAt": "...",
  "updatedAt": "..."
}
```

**GET /api/search?q=React:**
```json
{
  "query": "React",
  "nameMatch": false,
  "matchedSkills": ["React"],
  "matchedProjects": [
    {
      "title": "E-commerce Platform",
      "description": "A full-stack e-commerce platform built with React...",
      "links": [...]
    }
  ]
}
```

## Database Schema

**Profile Collection:**
```javascript
{
  name: String (required),
  email: String (required, unique),
  education: [{
    institution: String,
    degree: String,
    year: String
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    links: [String]
  }],
  work: [{
    company: String,
    role: String,
    duration: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  timestamps: true
}
```

## Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Populate database with sample data

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Backend Deployment Options:
- **Heroku:** Add `Procfile` with `web: node index.js`
- **Railway:** Connect GitHub repository
- **DigitalOcean App Platform:** Use Node.js buildpack
- **AWS EC2:** Deploy with PM2 process manager

### Frontend Deployment Options:
- **Vercel:** Connect GitHub repository
- **Netlify:** Drag and drop build folder
- **GitHub Pages:** Use `gh-pages` package

### Environment Variables for Production:
```env
PORT=3001
MONGODB_URI=<your-production-mongodb-uri>
NODE_ENV=production
```

### Live URLs (Placeholder):
- **API:** `https://me-api-playground.herokuapp.com`
- **Frontend:** `https://me-api-playground.vercel.app`

## Known Limitations

- **Single Profile:** The system currently supports only one profile document
- **No Authentication:** API endpoints are publicly accessible
- **No Input Validation:** Limited server-side validation for API requests
- **No Rate Limiting:** API does not implement rate limiting
- **No Pagination:** All data is returned without pagination
- **Local Storage Only:** No persistent user preferences in frontend
- **No Real-time Updates:** Changes require manual page refresh
- **Basic Error Handling:** Limited error recovery mechanisms

## Future Enhancements

- User authentication and authorization
- Multiple profile support
- Image upload functionality
- Real-time updates with WebSocket
- Advanced search with full-text indexing
- API rate limiting and caching
- Unit and integration testing
- Docker containerization
- CI/CD pipeline setup

## Development Guidelines

### Code Style:
- Use ES6+ features and modules
- Follow RESTful API conventions
- Implement proper error handling
- Use meaningful variable and function names
- Add comments for complex logic

### Best Practices:
- Validate input data on both client and server
- Use environment variables for configuration
- Implement proper CORS policies
- Follow MongoDB best practices
- Use semantic HTML in React components

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## Resume Link

📄 **[View My Complete Portfolio](https://madhusudanmahatha1.netlify.app/)** 

## 📞 Contact

- **GitHub:** [github.com/msmahatha](https://github.com/msmahatha)
- **Email:** madhusudanmahatha14@gmail.com
- **LinkedIn:** [linkedin.com/in/msmahatha](https://linkedin.com/in/msmahatha)
- **Portfolio:** [madhusudanmahatha1.netlify.app](https://madhusudanmahatha1.netlify.app/)

---

**License:** MIT

**Version:** 1.0.0

*Created by Madhusudan Mahatha - September 2025*
