# Usman's Portfolio Backend

Backend API for Usman's Portfolio Website built with Node.js, Express, and MySQL.

## Features

- Contact Form Submission
- Projects Management
- Skills Listing
- Admin Authentication (JWT)
- Admin Profile Management
- Admin Dashboard API
- RESTful API Endpoints
- MySQL Database Integration
- CORS Support
- Input Validation
- Password Hashing (bcryptjs)

## Tech Stack

- **Framework**: Express.js (Node.js)
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Body Parser**: Express body-parser
- **Validation**: Validator.js
- **Environment**: dotenv

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Setup Steps

1. **Install dependencies**

```bash
npm install
```

2. **Create MySQL Database**
   - Open your MySQL client
   - Run the SQL commands in `database/setup.sql`

   ```sql
   CREATE DATABASE IF NOT EXISTS usman_portfolio;
   -- Run the rest of setup.sql file
   ```

3. **Configure Environment Variables**
   - Edit `.env` file with your MySQL credentials:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=usman_portfolio
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-secret-key-here-change-in-production
   ```

4. **Update Admin Password (Optional)**
   - Default admin credentials are in `setup.sql`
   - To generate a new hashed password:

   ```bash
   node utils/hashPassword.js "your-password-here"
   ```

5. **Start the Server**

Development (with auto-reload):

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

### Admin Routes (Authentication Required)

- `POST /api/admin/login` - Admin login (returns JWT token)
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile
- `PUT /api/admin/change-password` - Change admin password
- `GET /api/admin/contacts` - Get all contact messages (with pagination)
- `DELETE /api/admin/contacts/:id` - Delete contact message

**Example Login Request:**

```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@usman.com",
  "password": "admin123"
}
```

**Response:**

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

**Using Token in Requests:**

Add the token to the Authorization header:

```bash
Authorization: Bearer <your-token-here>
```

### Contact Routes

- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (Admin)

### Projects Routes

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin)

### Skills Routes

- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skill (Admin)

### Health Check

- `GET /api/health` - Check if server is running

## Database Schema

### Contacts Table

```sql
- id (INT, PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR)
- message (TEXT)
- created_at (TIMESTAMP)
```

### Projects Table

```sql
- id (INT, PRIMARY KEY)
- title (VARCHAR)
- description (TEXT)
- technologies (VARCHAR)
- link (VARCHAR)
- icon (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Skills Table

```sql
- id (INT, PRIMARY KEY)
- category (VARCHAR)
- name (VARCHAR)
- proficiency (INT)
- created_at (TIMESTAMP)
```

### Admin Users Table

```sql
- id (INT, PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR) - hashed with bcryptjs
- title (VARCHAR)
- bio (TEXT)
- phone (VARCHAR)
- location (VARCHAR)
- avatar_url (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## CORS Configuration

The backend allows requests from your frontend at `http://localhost:5174`

## Authentication

The admin routes use JWT (JSON Web Token) for authentication:

1. Admin logs in via `/api/admin/login` endpoint
2. Server returns a JWT token valid for 24 hours
3. Client stores the token (in localStorage or session storage)
4. Client includes token in Authorization header for protected endpoints
5. Server verifies token using `verifyToken` middleware

**Security Notes:**

- Passwords are hashed using bcryptjs with salt rounds of 10
- JWT tokens expire after 24 hours
- Change the `JWT_SECRET` in production
- Use HTTPS in production
- Keep `.env` file in `.gitignore`

## Error Handling

All endpoints return JSON responses with appropriate status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Development

To add new routes:

1. Create a new file in `routes/` folder
2. Import and use in `server.js`
3. Add corresponding database tables in `database/setup.sql`

## Troubleshooting

### Cannot connect to MySQL

- Check if MySQL server is running
- Verify DB credentials in `.env` file
- Ensure database `usman_portfolio` exists
- Run `database/setup.sql` to create tables

### JWT Token Errors

- Token may be expired (valid for 24 hours)
- Check if token format is correct: `Bearer <token>`
- Verify `JWT_SECRET` matches between frontend and backend

### Password Issues

- Use the `utils/hashPassword.js` script to generate hashed passwords
- Never store plain text passwords in database

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2
3. Set up a reverse proxy (nginx)
4. Enable HTTPS
5. Add authentication for admin endpoints

## License

MIT License - Feel free to use this for your portfolio!
