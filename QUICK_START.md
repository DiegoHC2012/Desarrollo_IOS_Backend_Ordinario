# 🚀 Quick Start Guide

Get the React frontend up and running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- Backend API running (or accessible)
- Git installed

## Step 1: Clone & Navigate

```bash
# If not already cloned
git clone https://github.com/DiegoHC2012/Desarrollo_IOS_Backend_Ordinario.git

# Navigate to client directory
cd Desarrollo_IOS_Backend_Ordinario/client
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~178 packages).

## Step 3: Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your settings
nano .env
```

Update the following values:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_INSTITUTION_ID=your-institution-id
VITE_STUDENT_ID=your-default-student-id
```

## Step 4: Start Development Server

```bash
npm run dev
```

The app will open automatically at: **http://localhost:5173**

## Step 5: First Use

### Option A: Register New Account
1. Click "Sign up" on login page
2. Enter name, email, and password
3. Click "Sign Up"
4. You'll be redirected to dashboard

### Option B: Login with Existing Account
1. Enter email and password
2. Click "Sign In"
3. You'll be redirected to dashboard

### Configure IDs
1. On Dashboard, enter your Institution ID and Student ID
2. Click "Save Configuration"
3. Navigate to any module using the sidebar

## 🎯 Testing CRUD Operations

### Test Announcements
1. Click "Announcements" in sidebar
2. Click "Create New Announcement"
3. Fill in: Title, Message, Date
4. Click "Create"
5. See new announcement in list
6. Try Edit and Delete

### Test Other Modules
Follow the same pattern for:
- Subjects (requires Institution ID + Student ID)
- Tasks (requires Institution ID + Student ID)
- Grades (requires Institution ID + Student ID + Subject)
- Students (requires Institution ID)

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Maintenance
npm install              # Install dependencies
npm audit fix            # Fix security issues
```

## 🐛 Troubleshooting

### Backend Connection Failed
```
Error: No response from server
```
**Solution**: 
- Verify backend is running: `curl http://localhost:3000`
- Check VITE_API_BASE_URL in .env

### Login Failed
```
Error: Authentication failed
```
**Solution**:
- Clear localStorage: Open browser console → `localStorage.clear()`
- Refresh page
- Try registering new account

### Module Shows Warning
```
Please configure Institution ID in Dashboard
```
**Solution**:
- Go to Dashboard
- Enter Institution ID (and Student ID if needed)
- Click "Save Configuration"

### Build Errors
```
Error: Cannot find module...
```
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── context/        # State management
│   └── styles/         # CSS files
├── .env                # Environment config
├── package.json        # Dependencies
└── vite.config.js      # Build config
```

## 🎓 Learning Path

1. **Start Simple**: Test login and dashboard
2. **Try One Module**: Announcements (simplest)
3. **Explore Forms**: Create and edit items
4. **Test Validation**: Try submitting empty forms
5. **Check Responsive**: Resize browser window
6. **Read Code**: Start with `src/App.jsx`

## 📚 Documentation

- **Full Setup**: `/client/README.md`
- **Implementation**: `/FRONTEND_IMPLEMENTATION.md`
- **UI Guide**: `/VISUAL_GUIDE.md`
- **Summary**: `/IMPLEMENTATION_SUMMARY.md`

## 🆘 Getting Help

### Check Logs
- **Browser Console**: F12 → Console tab
- **Network Tab**: F12 → Network tab (see API calls)
- **Dev Server**: Check terminal for Vite errors

### Common Issues
| Issue | Solution |
|-------|----------|
| Port 5173 in use | Stop other Vite apps or change port in vite.config.js |
| CORS error | Enable CORS in backend |
| 404 on API calls | Verify API_BASE_URL |
| White screen | Check browser console for errors |

## ✅ Success Checklist

- [ ] npm install completed
- [ ] .env file created and configured
- [ ] npm run dev running
- [ ] App opens at localhost:5173
- [ ] Can register/login
- [ ] Can configure IDs in dashboard
- [ ] Can create an announcement
- [ ] All modules accessible

## 🎉 You're Ready!

If all items in the checklist are complete, you're ready to use the full admin interface.

**Next Steps**:
1. Explore all modules
2. Test CRUD operations
3. Check responsive design
4. Review code structure
5. Customize as needed

## 💡 Pro Tips

1. **Use Browser DevTools**: Essential for debugging
2. **Keep Backend Running**: Frontend needs API access
3. **Save IDs**: Institution/Student IDs persist in localStorage
4. **Check Network Tab**: See all API requests/responses
5. **Hot Reload**: Changes auto-reload in dev mode

## 🚀 Production Deployment

When ready for production:

```bash
# Build optimized bundle
npm run build

# Output in /dist folder
# Deploy dist/ to your hosting service
```

Popular hosting options:
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

---

**Need Help?** Check the documentation files or review the code comments.

**Found a Bug?** Check browser console and network tab for clues.

**Want to Customize?** Start with `/src/styles/global.css` for styling.

Happy coding! 🎉
