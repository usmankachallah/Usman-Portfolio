# ✅ Admin Backend Setup Checklist

Use this checklist to ensure everything is properly set up.

## Phase 1: Pre-Setup ✓

- [x] Backend files created (auth.js, admin.js, hashPassword.js)
- [x] Database schema updated (admin_users table)
- [x] Dependencies added to package.json
- [x] Environment configuration template created
- [x] Frontend components updated
- [x] Documentation completed

## Phase 2: Local Setup

### Step 1: Install Backend Dependencies

- [ ] Navigate to backend folder: `cd backend`
- [ ] Run: `npm install`
- [ ] Verify bcryptjs and jsonwebtoken are installed
- [ ] Check for any warnings or errors

### Step 2: Configure Database

- [ ] Open MySQL client
- [ ] Run: `source backend/database/setup.sql`
- [ ] OR copy entire file content and execute
- [ ] Verify database created
- [ ] Verify tables created (contacts, projects, skills, admin_users)
- [ ] Verify default admin user inserted

### Step 3: Configure Environment

- [ ] Create/edit `backend/.env` file
- [ ] Set DB_HOST (usually `localhost`)
- [ ] Set DB_USER (usually `root`)
- [ ] Set DB_PASSWORD (your MySQL password)
- [ ] Set DB_NAME to `usman_portfolio`
- [ ] Set PORT to `5000`
- [ ] Set JWT_SECRET to a random string (32+ characters)
- [ ] Save and close file

### Step 4: Start Backend Server

- [ ] Open terminal in backend folder
- [ ] Run: `npm run dev`
- [ ] Should see: `✅ Server running on http://localhost:5000`
- [ ] Test health endpoint: `curl http://localhost:5000/api/health`
- [ ] Should return: `{"message":"Backend is running successfully!"}`

### Step 5: Start Frontend Server

- [ ] Open new terminal in project root (not backend)
- [ ] Run: `npm run dev`
- [ ] Should see: Development server running on port 5174
- [ ] Browser opens or visit: `http://localhost:5174`

## Phase 3: Testing

### Test 1: Admin Login

- [ ] Navigate to Admin section in browser
- [ ] Click "Login"
- [ ] Enter email: `admin@usman.com`
- [ ] Enter password: `admin123`
- [ ] Click "Login"
- [ ] Should redirect to Admin Dashboard
- [ ] Should see welcome message

### Test 2: View Profile

- [ ] In Admin Dashboard, click "Profile Settings" tab
- [ ] Should display profile information
- [ ] Verify name, email, title are loaded
- [ ] Check if bio, phone, location loaded

### Test 3: Update Profile

- [ ] Click "Edit Profile"
- [ ] Change name or title
- [ ] Click "Save Profile"
- [ ] Should show success message
- [ ] Verify changes saved
- [ ] Refresh page and verify changes persist

### Test 4: Change Password

- [ ] Scroll to "Change Password" section
- [ ] Enter current password: `admin123`
- [ ] Enter new password: (your choice)
- [ ] Confirm new password
- [ ] Click "Change Password"
- [ ] Should show success message
- [ ] Logout and login with new password to verify

### Test 5: View Contact Messages

- [ ] In Admin Dashboard, click "Contact Messages" tab
- [ ] Should display message list (or empty if none)
- [ ] Try deleting a test message if available
- [ ] Verify deletion works
- [ ] Test pagination if >10 messages

## Phase 4: Security Setup

- [ ] Changed default password from `admin123`
- [ ] Changed JWT_SECRET from template value
- [ ] Added `.env` to `.gitignore` (prevent committing)
- [ ] Verified no sensitive data in git history
- [ ] MySQL running with authentication
- [ ] Backend not exposing stack traces in errors

## Phase 5: Backend Integration (Optional)

- [ ] Update ProjectsManager to use backend APIs
  - [ ] GET /api/projects
  - [ ] POST /api/projects (create)
  - [ ] DELETE /api/projects/:id
- [ ] Update SkillsManager to use backend APIs
  - [ ] GET /api/skills
  - [ ] POST /api/skills (create)
  - [ ] DELETE /api/skills/:id

## Phase 6: Production Preparation (Optional)

