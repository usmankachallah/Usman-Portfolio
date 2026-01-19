# Admin Backend Quick Reference

## 🚀 Quick Start (3 Steps)

### Step 1: Setup Database

```bash
# Open MySQL and run:
source backend/database/setup.sql
```

### Step 2: Configure Backend

Edit `backend/.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=usman_portfolio
PORT=5000
JWT_SECRET=your-secret-key
```

### Step 3: Start Both Servers

```bash
# Terminal 1 - Backend
cd backend
npm install  # First time only
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 📝 Default Login

- **Email**: admin@usman.com
- **Password**: admin123
- ⚠️ Change password immediately!

## 🔌 Key Endpoints

| Method | Endpoint                   | Auth | Purpose         |
| ------ | -------------------------- | ---- | --------------- |
| POST   | /api/admin/login           | ❌   | Login           |
| GET    | /api/admin/profile         | ✅   | Get profile     |
| PUT    | /api/admin/profile         | ✅   | Update profile  |
| PUT    | /api/admin/change-password | ✅   | Change password |
| GET    | /api/admin/contacts        | ✅   | Get messages    |
| DELETE | /api/admin/contacts/:id    | ✅   | Delete message  |

## 🛡️ Authentication Header

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📊 Database Tables

### admin_users

- id, name, email, password, title, bio, phone, location, avatar_url

### contacts

- id, name, email, message, created_at

### projects

- id, title, description, technologies, link, icon, created_at, updated_at

### skills

- id, category, name, proficiency, created_at

## 🔑 Generate Password Hash

```bash
node backend/utils/hashPassword.js "your_password"
```

## ❌ Troubleshooting

| Error                   | Solution                          |
| ----------------------- | --------------------------------- |
| Cannot connect to MySQL | Start MySQL service, check .env   |
| Table doesn't exist     | Run setup.sql in MySQL            |
| Invalid token           | Login again, tokens expire in 24h |
| Port in use             | Change PORT in .env               |
| CORS error              | Ensure backend on :5000           |

## 📂 Important Files

- `backend/.env` - Configuration
- `backend/database/setup.sql` - Database schema
- `backend/server.js` - Main server
- `src/components/Admin/AdminLogin.jsx` - Frontend login
- `src/components/Admin/AdminProfile.jsx` - Profile management
- `src/components/Admin/ContactMessages.jsx` - Message management

## 🔐 Security Checklist

- [ ] Changed default password
- [ ] Changed JWT_SECRET
- [ ] MySQL running locally/securely
- [ ] .env in .gitignore
- [ ] No sensitive data in git
- [ ] HTTPS configured (production)

## 📚 Full Documentation

- `ADMIN_BACKEND_SETUP.md` - Complete setup guide
- `BACKEND_INTEGRATION.md` - API documentation
- `backend/README.md` - Backend details
- `src/components/Admin/ADMIN_README.md` - Frontend details

---

**Ready to use!** All backend infrastructure is in place.
