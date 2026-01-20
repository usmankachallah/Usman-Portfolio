# Admin Dashboard Documentation

## Overview

A complete admin dashboard for managing your portfolio content including contact messages, projects, skills, and profile settings.

## Access

### Login Page

- **URL:** `http://localhost:5174/admin`
- **Default Credentials:**
  - Username: `admin`
  - Password: `admin123`

⚠️ **Note:** Change these credentials in production!

## Features

### 📊 Dashboard Overview

- Quick stats showing total messages, projects, and skills
- Dashboard statistics update automatically
- Quick navigation between different management sections

### 📧 Contact Messages Management

- View all contact form submissions
- See sender name, email, and message content
- Display submission timestamp
- Reply button to send direct email responses
- Delete messages when no longer needed
- Refresh button to load latest messages

### 🎯 Projects Management

- **View All Projects:** Display list of all portfolio projects
- **Add New Project:**
  - Project name and description
  - Technologies used (comma-separated)
  - Project icon (emoji)
  - External project link
- **Delete Projects:** Remove outdated projects
- View projects with all details and tech tags

### 💻 Skills Management

- **View Skills by Category:**
  - Frontend skills (HTML, CSS, JavaScript, React, etc.)
  - Backend skills (Python, MySQL, APIs, etc.)
  - Mobile, Database, Tools, and more
- **Add New Skills:**
  - Select category
  - Enter skill name
  - Set proficiency level (0-100%)
  - Visual proficiency bar
- **Organize Skills:** Automatic grouping by category
- **Proficiency Tracking:** Visual bars showing skill level

### 👤 Profile Settings

- **Profile Information:**
  - Edit full name, email, profession
  - Update bio and location
  - Manage phone number
  - View/edit all personal details
- **Security Settings:**
  - Change password securely
  - Current password verification
  - Password confirmation requirement
  - Minimum 6 character requirement
- **Account Information:**
  - View username
  - Check account status
  - See member since date
  - Last login timestamp
- Real-time validation and success/error notifications

## Dashboard Components

### AdminLogin.jsx

Secure login page with:

- Email and password validation
- Error messages for invalid credentials
- Demo credentials displayed for testing
- Simple, clean interface

### AdminDashboard.jsx

Main dashboard with:

- Statistics overview
- Tab-based navigation (Messages, Projects, Skills, Profile Settings)
- Route to all management sections
- Logout functionality

### AdminNav.jsx

Navigation bar featuring:

- Admin branding
- Profile settings quick access button (👤)
- "View Site" link to public portfolio
- Logout button
- Sticky header styling

### ContactMessages.jsx

Contact form management:

- Displays all contact submissions
- Shows name, email, message, and timestamp
- Reply via email functionality
- Delete message capability
- Empty state when no messages

### ProjectsManager.jsx

Project management interface:

- List all projects in card format
- Form to add new projects
- Edit and delete capabilities
- Display technologies as tags
- View project links

### SkillsManager.jsx

Skills management interface:

- Grid view of skills by category
- Form to add new skills with proficiency
- Proficiency slider (0-100%)
- Visual proficiency bars
- Category organization

### AdminProfile.jsx

Profile settings and management:

- **Profile Information Section:**
  - Edit mode toggle
  - Form fields for full name, email, profession, bio, location, phone
  - Real-time validation with email format checking
  - Save and cancel buttons
  - View mode displaying all profile information
- **Security Settings Section:**
  - Password change form with current password verification
  - New password confirmation requirement
  - Minimum 6 character validation
  - Show/hide form toggle
- **Account Information Section:**
  - Read-only display of account details
  - Username, status, member date, last login
  - Visual status indicator

## API Integration

The admin dashboard connects to your backend API endpoints:

```
POST /api/contact - Add contact message
GET /api/contact/messages - Fetch all messages

GET /api/projects - Get all projects
POST /api/projects - Create new project
DELETE /api/projects/:id - Delete project (backend support needed)

GET /api/skills - Get all skills
POST /api/skills - Add new skill
```

## Styling

### Color Scheme

- Primary: `#0369a1` (Professional Blue)
- Secondary: `#0284c7` (Light Blue)
- Accent: `#059669` (Green)
- Background: `#f5f7fa`
- Text: `#0f172a` (Dark)

