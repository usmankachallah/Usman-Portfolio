# Admin Backend API Reference

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-token-here>
```

To get a token, login via the `/admin/login` endpoint first.

---

## Public Endpoints

### 1. Health Check

**Endpoint**: `GET /health`

**Purpose**: Verify backend is running

**No Authentication Required**

**Response** (200 OK):

```json
{
  "message": "Backend is running successfully!"
}
```

**Example**:

```bash
curl http://localhost:5000/api/health
```

---

### 2. Admin Login

**Endpoint**: `POST /admin/login`

**Purpose**: Authenticate admin user and receive JWT token

**No Authentication Required**

**Request Body**:

```json
{
  "email": "admin@usman.com",
  "password": "admin123"
}
```

**Response** (200 OK):

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwi...",
  "admin": {
    "id": 1,
    "name": "Usman",
    "email": "admin@usman.com",
    "title": "Full Stack Developer",
    "avatar_url": null
  }
}
```

**Error Response** (401 Unauthorized):

```json
{
  "error": "Invalid email or password"
}
```

**Example**:

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@usman.com","password":"admin123"}'
```

---

## Protected Endpoints

All endpoints below require authentication with JWT token.

### 3. Get Admin Profile

**Endpoint**: `GET /admin/profile`

**Purpose**: Retrieve current admin's profile information

**Authentication Required**: ✅ Yes

**Response** (200 OK):

```json
{
  "admin": {
    "id": 1,
    "name": "Usman",
    "email": "admin@usman.com",
    "title": "Full Stack Developer",
    "bio": "Passionate developer with 3+ years of experience",
    "phone": "+92 300 1234567",
    "location": "Pakistan",
    "avatar_url": null,
    "created_at": "2024-01-19T10:00:00.000Z"
  }
}
```

**Error Response** (401 Unauthorized):

```json
{
  "error": "No token provided"
}
```

**Example**:

```bash
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 4. Update Admin Profile

**Endpoint**: `PUT /admin/profile`

**Purpose**: Update admin profile information

**Authentication Required**: ✅ Yes

**Request Body**:

```json
{
  "name": "Usman Ahmed",
  "title": "Senior Full Stack Developer",
  "bio": "Passionate about building amazing web applications",
  "phone": "+92 300 9876543",
  "location": "Karachi, Pakistan",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

**Response** (200 OK):

```json
{
  "message": "Profile updated successfully"
}
```

**Validation Errors** (400 Bad Request):

```json
{
  "error": "Name is required"
}
```

**Example**:

```bash
curl -X PUT http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usman Ahmed",
    "title": "Senior Full Stack Developer",
    "bio": "Passionate about building amazing web applications"
  }'
```

---

### 5. Change Password

**Endpoint**: `PUT /admin/change-password`

**Purpose**: Change admin account password

**Authentication Required**: ✅ Yes

**Request Body**:

```json
{
  "currentPassword": "admin123",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
```

**Response** (200 OK):

```json
{
  "message": "Password changed successfully"
}
```

**Validation Errors** (400 Bad Request):

```json
{
  "error": "New passwords do not match"
}
```

**Authentication Error** (401 Unauthorized):

```json
{
  "error": "Current password is incorrect"
}
```

**Validation Rules**:

- All fields required
- New password must be at least 6 characters
- New password and confirm password must match
- Current password must be correct

**Example**:

```bash
curl -X PUT http://localhost:5000/api/admin/change-password \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "admin123",
    "newPassword": "newSecurePassword123",
    "confirmPassword": "newSecurePassword123"
  }'
```

---

### 6. Get Contact Messages

**Endpoint**: `GET /admin/contacts`

**Purpose**: Retrieve paginated contact form messages

**Authentication Required**: ✅ Yes

**Query Parameters**:

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Messages per page

**Response** (200 OK):

```json
{
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Great portfolio! I'm interested in your services.",
      "created_at": "2024-01-15T14:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "message": "Love your work!",
      "created_at": "2024-01-14T10:15:00.000Z"
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

**Example - Page 1 with 10 per page**:

```bash
curl -X GET "http://localhost:5000/api/admin/contacts?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Example - Page 2 with 5 per page**:

```bash
curl -X GET "http://localhost:5000/api/admin/contacts?page=2&limit=5" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 7. Delete Contact Message

**Endpoint**: `DELETE /admin/contacts/:id`

**Purpose**: Delete a specific contact message

**Authentication Required**: ✅ Yes

**URL Parameters**:

- `id` (required) - Message ID to delete

**Response** (200 OK):

```json
{
  "message": "Contact deleted successfully"
}
```

**Error Response** (404 Not Found):

```json
{
  "error": "Contact not found"
}
```

**Example**:

```bash
curl -X DELETE http://localhost:5000/api/admin/contacts/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Status Codes Reference

| Code | Meaning                      | Example                      |
| ---- | ---------------------------- | ---------------------------- |
| 200  | OK - Request successful      | Profile retrieved            |
| 201  | Created - Resource created   | Message stored               |
| 400  | Bad Request - Invalid data   | Missing required field       |
| 401  | Unauthorized - Auth failed   | Invalid token or credentials |
| 404  | Not Found - Resource missing | Contact ID doesn't exist     |
| 500  | Server Error - Backend issue | Database connection error    |

---

## Error Response Format

All errors return in this format:

```json
{
  "error": "Error message here",
  "message": "Optional detailed message"
}
```

---

## Authentication Flow Example

### Step 1: Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@usman.com","password":"admin123"}'
```

**Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {...}
}
```

### Step 2: Use Token for Protected Requests

```bash
# Save token
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Get profile
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer $TOKEN"

# Update profile
curl -X PUT http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name"}'
```

---

## Testing with Postman

### 1. Import Collection

Create a new Postman collection with these requests

### 2. Setup Authorization

- Create Bearer Token variable: `{{token}}`
- After login, set variable with response token

### 3. Test Workflow

1. **Login Request**
   - POST `{{baseUrl}}/admin/login`
   - Body: `{"email":"admin@usman.com","password":"admin123"}`
   - Extract token from response

2. **Protected Requests**
   - Set Authorization: Bearer Token → `{{token}}`
   - Test each endpoint

---

## Frontend Implementation Example

```javascript
// Get auth token
const token = localStorage.getItem("adminToken");

// Helper function for authenticated requests
async function apiCall(endpoint, options = {}) {
  const response = await fetch(`http://localhost:5000/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  return response.json();
}

// Usage examples
// Get profile
const profile = await apiCall("/admin/profile");

// Update profile
await apiCall("/admin/profile", {
  method: "PUT",
  body: JSON.stringify({ name: "New Name" }),
});

// Get contacts
const contacts = await apiCall("/admin/contacts?page=1");

// Delete contact
await apiCall("/admin/contacts/1", { method: "DELETE" });
```

---

## Notes

- Tokens expire after 24 hours
- Pagination: First page is 1 (not 0)
- All timestamps are in ISO 8601 format (UTC)
- Passwords are hashed with bcryptjs (10 salt rounds)
- Maximum 100 items per page (use limit=100)

---

**Last Updated**: January 19, 2026