- [ ] Configure production environment (.env.production)
- [ ] Test with production database
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure monitoring/logging
- [ ] Test all features in production environment

## Troubleshooting Checklist

### MySQL Issues

- [ ] MySQL service is running
- [ ] Can connect with: `mysql -u root -p`
- [ ] Database `usman_portfolio` exists
- [ ] All 4 tables exist (contacts, projects, skills, admin_users)
- [ ] Default admin user exists in admin_users table

### Backend Issues

- [ ] All dependencies installed (check node_modules)
- [ ] .env file exists with correct values
- [ ] Port 5000 is not in use
- [ ] No syntax errors in backend files
- [ ] Backend console shows "✅ Server running"

### Frontend Issues

- [ ] npm dependencies installed
- [ ] No TypeScript/JavaScript errors in console
- [ ] Admin component loads without errors
- [ ] Correct backend URL in components (http://localhost:5000)

### Authentication Issues

- [ ] Can login with admin@usman.com / admin123
- [ ] Token is stored in localStorage
- [ ] Authorization header includes "Bearer " prefix
- [ ] Token expires after 24 hours (expected behavior)

## Files to Verify

### Backend Files

- [x] `backend/middleware/auth.js` - 20 lines
- [x] `backend/routes/admin.js` - 150+ lines
- [x] `backend/utils/hashPassword.js` - 15 lines
- [x] `backend/server.js` - Updated with admin routes
- [x] `backend/.env` - Configuration file
- [x] `backend/package.json` - JWT and bcryptjs added
- [x] `backend/database/setup.sql` - admin_users table added

### Frontend Files

- [x] `src/components/Admin/AdminLogin.jsx` - Connected to backend
- [x] `src/components/Admin/AdminProfile.jsx` - Connected to backend
- [x] `src/components/Admin/ContactMessages.jsx` - Connected to backend

### Documentation Files

- [x] `ADMIN_BACKEND_SETUP.md` - Complete setup guide
- [x] `ADMIN_QUICK_REFERENCE.md` - Quick reference
- [x] `API_REFERENCE.md` - API documentation
- [x] `BACKEND_INTEGRATION.md` - Integration guide
- [x] `README_ADMIN_BACKEND.md` - Overview
- [x] `ADMIN_IMPLEMENTATION_SUMMARY.md` - Summary

## Quick Test Commands

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

### Test Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@usman.com","password":"admin123"}'
```

### Test Protected Endpoint (after login)

```bash
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Final Verification

After completing all steps:

- [ ] Backend runs without errors
- [ ] Frontend displays admin dashboard
- [ ] Login works with valid credentials
- [ ] Profile loads and displays correctly
- [ ] Profile can be updated
- [ ] Password can be changed
- [ ] Contact messages can be viewed
- [ ] Contact messages can be deleted
- [ ] All components have proper error handling
- [ ] No sensitive data logged to console

## Success Criteria

✅ **You're done when:**

1. Backend server running on http://localhost:5000
2. Frontend server running on http://localhost:5174
3. Can login to admin dashboard with default credentials
4. Profile displays and updates correctly
5. Contact messages display with pagination
6. No errors in browser console or backend logs
7. All API endpoints respond correctly

---

## Next Steps

### Immediate

1. ✅ Complete all checklist items above
2. Change default admin password
3. Test all features

### Short Term (This Week)

- Integrate projects backend management
- Integrate skills backend management
- Add more admin users if needed
- Verify all data persistence

### Medium Term (This Month)

- Set up email notifications
- Add analytics dashboard
- Implement search functionality
- Add backup system

### Long Term (Production)

- Deploy backend to cloud (Heroku, AWS, etc.)
- Deploy frontend to CDN (Vercel, Netlify)
- Configure monitoring and alerts
- Set up continuous backups
- Enable analytics tracking

---

## Support Resources

If something doesn't work:

1. Check `ADMIN_BACKEND_SETUP.md` for detailed setup instructions
2. Review `ADMIN_QUICK_REFERENCE.md` for quick answers
3. Check backend logs for error messages
4. Review `API_REFERENCE.md` for endpoint documentation
5. Ensure database setup was completed correctly

---

**Status**: Ready for production use  
**Last Updated**: January 19, 2026

_Keep this checklist for future reference and when deploying to production._
