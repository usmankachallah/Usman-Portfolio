# Admin Backend Integration Guide

## Overview

The admin dashboard is now fully integrated with a Node.js/Express backend using MySQL database and JWT authentication.

## Backend Setup

### 1. Install Dependencies

Navigate to the backend folder and install required packages:

```bash
cd backend
npm install
```

This installs:

- **express**: Web framework
- **mysql2**: MySQL driver
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **body-parser**: Request parsing
- **validator**: Input validation

### 2. Database Setup

#### Create MySQL Database

Run the SQL setup script in your MySQL client:

```bash
# Open MySQL client
mysql -u root -p

# Then run the setup
source backend/database/setup.sql
```

Or copy the entire `database/setup.sql` content and execute it in your MySQL client.

**Tables Created:**

- `admin_users` - Admin user accounts with profiles
- `contacts` - Contact form submissions
- `projects` - Portfolio projects
- `skills` - Portfolio skills

#### Default Admin Credentials

After setup, you can login with:

- **Email**: `admin@usman.com`
- **Password**: `admin123`

**⚠️ Important**: Change this password immediately after first login!

### 3. Configure Environment Variables

Edit the `.env` file in the backend folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=usman_portfolio
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here-change-in-production
```

### 4. Generate Admin Password Hash (Optional)

If you want to create a new admin user or change the default password, generate a hash:

```bash
node utils/hashPassword.js "your-password-here"
```

Copy the output and update the `admin_users` table:

```sql
UPDATE admin_users SET password = 'hashed_password_here' WHERE email = 'admin@usman.com';
```

### 5. Start the Backend Server

**Development Mode** (with auto-reload):

```bash
npm run dev
```

**Production Mode**:

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Endpoints

#### 1. Admin Login

- **Endpoint**: `POST /api/admin/login`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "email": "admin@usman.com",
  "password": "admin123"
}
```