### Responsive Design

- Mobile-first approach
- Breakpoints at 768px
- Flexible grid layouts
- Touch-friendly buttons

## Environment Variables

Ensure your backend server is running on:

- **URL:** `http://localhost:5000`

Update the fetch URLs in each component if your backend is on a different host/port:

```javascript
// Change this in ContactMessages.jsx, ProjectsManager.jsx, SkillsManager.jsx
fetch("http://localhost:5000/api/...");
```

## Usage Guide

### Step 1: Start Your Services

```bash
# Terminal 1: Start Frontend
cd your-portfolio
npm run dev

# Terminal 2: Start Backend
cd backend
npm run dev
```

### Step 2: Access Admin Dashboard

1. Navigate to `http://localhost:5174/admin`
2. Login with demo credentials
3. Start managing your content

### Step 3: Manage Content

- **Add Projects:** Click "➕ Add Project" button
- **View Messages:** Check "📧 Messages" tab
- **Add Skills:** Click "➕ Add Skill" in Skills tab
- **Update Stats:** Click refresh button for latest data

## Security Considerations

### Current Setup (Development)

- Demo credentials: `admin@usman.com` / `admin123`
- LocalStorage-based token storage
- No backend authentication validation

### Production Recommendations

1. **Implement Backend Authentication:**
   - Use JWT tokens
   - Hash passwords with bcrypt
   - Validate tokens on backend
   - Set secure HTTP-only cookies

2. **Authorization Checks:**
   - Validate admin status on backend
   - Protect POST/DELETE endpoints
   - Rate limiting on sensitive endpoints

3. **Data Protection:**
   - Use HTTPS only
   - Validate all inputs on backend
   - Sanitize user inputs
   - Use CORS properly

4. **Change Default Credentials:**
   - Update email/password in AdminLogin.jsx
   - Store credentials securely (environment variables)
   - Implement password reset functionality

## Troubleshooting

### Dashboard Not Loading

- Ensure frontend dev server is running (`npm run dev`)
- Check browser console for errors
- Verify React Router is installed

### Can't Add Projects/Skills

- Verify backend server is running (`npm run dev` in backend folder)
- Check network tab in browser dev tools
- Ensure CORS is configured on backend
- Verify database is connected

### Messages Not Showing

- Check backend `/api/contact/messages` endpoint
- Verify database has contact_messages table
- Check browser console for fetch errors

### Styling Issues

- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS files in `src/styles/` folder
- Verify Vite is compiling CSS correctly

## File Structure

```
src/
├── components/
│   └── Admin/
│       ├── Admin.jsx              # Main admin wrapper
│       ├── AdminLogin.jsx         # Login page
│       ├── AdminDashboard.jsx    # Dashboard container
│       ├── AdminNav.jsx           # Navigation bar
│       ├── ContactMessages.jsx   # Messages management
│       ├── ProjectsManager.jsx   # Projects management
│       ├── SkillsManager.jsx     # Skills management
│       ├── AdminProfile.jsx      # Profile settings
│       └── ADMIN_README.md       # This file
└── styles/
    ├── Admin.css                  # Admin wrapper styles
    ├── AdminLogin.css            # Login page styles
    ├── AdminNav.css              # Navigation styles
    ├── AdminDashboard.css        # Dashboard styles
    ├── ContactMessages.css       # Messages management styles
    ├── ProjectsManager.css       # Projects management styles
    ├── SkillsManager.css         # Skills management styles
    └── AdminProfile.css          # Profile settings styles
```

## Future Enhancements

- [x] Profile settings and management
- [x] Password change functionality
- [ ] Edit existing projects and skills
- [ ] Upload project images/screenshots
- [ ] Avatar upload for profile
- [ ] Admin analytics dashboard
- [ ] Backup and restore data
- [ ] Email notifications
- [ ] Multi-user admin support
- [ ] Activity logs and audit trail
- [ ] Permission-based access control
- [ ] Two-factor authentication
- [ ] Admin account creation/management

## Support

For issues or questions, refer to the backend API documentation in `/backend/README.md`

---

**Created:** January 2026
**Version:** 1.0
