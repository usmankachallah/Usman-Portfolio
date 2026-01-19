# Admin Backend Complete Setup Guide

## Quick Start Overview

You now have a fully functional admin dashboard with:

- ✅ JWT-based authentication
- ✅ Admin profile management
- ✅ Contact message management with pagination
- ✅ Password security with bcryptjs
- ✅ MySQL database integration

## Step-by-Step Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

**Packages installed:**

- `express` - Web framework
- `mysql2` - MySQL driver with Promise support
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `body-parser` - Request body parsing
- `validator` - Input validation

### Step 2: Setup MySQL Database

#### Option A: Command Line (Recommended)

```bash
# Open MySQL
mysql -u root -p

# Paste the entire content of backend/database/setup.sql
# This creates the database, tables, and inserts sample data
```

#### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Right-click on Connections → New Connection
3. File → Open SQL Script → `backend/database/setup.sql`
4. Execute (Ctrl+Shift+Enter)

#### Option C: Using MySQL Command

```bash
mysql -u root -p < backend/database/setup.sql
```

**Tables Created:**

- `admin_users` - Admin accounts with profiles (1 default user)
- `contacts` - Contact form submissions (empty)
- `projects` - Portfolio projects (6 samples)
- `skills` - Portfolio skills (11 samples)

### Step 3: Configure Environment Variables

Edit `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=usman_portfolio
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here-change-in-production
```

Replace:

- `root` with your MySQL username
- `your_mysql_password` with your MySQL password
- `your-secret-key-here-change-in-production` with a random string (32+ characters recommended)

### Step 4: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

**Expected output:**

```
✅ Server running on http://localhost:5000
🔗 Make sure MySQL is running and configured in .env file
```

### Step 5: Test Backend Connection

Open your browser and visit:

- Health check: `http://localhost:5000/api/health`

You should see:

```json
{
  "message": "Backend is running successfully!"
}
```

## Default Admin Credentials

After setup, login with:

- **Email**: `admin@usman.com`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change this password immediately after first login using the profile settings!

## Frontend Admin Dashboard

Once the backend is running, start the frontend:

```bash
# Open new terminal in the main folder
npm run dev
```

Frontend will be available at `http://localhost:5174`

Navigate to the Admin section to access:

1. **Admin Login** - Authenticate with backend
2. **Admin Dashboard** - Manage your portfolio
3. **Profile Settings** - Update profile info and password
4. **Contact Messages** - View and manage contact form submissions

## API Endpoints Reference

### Public Endpoints

- `GET /api/health` - Health check
- `POST /api/admin/login` - Admin login
- `GET /api/contact` - Get contact form (public)
- `POST /api/contact` - Submit contact form
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/skills` - Get all skills

### Protected Endpoints (Requires JWT Token)

- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile
- `PUT /api/admin/change-password` - Change password
- `GET /api/admin/contacts?page=1&limit=10` - Get contact messages (paginated)
- `DELETE /api/admin/contacts/:id` - Delete contact message

## How Authentication Works

### Login Flow

```
1. User enters email & password → AdminLogin component
2. Frontend sends POST to /api/admin/login
3. Backend verifies credentials against admin_users table
4. Backend returns JWT token (valid 24 hours)
5. Frontend stores token in localStorage
6. User is redirected to Admin Dashboard
```

### Protected API Calls

```
1. Component needs to fetch protected data
2. Gets token from localStorage
3. Adds to Authorization header: "Bearer <token>"
4. Sends request with token
5. Backend verifies token with JWT middleware
6. If valid: returns data
7. If invalid: returns 401 Unauthorized
```

### Token Storage

Currently stored in `localStorage` for demo purposes.

**Production**: Use HttpOnly cookies instead for better security.

## Changing Default Password

### Option 1: Using Profile Settings (Recommended)

1. Login with `admin@usman.com` / `admin123`
2. Go to Admin Dashboard → Profile Settings tab
3. Scroll to "Change Password" section
4. Enter old and new passwords
5. Click "Change Password"

### Option 2: Using Database

```bash
# Generate hash
node backend/utils/hashPassword.js "your-new-password"

