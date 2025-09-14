# 🚀 Deployment Guide

## Backend Deployment on Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account

### Step 2: Deploy Backend
1. Click "New" → "Web Service"
2. Connect your GitHub repository: `msmahatha/me-api-playground`
3. Configure the service:
   - **Name:** `me-api-playground-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:
```
PORT=10000
MONGODB_URI=mongodb+srv://madhusudanmahatha:msmahatha@cluster0.vkccwze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Your backend is now live at: `https://me-api-playground-v3mx.onrender.com`

---

## Frontend Deployment on Netlify

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account

### Step 2: Deploy Frontend
1. Click "New site from Git"
2. Choose GitHub and select: `msmahatha/me-api-playground`
3. Configure build settings:
   - **Base directory:** `me-api-frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `me-api-frontend/dist`
   - **Node version:** `18` (automatically detected from .nvmrc)

### Step 3: Set Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
VITE_API_URL=https://me-api-playground-v3mx.onrender.com
```

### Step 4: Deploy
- Click "Deploy site"
- Wait for deployment (2-5 minutes)
- Your frontend will be available at: `https://your-site-name.netlify.app`

---

## 🔧 Testing Deployment

### Backend Health Check
```bash
curl https://me-api-playground-v3mx.onrender.com/health
```

### Frontend API Connection
Visit your Netlify URL and check:
- Profile data loads correctly
- Projects display properly
- Search functionality works

---

## 🛠️ Troubleshooting

### Node.js Version Issues on Netlify
If you encounter Node version errors:
1. Check that `.nvmrc` file exists with `18`
2. Verify `netlify.toml` has `NODE_VERSION = "18"`
3. Clear Netlify cache and redeploy

### Build Failures
- Ensure all dependencies are in `package.json`
- Check build logs for specific error messages
- Verify environment variables are set correctly

### API Connection Issues
- Confirm `VITE_API_URL` environment variable is set
- Test backend endpoints directly
- Check CORS configuration

---

## 🔄 Updates and Redeployment

### Backend Updates
1. Push changes to GitHub
2. Render automatically redeploys

### Frontend Updates
1. Push changes to GitHub
2. Netlify automatically redeploys

---

## 📋 Post-Deployment Checklist

- [ ] Backend health endpoint responds
- [ ] Database connection works
- [ ] Frontend loads without errors
- [ ] API calls from frontend work
- [ ] All projects display correctly
- [ ] Search functionality works
- [ ] Environment variables are set correctly

## 🌐 Final URLs

- **Backend API:** `https://me-api-playground-v3mx.onrender.com` ✅ **DEPLOYED**
- **Frontend App:** `https://your-site-name.netlify.app` (Deploy next)
- **GitHub Repo:** `https://github.com/msmahatha/me-api-playground`
