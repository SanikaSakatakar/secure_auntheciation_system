# SecureAuth - Secure Authentication System

A modern, full-stack authentication system built with Flask, PostgreSQL, Next.js, and Tailwind CSS. Features JWT token authentication, bcrypt password hashing, animated UI, and complete security best practices.

## Features

- **Secure Backend**: Flask with JWT authentication and bcrypt password hashing (12 salt rounds)
- **PostgreSQL Database**: Reliable data persistence with proper indexing
- **Modern Frontend**: Next.js with Framer Motion animations and responsive design
- **Authentication Flow**: Complete user registration, login, and protected routes
- **Token Management**: 1-hour JWT token expiry with automatic refresh handling
- **Profile Management**: Users can view and update their profile information
- **Error Handling**: Comprehensive error handling with user-friendly toast notifications
- **Clean Code**: Modular architecture with separation of concerns

## Tech Stack

### Backend
- **Framework**: Flask 2.3.3
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: PyJWT + bcrypt
- **API**: RESTful architecture

### Frontend
- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Project Structure

\`\`\`
├── backend/
│   ├── app.py                 # Flask application
│   ├── config.py              # Configuration settings
│   ├── database.py            # Database initialization
│   ├── models/
│   │   └── user.py            # User model
│   ├── routes/
│   │   ├── auth.py            # Authentication endpoints
│   │   └── user.py            # User endpoints
│   ├── middleware/
│   │   └── auth.py            # JWT authentication middleware
│   ├── scripts/
│   │   └── init_db.sql        # Database initialization script
│   ├── requirements.txt        # Python dependencies
│   └── .env.example           # Environment variables template
│
├── app/                       # Next.js app directory
│   ├── page.tsx               # Landing page
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── register/
│   │   └── page.tsx           # Registration page
│   ├── dashboard/
│   │   └── page.tsx           # Protected dashboard
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
│
├── components/
│   └── auth-provider.tsx      # Authentication context provider
│
├── lib/
│   ├── api-client.ts          # Axios API client with interceptors
│   ├── auth-service.ts        # Authentication service
│   └── auth-context.tsx       # Auth context (deprecated, use auth-provider)
│
└── middleware.ts              # Next.js middleware for route protection
\`\`\`

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Create virtual environment**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. **Install dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Setup environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

5. **Edit `.env` file with your settings**
   \`\`\`
   DATABASE_URL=postgresql://user:password@localhost:5432/auth_system
   JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
   FLASK_ENV=development
   FLASK_DEBUG=True
   \`\`\`

6. **Create PostgreSQL database**
   \`\`\`bash
   createdb auth_system
   \`\`\`

7. **Initialize database**
   \`\`\`bash
   psql auth_system < scripts/init_db.sql
   \`\`\`

8. **Run Flask application**
   \`\`\`bash
   python app.py
   \`\`\`

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Create environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

3. **Edit `.env.local`**
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:5000
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register new user
  \`\`\`json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  \`\`\`

- **POST** `/api/auth/login` - Login user
  \`\`\`json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  \`\`\`

### User (Protected Routes - require JWT token)

- **GET** `/api/user/profile` - Get user profile
  - Headers: `Authorization: Bearer {token}`

- **PUT** `/api/user/update-profile` - Update user profile
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ "name": "New Name" }`

## Authentication Flow

1. **Registration**
   - User submits name, email, and password
   - Password is hashed with bcrypt (12 salt rounds)
   - User data is stored in PostgreSQL
   - Success message displayed with redirect to login

2. **Login**
   - User submits email and password
   - System verifies email exists and password matches hash
   - JWT token generated with 1-hour expiry
   - Token and user data stored in localStorage
   - User redirected to dashboard

3. **Protected Routes**
   - Middleware checks for valid token
   - Protected routes require JWT token in Authorization header
   - Expired or invalid tokens return 401 Unauthorized
   - Automatic redirect to login on token expiry

4. **Logout**
   - Token and user data cleared from localStorage
   - User redirected to landing page

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds (industry standard)
- **JWT Tokens**: Cryptographically signed with 1-hour expiry
- **CORS Protection**: Flask-CORS configured for secure cross-origin requests
- **SQL Injection Prevention**: SQLAlchemy ORM prevents injection attacks
- **Input Validation**: Server-side validation of all inputs
- **Secure Headers**: Proper Content-Type and Authorization headers
- **Protected Routes**: Middleware enforces authentication requirements
- **Error Messages**: Generic error messages prevent information disclosure

## Database Schema

### Users Table

\`\`\`sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
\`\`\`

## Environment Variables

### Backend (.env)

\`\`\`
DATABASE_URL=postgresql://user:password@localhost:5432/auth_system
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
FLASK_ENV=development
FLASK_DEBUG=True
\`\`\`

### Frontend (.env.local)

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

## Development

### Running Tests

Backend:
\`\`\`bash
pytest backend/
\`\`\`

Frontend:
\`\`\`bash
npm test
\`\`\`

### Code Quality

Backend:
\`\`\`bash
flake8 backend/
pylint backend/
\`\`\`

Frontend:
\`\`\`bash
npm run lint
npm run format
\`\`\`

## Deployment

### Backend (Heroku)

1. Create Heroku app
   \`\`\`bash
   heroku create your-app-name
   \`\`\`

2. Set environment variables
   \`\`\`bash
   heroku config:set JWT_SECRET_KEY=your-secret-key
   heroku config:set DATABASE_URL=postgresql://...
   \`\`\`

3. Deploy
   \`\`\`bash
   git push heroku main
   \`\`\`

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL=your-backend-url`
3. Deploy

## Troubleshooting

### Backend Won't Start

- Check PostgreSQL is running: `psql -U postgres`
- Verify DATABASE_URL is correct
- Run migrations: `psql auth_system < scripts/init_db.sql`

### Login Not Working

- Verify backend is running on `http://localhost:5000`
- Check NEXT_PUBLIC_API_URL in `.env.local`
- Clear browser localStorage and try again
- Check backend logs for errors

### CORS Errors

- Ensure Flask-CORS is installed: `pip install Flask-CORS`
- Verify NEXT_PUBLIC_API_URL matches backend URL
- Check backend CORS configuration in `app.py`

## Performance Optimizations

- JWT tokens reduce database queries
- PostgreSQL indexing on email for fast lookups
- Next.js automatic code splitting
- Framer Motion GPU-accelerated animations
- Lazy loading of components

## Future Enhancements

- OAuth2 integration (Google, GitHub)
- Two-factor authentication (2FA)
- Refresh token rotation
- Email verification
- Password reset functionality
- User roles and permissions
- Rate limiting
- Session management
- Activity logging

## License

MIT

## Support

For issues and questions, please open an issue on GitHub or contact support.
\`\`\`

```text file=".env.example"
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000