- **Response**:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "name": "Usman",
    "email": "admin@usman.com",
    "title": "Full Stack Developer",
    "avatar_url": null
  }
}
```

### Profile Endpoints (Requires Authentication)

All profile endpoints require the JWT token in the Authorization header:

```
Authorization: Bearer <your-token-here>
```

#### 2. Get Admin Profile

- **Endpoint**: `GET /api/admin/profile`
- **Response**:

```json
{
  "admin": {
    "id": 1,
    "name": "Usman",
    "email": "admin@usman.com",
    "title": "Full Stack Developer",
    "bio": "Passionate developer...",
    "phone": "+92 300 1234567",
    "location": "Pakistan",
    "avatar_url": null,
    "created_at": "2024-01-01T10:00:00.000Z"
  }
}
```

#### 3. Update Admin Profile

- **Endpoint**: `PUT /api/admin/profile`
- **Body**:

```json
{
  "name": "Usman Ahmed",
  "title": "Senior Full Stack Developer",
  "bio": "Updated bio...",
  "phone": "+92 300 9876543",
  "location": "Karachi, Pakistan",
  "avatar_url": "https://..."
}
```

- **Response**: `{ "message": "Profile updated successfully" }`

#### 4. Change Password

- **Endpoint**: `PUT /api/admin/change-password`
- **Body**:

```json
{
  "currentPassword": "admin123",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

- **Response**: `{ "message": "Password changed successfully" }`

### Contact Management Endpoints

#### 5. Get All Contact Messages (with Pagination)

- **Endpoint**: `GET /api/admin/contacts?page=1&limit=10`
- **Response**:

```json
{
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Great portfolio!",
      "created_at": "2024-01-15T14:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### 6. Delete Contact Message

- **Endpoint**: `DELETE /api/admin/contacts/:id`
- **Response**: `{ "message": "Contact deleted successfully" }`

## Frontend Integration

### Admin Login Component

The login component now connects to the backend:

```javascript
// AdminLogin.jsx
const API_URL = "http://localhost:5000/api";

const response = await fetch(`${API_URL}/admin/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

const data = await response.json();

if (response.ok) {
  localStorage.setItem("adminToken", data.token);
  localStorage.setItem("adminUser", JSON.stringify(data.admin));
  setIsLoggedIn(true);
}
```

### Protected API Calls

All authenticated endpoints use the helper function:

```javascript
const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Usage in fetch requests
const response = await fetch(endpoint, {
  method: "GET",
  headers: getAuthHeader(),
});
```

### Components Connected to Backend

1. **AdminLogin.jsx** - Authenticates with backend
2. **AdminProfile.jsx** - Fetches and updates user profile
3. **ContactMessages.jsx** - Fetches and deletes contact messages
4. **ProjectsManager.jsx** - (Ready for backend integration)
5. **SkillsManager.jsx** - (Ready for backend integration)

## Testing the Backend

### Using cURL

```bash
# Test login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@usman.com","password":"admin123"}'

# Test profile endpoint (replace TOKEN with your token)
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer TOKEN"

# Test health check
curl http://localhost:5000/api/health
```

### Using Postman

1. Open Postman
2. Create a new POST request to `http://localhost:5000/api/admin/login`
3. Set body to raw JSON:
   ```json
   {
     "email": "admin@usman.com",
     "password": "admin123"
   }
   ```
4. Send and copy the `token` from response
5. For protected endpoints, add Authorization header:
   - Type: Bearer Token
   - Token: [paste your token]

## Security Considerations

### Password Security

- Passwords are hashed using bcryptjs with 10 salt rounds
- Never store plain text passwords
- Use the hashPassword.js utility for password management

### JWT Tokens

- Tokens expire after 24 hours
- Stored in localStorage (not secure for production)
- **Production**: Use HttpOnly cookies instead

### Environment Variables

- Never commit `.env` file to git
- Add `.env` to `.gitignore`
- Change `JWT_SECRET` in production
- Use strong database password

### HTTPS

- Use HTTPS in production
- All sensitive data should be encrypted in transit

## Troubleshooting

### MySQL Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution**:

- Ensure MySQL server is running
- Check credentials in `.env`
- Verify database exists

### Invalid Token Error

```
Error: Invalid token
```

**Solution**:

- Token may have expired (24-hour limit)
- Token format must include "Bearer " prefix
- Check JWT_SECRET matches between backend and frontend

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:

- Ensure backend is running on port 5000
- Check CORS middleware in server.js
- Verify frontend URL is allowed

### Database Errors

```
Error: Table 'admin_users' doesn't exist
```

**Solution**:

- Run `database/setup.sql` in MySQL
- Ensure database `usman_portfolio` was created
- Check database name in `.env`

## Next Steps

### 1. Complete Backend Integration

- Integrate ProjectsManager with backend
- Integrate SkillsManager with backend
- Add project CRUD operations
- Add skill CRUD operations

### 2. Enhance Security

- Implement refresh tokens
- Add rate limiting
- Add input sanitization
- Add audit logging

### 3. Deployment

- Deploy backend to Heroku, AWS, or DigitalOcean
- Deploy frontend to Vercel or Netlify
- Configure production environment variables
- Set up database backups

### 4. Additional Features

- Add admin user management
- Add email notifications
- Add analytics dashboard
- Add content scheduling

## File Structure

```
backend/
├── middleware/
│   └── auth.js              # JWT verification middleware
├── routes/
│   ├── admin.js             # Admin endpoints (auth, profile, contacts)
│   ├── contact.js           # Contact form endpoints
│   ├── projects.js          # Project management endpoints
│   └── skills.js            # Skill management endpoints
├── database/
│   └── setup.sql            # Database schema and sample data
├── utils/
│   └── hashPassword.js      # Password hashing utility
├── server.js                # Express application entry point
├── package.json             # Dependencies
├── .env                     # Environment configuration
└── README.md                # Backend documentation
```

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review the backend README.md
3. Check server logs for error messages
4. Ensure all dependencies are installed correctly