# Copy the output and run in MySQL
UPDATE admin_users SET password = 'hashed_password_here' WHERE email = 'admin@usman.com';
```

### Option 3: Create New Admin User

```sql
-- First, generate hash using: node backend/utils/hashPassword.js "password"
INSERT INTO admin_users (name, email, password, title)
VALUES ('Your Name', 'new@email.com', 'hashed_password_here', 'Your Title');
```

## Troubleshooting

### MySQL Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution:**

1. Ensure MySQL service is running
2. Windows: Start MySQL from Services
3. Mac/Linux: `brew services start mysql`
4. Verify credentials in `.env` file

### Database Not Found

```
Error: Unknown database 'usman_portfolio'
```

**Solution:**

- Run `database/setup.sql` in MySQL client
- Check `.env` has correct DB_NAME
- Ensure database creation in setup.sql was successful

### Token Expired

```
Error: Invalid token
```

**Solution:**

- Tokens expire after 24 hours
- Login again with valid credentials
- You'll get a fresh token for 24 more hours

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**

- Change PORT in `.env` to unused port (e.g., 5001)
- Or kill process using port 5000

## Advanced Features

### Adding New Admin Users

```sql
-- Hash the password first using: node backend/utils/hashPassword.js "password"
INSERT INTO admin_users (name, email, password, title, bio, phone, location)
VALUES (
  'John Doe',
  'john@example.com',
  '$2a$10$hashed_password_here...',
  'Editor',
  'Portfolio Editor',
  '+1-234-567-8900',
  'New York, USA'
);
```

### Changing JWT Secret (Production)

1. Edit `backend/.env`:

   ```env
   JWT_SECRET=your-32-character-random-string-here
   ```

2. Restart server with `npm run dev`

3. All old tokens become invalid (users need to login again)

### Database Backup

```bash
# Backup database
mysqldump -u root -p usman_portfolio > backup.sql

# Restore from backup
mysql -u root -p usman_portfolio < backup.sql
```

## File Structure

```
backend/
├── middleware/
│   └── auth.js                    # JWT verification
├── routes/
│   ├── admin.js                  # Admin auth & profile
│   ├── contact.js                # Contact form
│   ├── projects.js               # Projects CRUD
│   └── skills.js                 # Skills CRUD
├── database/
│   └── setup.sql                 # Schema & sample data
├── utils/
│   └── hashPassword.js           # Password hashing tool
├── server.js                     # Main Express app
├── .env                          # Environment config
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
└── README.md                     # Backend docs
```

## Next Steps

### 1. Complete Portfolio Integration

- [ ] Connect Projects Manager to backend
- [ ] Connect Skills Manager to backend
- [ ] Add project image uploads
- [ ] Add project URL validation

### 2. Enhance Security

- [ ] Add rate limiting
- [ ] Add input sanitization
- [ ] Implement refresh tokens
- [ ] Add audit logging

### 3. Production Deployment

- [ ] Deploy to Heroku, AWS, or DigitalOcean
- [ ] Configure HTTPS/SSL
- [ ] Set up database backups
- [ ] Enable monitoring and logging

### 4. Additional Features

- [ ] Email notifications for new contacts
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Blog/articles section

## Support & Documentation

- **Backend README**: [backend/README.md](backend/README.md)
- **Frontend Admin README**: [src/components/Admin/ADMIN_README.md](src/components/Admin/ADMIN_README.md)
- **Full Integration Guide**: [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)

## Important Security Notes

⚠️ **Before Production:**

1. Change default admin password
2. Change JWT_SECRET to a strong random string
3. Enable HTTPS/SSL
4. Use environment-specific configurations
5. Set up database backups
6. Implement rate limiting
7. Add input validation and sanitization
8. Keep dependencies updated
9. Use HttpOnly cookies instead of localStorage
10. Implement refresh tokens for security

---

**Setup Complete!** Your admin dashboard is now ready to use. Start the backend with `npm run dev` and the frontend with `npm run dev` in a separate terminal.
